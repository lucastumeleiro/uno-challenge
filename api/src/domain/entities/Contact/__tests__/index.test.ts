import { describe, it, expect } from "vitest";
import { Contact } from "../../Contact";
import { ContactValidationError } from "@domain/exceptions/ContactValidationError";

describe("Contact Entity", () => {
  const validData = {
    name: "João Silva",
    email: "joao@email.com",
    phone: "(49) 99999-1111",
  };

  describe("create", () => {
    it("deve criar um contato com dados válidos", () => {
      const contact = Contact.create(validData);

      expect(contact.name).toBe(validData.name);
      expect(contact.email).toBe(validData.email);
      expect(contact.phone).toBe(validData.phone);
      expect(contact.id).toBeDefined();
      expect(contact.createdAt).toBeDefined();
    });

    it("deve gerar um UUID único para cada contato", () => {
      const contact1 = Contact.create(validData);
      const contact2 = Contact.create({
        ...validData,
        email: "outro@email.com",
      });

      expect(contact1.id).not.toBe(contact2.id);
    });

    it("deve lançar erro quando nome tem menos de 2 caracteres", () => {
      expect(() => Contact.create({ ...validData, name: "A" })).toThrow(
        ContactValidationError,
      );
    });

    it("deve lançar erro quando nome é vazio", () => {
      expect(() => Contact.create({ ...validData, name: "" })).toThrow(
        ContactValidationError,
      );
    });

    it("deve lançar erro quando email é inválido", () => {
      expect(() =>
        Contact.create({ ...validData, email: "email-invalido" }),
      ).toThrow(ContactValidationError);
    });

    it("deve lançar erro quando email é vazio", () => {
      expect(() => Contact.create({ ...validData, email: "" })).toThrow(
        ContactValidationError,
      );
    });

    it("deve lançar erro quando telefone é vazio", () => {
      expect(() => Contact.create({ ...validData, phone: "" })).toThrow(
        ContactValidationError,
      );
    });

    it("deve acumular múltiplos erros de validação", () => {
      try {
        Contact.create({ name: "", email: "", phone: "" });
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error).toBeInstanceOf(ContactValidationError);
        expect((error as ContactValidationError).errors.length).toBeGreaterThan(
          1,
        );
      }
    });
  });

  describe("update", () => {
    it("deve atualizar apenas o nome", () => {
      const contact = Contact.create(validData);
      contact.update({ name: "Maria Santos" });

      expect(contact.name).toBe("Maria Santos");
      expect(contact.email).toBe(validData.email);
      expect(contact.phone).toBe(validData.phone);
    });

    it("deve atualizar apenas o email", () => {
      const contact = Contact.create(validData);
      contact.update({ email: "novo@email.com" });

      expect(contact.email).toBe("novo@email.com");
      expect(contact.name).toBe(validData.name);
    });

    it("deve atualizar apenas o telefone", () => {
      const contact = Contact.create(validData);
      contact.update({ phone: "(11) 98888-0000" });

      expect(contact.phone).toBe("(11) 98888-0000");
    });

    it("deve atualizar múltiplos campos ao mesmo tempo", () => {
      const contact = Contact.create(validData);
      contact.update({ name: "Novo Nome", email: "novo@email.com" });

      expect(contact.name).toBe("Novo Nome");
      expect(contact.email).toBe("novo@email.com");
    });

    it("deve lançar erro ao atualizar com email inválido", () => {
      const contact = Contact.create(validData);

      expect(() => contact.update({ email: "invalido" })).toThrow(
        ContactValidationError,
      );
    });

    it("deve lançar erro ao atualizar com nome curto", () => {
      const contact = Contact.create(validData);

      expect(() => contact.update({ name: "A" })).toThrow(
        ContactValidationError,
      );
    });

    it("não deve alterar campos quando undefined é passado", () => {
      const contact = Contact.create(validData);
      contact.update({ name: undefined, email: undefined, phone: undefined });

      expect(contact.name).toBe(validData.name);
      expect(contact.email).toBe(validData.email);
      expect(contact.phone).toBe(validData.phone);
    });
  });
});
