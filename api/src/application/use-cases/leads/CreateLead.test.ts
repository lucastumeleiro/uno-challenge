import { describe, it, expect, beforeEach } from "vitest";
import { CreateLead } from "./CreateLead";
import { InMemoryLeadRepository } from "@infrastructure/repositories/InMemoryLeadRepository";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { Contact } from "@domain/entities/Contact";
import { LeadContactNotFoundError } from "@application/exceptions/LeadContactNotFoundError";
import { LeadValidationError } from "@domain/exceptions/LeadValidationError";

describe("CreateLead Use Case", () => {
  let leadRepository: InMemoryLeadRepository;
  let contactRepository: InMemoryContactRepository;
  let createLead: CreateLead;
  let existingContact: Contact;

  beforeEach(async () => {
    leadRepository = new InMemoryLeadRepository();
    contactRepository = new InMemoryContactRepository();
    createLead = new CreateLead(leadRepository, contactRepository);

    existingContact = Contact.create({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });
    await contactRepository.save(existingContact);
  });

  it("deve criar um lead com sucesso", async () => {
    const result = await createLead.execute({
      contactId: existingContact.id,
      name: "Lead Empresa ABC",
      company: "ABC Corporation",
      status: "novo",
    });

    expect(result.id).toBeDefined();
    expect(result.name).toBe("Lead Empresa ABC");
    expect(result.company).toBe("ABC Corporation");
    expect(result.status).toBe("novo");
    expect(result.contactId).toBe(existingContact.id);
    expect(result.contactName).toBe("João Silva");
  });

  it("deve lançar erro quando contato não existe", async () => {
    await expect(
      createLead.execute({
        contactId: "contato-inexistente",
        name: "Lead Teste",
        company: "Empresa Teste",
        status: "novo",
      }),
    ).rejects.toThrow(LeadContactNotFoundError);
  });

  it("deve lançar erro ao criar lead com dados inválidos", async () => {
    await expect(
      createLead.execute({
        contactId: existingContact.id,
        name: "A",
        company: "X",
        status: "invalido" as any,
      }),
    ).rejects.toThrow(LeadValidationError);
  });

  it("deve persistir o lead no repositório", async () => {
    const result = await createLead.execute({
      contactId: existingContact.id,
      name: "Lead Teste",
      company: "Empresa Teste",
      status: "novo",
    });

    const found = await leadRepository.findById(result.id);
    expect(found).not.toBeNull();
    expect(found!.name).toBe("Lead Teste");
  });
});
