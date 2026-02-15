import { describe, it, expect, beforeEach } from "vitest";
import { DeleteContact } from "../../DeleteContact";
import { CreateContact } from "../../CreateContact";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { InMemoryLeadRepository } from "@infrastructure/repositories/InMemoryLeadRepository";
import { ContactNotFoundError } from "@application/exceptions/ContactNotFoundError";
import { ContactHasLeadsError } from "@application/exceptions/ContactHasLeadsError";
import { Lead } from "@domain/entities/Lead";

describe("DeleteContact Use Case", () => {
  let contactRepository: InMemoryContactRepository;
  let leadRepository: InMemoryLeadRepository;
  let deleteContact: DeleteContact;
  let createContact: CreateContact;

  beforeEach(() => {
    contactRepository = new InMemoryContactRepository();
    leadRepository = new InMemoryLeadRepository();
    deleteContact = new DeleteContact(contactRepository, leadRepository);
    createContact = new CreateContact(contactRepository);
  });

  it("deve deletar um contato sem leads", async () => {
    const created = await createContact.execute({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });

    await deleteContact.execute(created.id);

    const found = await contactRepository.findById(created.id);
    expect(found).toBeNull();
  });

  it("deve lançar erro quando contato não existe", async () => {
    await expect(deleteContact.execute("id-inexistente")).rejects.toThrow(
      ContactNotFoundError,
    );
  });

  it("deve lançar erro quando contato possui leads vinculados", async () => {
    const created = await createContact.execute({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });

    const lead = Lead.create({
      contactId: created.id,
      name: "Lead Teste",
      company: "Empresa Teste",
      status: "novo",
    });
    await leadRepository.save(lead);

    await expect(deleteContact.execute(created.id)).rejects.toThrow(
      ContactHasLeadsError,
    );
  });
});
