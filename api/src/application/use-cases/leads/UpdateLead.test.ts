import { describe, it, expect, beforeEach } from "vitest";
import { UpdateLead } from "./UpdateLead";
import { CreateLead } from "./CreateLead";
import { InMemoryLeadRepository } from "@infrastructure/repositories/InMemoryLeadRepository";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { Contact } from "@domain/entities/Contact";
import { LeadNotFoundError } from "@application/exceptions/LeadNotFoundError";
import { LeadContactNotFoundError } from "@application/exceptions/LeadContactNotFoundError";

describe("UpdateLead Use Case", () => {
  let leadRepository: InMemoryLeadRepository;
  let contactRepository: InMemoryContactRepository;
  let updateLead: UpdateLead;
  let createLead: CreateLead;
  let contact: Contact;

  beforeEach(async () => {
    leadRepository = new InMemoryLeadRepository();
    contactRepository = new InMemoryContactRepository();
    updateLead = new UpdateLead(leadRepository, contactRepository);
    createLead = new CreateLead(leadRepository, contactRepository);

    contact = Contact.create({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });
    await contactRepository.save(contact);
  });

  it("deve atualizar o status do lead", async () => {
    const created = await createLead.execute({
      contactId: contact.id,
      name: "Lead Teste",
      company: "Empresa Teste",
      status: "novo",
    });

    const result = await updateLead.execute(created.id, {
      status: "qualificado",
    });

    expect(result.status).toBe("qualificado");
    expect(result.name).toBe("Lead Teste");
  });

  it("deve atualizar o nome e empresa do lead", async () => {
    const created = await createLead.execute({
      contactId: contact.id,
      name: "Lead Teste",
      company: "Empresa Teste",
      status: "novo",
    });

    const result = await updateLead.execute(created.id, {
      name: "Lead Atualizado",
      company: "Nova Empresa",
    });

    expect(result.name).toBe("Lead Atualizado");
    expect(result.company).toBe("Nova Empresa");
  });

  it("deve atualizar o contactId para um contato válido", async () => {
    const created = await createLead.execute({
      contactId: contact.id,
      name: "Lead Teste",
      company: "Empresa Teste",
      status: "novo",
    });

    const novoContato = Contact.create({
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(49) 99999-2222",
    });
    await contactRepository.save(novoContato);

    const result = await updateLead.execute(created.id, {
      contactId: novoContato.id,
    });

    expect(result.contactId).toBe(novoContato.id);
    expect(result.contactName).toBe("Maria Santos");
  });

  it("deve lançar erro quando lead não existe", async () => {
    await expect(
      updateLead.execute("id-inexistente", { name: "Novo" }),
    ).rejects.toThrow(LeadNotFoundError);
  });

  it("deve lançar erro quando novo contactId não existe", async () => {
    const created = await createLead.execute({
      contactId: contact.id,
      name: "Lead Teste",
      company: "Empresa Teste",
      status: "novo",
    });

    await expect(
      updateLead.execute(created.id, { contactId: "contato-inexistente" }),
    ).rejects.toThrow(LeadContactNotFoundError);
  });
});
