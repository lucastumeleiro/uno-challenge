import { describe, it, expect, beforeEach } from "vitest";
import { UpdateContact } from "../../UpdateContact";
import { CreateContact } from "../../CreateContact";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { ContactNotFoundError } from "@application/exceptions/ContactNotFoundError";
import { ContactEmailAlreadyExistsError } from "@application/exceptions/ContactEmailAlreadyExistsError";

describe("UpdateContact Use Case", () => {
  let contactRepository: InMemoryContactRepository;
  let updateContact: UpdateContact;
  let createContact: CreateContact;

  beforeEach(() => {
    contactRepository = new InMemoryContactRepository();
    updateContact = new UpdateContact(contactRepository);
    createContact = new CreateContact(contactRepository);
  });

  it("deve atualizar o nome do contato", async () => {
    const created = await createContact.execute({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });

    const result = await updateContact.execute(created.id, {
      name: "João Santos",
    });

    expect(result.name).toBe("João Santos");
    expect(result.email).toBe("joao@email.com");
  });

  it("deve atualizar o email do contato", async () => {
    const created = await createContact.execute({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });

    const result = await updateContact.execute(created.id, {
      email: "novo@email.com",
    });

    expect(result.email).toBe("novo@email.com");
  });

  it("deve lançar erro quando contato não existe", async () => {
    await expect(
      updateContact.execute("id-inexistente", { name: "Novo" }),
    ).rejects.toThrow(ContactNotFoundError);
  });

  it("deve lançar erro quando email já está em uso por outro contato", async () => {
    await createContact.execute({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });

    const maria = await createContact.execute({
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(49) 99999-2222",
    });

    await expect(
      updateContact.execute(maria.id, { email: "joao@email.com" }),
    ).rejects.toThrow(ContactEmailAlreadyExistsError);
  });

  it("deve permitir manter o mesmo email ao atualizar", async () => {
    const created = await createContact.execute({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });

    const result = await updateContact.execute(created.id, {
      name: "João Atualizado",
      email: "joao@email.com",
    });

    expect(result.name).toBe("João Atualizado");
    expect(result.email).toBe("joao@email.com");
  });
});
