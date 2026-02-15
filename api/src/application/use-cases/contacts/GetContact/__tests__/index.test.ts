import { describe, it, expect, beforeEach } from "vitest";
import { GetContact } from "../../GetContact";
import { CreateContact } from "../../CreateContact";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { ContactNotFoundError } from "@application/exceptions/ContactNotFoundError";

describe("GetContact Use Case", () => {
  let contactRepository: InMemoryContactRepository;
  let getContact: GetContact;
  let createContact: CreateContact;

  beforeEach(() => {
    contactRepository = new InMemoryContactRepository();
    getContact = new GetContact(contactRepository);
    createContact = new CreateContact(contactRepository);
  });

  it("deve retornar um contato existente", async () => {
    const created = await createContact.execute({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });

    const result = await getContact.execute(created.id);

    expect(result.id).toBe(created.id);
    expect(result.name).toBe("João Silva");
  });

  it("deve lançar erro quando contato não existe", async () => {
    await expect(getContact.execute("id-inexistente")).rejects.toThrow(
      ContactNotFoundError,
    );
  });
});
