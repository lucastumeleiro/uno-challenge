import { describe, it, expect } from "vitest";
import { Lead } from "../../Lead";
import { LeadValidationError } from "@domain/exceptions/LeadValidationError";

describe("Lead Entity", () => {
  const validData = {
    contactId: crypto.randomUUID(),
    name: "Lead Empresa ABC",
    company: "ABC Corporation",
    status: "novo" as const,
  };

  describe("create", () => {
    it("deve criar um lead com dados válidos", () => {
      const lead = Lead.create(validData);

      expect(lead.name).toBe(validData.name);
      expect(lead.company).toBe(validData.company);
      expect(lead.status).toBe(validData.status);
      expect(lead.contactId).toBe(validData.contactId);
      expect(lead.id).toBeDefined();
      expect(lead.createdAt).toBeDefined();
    });

    it("deve aceitar todos os status válidos", () => {
      const statuses = [
        "novo",
        "contactado",
        "qualificado",
        "convertido",
        "perdido",
      ] as const;

      for (const status of statuses) {
        const lead = Lead.create({ ...validData, status });
        expect(lead.status).toBe(status);
      }
    });

    it("deve lançar erro quando nome tem menos de 2 caracteres", () => {
      expect(() => Lead.create({ ...validData, name: "A" })).toThrow(
        LeadValidationError,
      );
    });

    it("deve lançar erro quando empresa tem menos de 2 caracteres", () => {
      expect(() => Lead.create({ ...validData, company: "X" })).toThrow(
        LeadValidationError,
      );
    });

    it("deve lançar erro quando contactId é vazio", () => {
      expect(() => Lead.create({ ...validData, contactId: "" })).toThrow(
        LeadValidationError,
      );
    });

    it("deve lançar erro quando status é inválido", () => {
      expect(() =>
        Lead.create({ ...validData, status: "invalido" as any }),
      ).toThrow(LeadValidationError);
    });

    it("deve acumular múltiplos erros de validação", () => {
      try {
        Lead.create({
          contactId: "",
          name: "",
          company: "",
          status: "invalido" as any,
        });
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error).toBeInstanceOf(LeadValidationError);
        expect((error as LeadValidationError).errors.length).toBeGreaterThan(1);
      }
    });
  });

  describe("update", () => {
    it("deve atualizar apenas o nome", () => {
      const lead = Lead.create(validData);
      lead.update({ name: "Novo Lead" });

      expect(lead.name).toBe("Novo Lead");
      expect(lead.company).toBe(validData.company);
      expect(lead.status).toBe(validData.status);
    });

    it("deve atualizar o status", () => {
      const lead = Lead.create(validData);
      lead.update({ status: "convertido" });

      expect(lead.status).toBe("convertido");
    });

    it("deve atualizar o contactId", () => {
      const lead = Lead.create(validData);
      const novoContactId = crypto.randomUUID();
      lead.update({ contactId: novoContactId });

      expect(lead.contactId).toBe(novoContactId);
    });

    it("deve atualizar múltiplos campos", () => {
      const lead = Lead.create(validData);
      lead.update({
        name: "Lead Atualizado",
        company: "Nova Empresa",
        status: "qualificado",
      });

      expect(lead.name).toBe("Lead Atualizado");
      expect(lead.company).toBe("Nova Empresa");
      expect(lead.status).toBe("qualificado");
    });

    it("deve lançar erro ao atualizar com status inválido", () => {
      const lead = Lead.create(validData);

      expect(() => lead.update({ status: "invalido" as any })).toThrow(
        LeadValidationError,
      );
    });

    it("não deve alterar campos quando undefined é passado", () => {
      const lead = Lead.create(validData);
      lead.update({});

      expect(lead.name).toBe(validData.name);
      expect(lead.company).toBe(validData.company);
      expect(lead.status).toBe(validData.status);
    });
  });
});
