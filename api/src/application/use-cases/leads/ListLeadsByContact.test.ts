import { describe, it, expect, beforeEach } from "vitest";
import { ListLeadsByContact } from "./ListLeadsByContact";
import { InMemoryLeadRepository } from "@infrastructure/repositories/InMemoryLeadRepository";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { Contact } from "@domain/entities/Contact";
import { Lead } from "@domain/entities/Lead";
import { ContactNotFoundError } from "@application/exceptions/ContactNotFoundError";

describe("ListLeadsByContact Use Case", () => {
  let leadRepository: InMemoryLeadRepository;
  let contactRepository: InMemoryContactRepository;
  let listLeadsByContact: ListLeadsByContact;
  let contact: Contact;

  beforeEach(async () => {
    leadRepository = new InMemoryLeadRepository();
    contactRepository = new InMemoryContactRepository();
    listLeadsByContact = new ListLeadsByContact(leadRepository, contactRepository);

    contact = Contact.create({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });
    await contactRepository.save(contact);
  });

  it("deve listar leads de um contato", async () => {
    const lead1 = Lead.create({
      contactId: contact.id,
      name: "Lead 1",
      company: "Empresa 1",
      status: "novo",
    });
    const lead2 = Lead.create({
      contactId: contact.id,
      name: "Lead 2",
      company: "Empresa 2",
      status: "qualificado",
    });
    await leadRepository.save(lead1);
    await leadRepository.save(lead2);

    const result = await listLeadsByContact.execute(contact.id);

    expect(result).toHaveLength(2);
    expect(result[0]!.contactName).toBe("João Silva");
    expect(result[1]!.contactName).toBe("João Silva");
  });

  it("deve retornar lista vazia quando contato não tem leads", async () => {
    const result = await listLeadsByContact.execute(contact.id);

    expect(result).toHaveLength(0);
  });

  it("deve lançar erro quando contato não existe", async () => {
    await expect(
      listLeadsByContact.execute("contato-inexistente"),
    ).rejects.toThrow(ContactNotFoundError);
  });

  it("não deve incluir leads de outros contatos", async () => {
    const outroContato = Contact.create({
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(49) 99999-2222",
    });
    await contactRepository.save(outroContato);

    await leadRepository.save(
      Lead.create({ contactId: contact.id, name: "Lead João", company: "Emp 1", status: "novo" }),
    );
    await leadRepository.save(
      Lead.create({ contactId: outroContato.id, name: "Lead Maria", company: "Emp 2", status: "novo" }),
    );

    const result = await listLeadsByContact.execute(contact.id);

    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe("Lead João");
  });
});
