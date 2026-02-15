import { describe, it, expect, beforeEach } from "vitest";
import { createServer } from "@infrastructure/api/server";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { InMemoryLeadRepository } from "@infrastructure/repositories/InMemoryLeadRepository";
import { Contact } from "@domain/entities/Contact";

describe("Leads Controller (Integração)", () => {
  let app: ReturnType<typeof createServer>;
  let contactRepository: InMemoryContactRepository;
  let leadRepository: InMemoryLeadRepository;
  let contact: Contact;

  beforeEach(async () => {
    contactRepository = new InMemoryContactRepository();
    leadRepository = new InMemoryLeadRepository();
    app = createServer(contactRepository, leadRepository);

    contact = Contact.create({
      name: "João Silva",
      email: "joao@email.com",
      phone: "(49) 99999-1111",
    });
    await contactRepository.save(contact);
  });

  const request = (
    app: ReturnType<typeof createServer>,
    method: string,
    path: string,
    body?: object,
  ) => {
    const init: RequestInit = { method, headers: { "Content-Type": "application/json" } };
    if (body) init.body = JSON.stringify(body);
    return app.request(path, init);
  };

  describe("POST /leads", () => {
    it("deve criar um lead e retornar 201", async () => {
      const res = await request(app, "POST", "/leads", {
        contactId: contact.id,
        name: "Lead Empresa ABC",
        company: "ABC Corporation",
        status: "novo",
      });

      expect(res.status).toBe(201);
      const data = (await res.json()) as Record<string, unknown>;
      expect(data.name).toBe("Lead Empresa ABC");
      expect(data.contactName).toBe("João Silva");
    });

    it("deve retornar 400 para dados inválidos", async () => {
      const res = await request(app, "POST", "/leads", {
        contactId: "nao-e-uuid",
        name: "A",
        company: "X",
        status: "invalido",
      });

      expect(res.status).toBe(400);
    });

    it("deve retornar 404 quando contato não existe", async () => {
      const res = await request(app, "POST", "/leads", {
        contactId: "00000000-0000-0000-0000-000000000000",
        name: "Lead Teste",
        company: "Empresa Teste",
        status: "novo",
      });

      expect(res.status).toBe(404);
    });
  });

  describe("GET /leads", () => {
    it("deve listar leads com paginação", async () => {
      await request(app, "POST", "/leads", {
        contactId: contact.id,
        name: "Lead 1",
        company: "Empresa 1",
        status: "novo",
      });
      await request(app, "POST", "/leads", {
        contactId: contact.id,
        name: "Lead 2",
        company: "Empresa 2",
        status: "qualificado",
      });

      const res = await app.request("/leads");

      expect(res.status).toBe(200);
      const data = (await res.json()) as Record<string, unknown>;
      expect(data.data).toHaveLength(2);
      expect(data.total).toBe(2);
    });

    it("deve filtrar leads por status", async () => {
      await request(app, "POST", "/leads", {
        contactId: contact.id,
        name: "Lead Novo",
        company: "Empresa 1",
        status: "novo",
      });
      await request(app, "POST", "/leads", {
        contactId: contact.id,
        name: "Lead Qualificado",
        company: "Empresa 2",
        status: "qualificado",
      });

      const res = await app.request("/leads?status=novo");

      const data = (await res.json()) as { data: Array<Record<string, unknown>> };
      expect(data.data).toHaveLength(1);
      expect(data.data[0]!.status).toBe("novo");
    });
  });

  describe("GET /leads/:id", () => {
    it("deve retornar um lead por ID", async () => {
      const createRes = await request(app, "POST", "/leads", {
        contactId: contact.id,
        name: "Lead Teste",
        company: "Empresa Teste",
        status: "novo",
      });
      const created = (await createRes.json()) as Record<string, unknown>;

      const res = await app.request(`/leads/${created.id}`);

      expect(res.status).toBe(200);
      const data = (await res.json()) as Record<string, unknown>;
      expect(data.name).toBe("Lead Teste");
      expect(data.contactName).toBe("João Silva");
    });

    it("deve retornar 404 para lead inexistente", async () => {
      const res = await app.request("/leads/id-inexistente");

      expect(res.status).toBe(404);
    });
  });

  describe("PUT /leads/:id", () => {
    it("deve atualizar o status de um lead", async () => {
      const createRes = await request(app, "POST", "/leads", {
        contactId: contact.id,
        name: "Lead Teste",
        company: "Empresa Teste",
        status: "novo",
      });
      const created = (await createRes.json()) as Record<string, unknown>;

      const res = await request(app, "PUT", `/leads/${created.id}`, {
        status: "convertido",
      });

      expect(res.status).toBe(200);
      const data = (await res.json()) as Record<string, unknown>;
      expect(data.status).toBe("convertido");
    });
  });

  describe("DELETE /leads/:id", () => {
    it("deve deletar um lead", async () => {
      const createRes = await request(app, "POST", "/leads", {
        contactId: contact.id,
        name: "Lead Teste",
        company: "Empresa Teste",
        status: "novo",
      });
      const created = (await createRes.json()) as Record<string, unknown>;

      const res = await request(app, "DELETE", `/leads/${created.id}`);

      expect(res.status).toBe(200);
    });

    it("deve retornar 404 ao deletar lead inexistente", async () => {
      const res = await request(app, "DELETE", "/leads/id-inexistente");

      expect(res.status).toBe(404);
    });
  });

  describe("GET /contacts/:contactId/leads", () => {
    it("deve listar leads de um contato específico", async () => {
      await request(app, "POST", "/leads", {
        contactId: contact.id,
        name: "Lead 1",
        company: "Empresa 1",
        status: "novo",
      });
      await request(app, "POST", "/leads", {
        contactId: contact.id,
        name: "Lead 2",
        company: "Empresa 2",
        status: "qualificado",
      });

      const res = await app.request(`/contacts/${contact.id}/leads`);

      expect(res.status).toBe(200);
      const data = (await res.json()) as unknown[];
      expect(data).toHaveLength(2);
    });

    it("deve retornar 404 para contato inexistente", async () => {
      const res = await app.request("/contacts/contato-inexistente/leads");

      expect(res.status).toBe(404);
    });
  });
});
