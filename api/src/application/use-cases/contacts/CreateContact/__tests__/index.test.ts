import { describe, it, expect, beforeEach } from "vitest";
import { CreateContact } from "../../CreateContact";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { ContactEmailAlreadyExistsError } from "@application/exceptions/ContactEmailAlreadyExistsError";
import { ContactValidationError } from "@domain/exceptions/ContactValidationError";

describe("CreateContact Use Case", () => {
  let contactRepository: InMemoryContactRepository;
  let createContact: CreateContact;

  beforeEach(() => {
    contactRepository = new InMemoryContactRepository();
    createContact = new CreateContact(contactRepository);
  });

  it("deve criar um contato com sucesso", async () => {
    const result = await createContact.execute({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });

    expect(result.id).toBeDefined();
    expect(result.name).toBe("João Silva");
    expect(result.email).toBe("joao@email.com");
    expect(result.phone).toBe("(49) 99999-1111");
    expect(result.createdAt).toBeDefined();
  });

  it("deve lançar erro ao criar contato com email duplicado", async () => {
    await createContact.execute({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });

    await expect(
      createContact.execute({
        name: "Maria Santos",
        email: "joao@email.com",
        phone: "(49) 99999-2222",
      }),
    ).rejects.toThrow(ContactEmailAlreadyExistsError);
  });

  it("deve lançar erro ao criar contato com dados inválidos", async () => {
    await expect(
      createContact.execute({
        name: "A",
        email: "email-invalido",
        phone: "",
      }),
    ).rejects.toThrow(ContactValidationError);
  });

  it("deve persistir o contato no repositório", async () => {
    const result = await createContact.execute({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });

    const found = await contactRepository.findById(result.id);
    expect(found).not.toBeNull();
    expect(found!.name).toBe("João Silva");
  });
});
