import { describe, it, expect, beforeEach } from "vitest";
import { createServer } from "@infrastructure/api/server";
import { InMemoryContactRepository } from "@infrastructure/repositories/InMemoryContactRepository";
import { InMemoryLeadRepository } from "@infrastructure/repositories/InMemoryLeadRepository";
import { Lead } from "@domain/entities/Lead";

describe("Contacts Controller (Integração)", () => {
  let app: ReturnType<typeof createServer>;
  let contactRepository: InMemoryContactRepository;
  let leadRepository: InMemoryLeadRepository;

  beforeEach(() => {
    contactRepository = new InMemoryContactRepository();
    leadRepository = new InMemoryLeadRepository();
    app = createServer(contactRepository, leadRepository);
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

  describe("POST /contacts", () => {
    it("deve criar um contato e retornar 201", async () => {
      const res = await request(app, "POST", "/contacts", {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(49) 99999-1111",
      });

      expect(res.status).toBe(201);
      const data = (await res.json()) as Record<string, unknown>;
      expect(data.name).toBe("João Silva");
      expect(data.id).toBeDefined();
    });

    it("deve retornar 400 para dados inválidos (Zod)", async () => {
      const res = await request(app, "POST", "/contacts", {
        name: "A",
        email: "invalido",
        phone: "",
      });

      expect(res.status).toBe(400);
    });

    it("deve retornar 409 para email duplicado", async () => {
      await request(app, "POST", "/contacts", {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(49) 99999-1111",
      });

      const res = await request(app, "POST", "/contacts", {
        name: "Maria Santos",
        email: "joao@email.com",
        phone: "(49) 99999-2222",
      });

      expect(res.status).toBe(409);
    });
  });

  describe("GET /contacts", () => {
    it("deve listar contatos com paginação", async () => {
      await request(app, "POST", "/contacts", {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(49) 99999-1111",
      });
      await request(app, "POST", "/contacts", {
        name: "Maria Santos",
        email: "maria@email.com",
        phone: "(49) 99999-2222",
      });

      const res = await app.request("/contacts");

      expect(res.status).toBe(200);
      const data = (await res.json()) as Record<string, unknown>;
      expect(data.data).toHaveLength(2);
      expect(data.total).toBe(2);
      expect(data.page).toBe(1);
    });

    it("deve filtrar contatos por busca", async () => {
      await request(app, "POST", "/contacts", {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(49) 99999-1111",
      });
      await request(app, "POST", "/contacts", {
        name: "Maria Santos",
        email: "maria@email.com",
        phone: "(49) 99999-2222",
      });

      const res = await app.request("/contacts?search=Maria");

      const data = (await res.json()) as { data: Array<Record<string, unknown>> };
      expect(data.data).toHaveLength(1);
      expect(data.data[0]!.name).toBe("Maria Santos");
    });
  });

  describe("GET /contacts/:id", () => {
    it("deve retornar um contato por ID", async () => {
      const createRes = await request(app, "POST", "/contacts", {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(49) 99999-1111",
      });
      const created = (await createRes.json()) as Record<string, unknown>;

      const res = await app.request(`/contacts/${created.id}`);

      expect(res.status).toBe(200);
      const data = (await res.json()) as Record<string, unknown>;
      expect(data.name).toBe("João Silva");
    });

    it("deve retornar 404 para contato inexistente", async () => {
      const res = await app.request("/contacts/id-inexistente");

      expect(res.status).toBe(404);
    });
  });

  describe("PUT /contacts/:id", () => {
    it("deve atualizar um contato", async () => {
      const createRes = await request(app, "POST", "/contacts", {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(49) 99999-1111",
      });
      const created = (await createRes.json()) as Record<string, unknown>;

      const res = await request(app, "PUT", `/contacts/${created.id}`, {
        name: "João Atualizado",
      });

      expect(res.status).toBe(200);
      const data = (await res.json()) as Record<string, unknown>;
      expect(data.name).toBe("João Atualizado");
    });
  });

  describe("DELETE /contacts/:id", () => {
    it("deve deletar um contato sem leads", async () => {
      const createRes = await request(app, "POST", "/contacts", {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(49) 99999-1111",
      });
      const created = (await createRes.json()) as Record<string, unknown>;

      const res = await request(app, "DELETE", `/contacts/${created.id}`);

      expect(res.status).toBe(200);
    });

    it("deve retornar 409 quando contato tem leads", async () => {
      const createRes = await request(app, "POST", "/contacts", {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(49) 99999-1111",
      });
      const created = (await createRes.json()) as Record<string, unknown>;

      const lead = Lead.create({
        contactId: created.id as string,
        name: "Lead Teste",
        company: "Empresa Teste",
        status: "novo",
      });
      await leadRepository.save(lead);

      const res = await request(app, "DELETE", `/contacts/${created.id as string}`);

      expect(res.status).toBe(409);
    });
  });
});
