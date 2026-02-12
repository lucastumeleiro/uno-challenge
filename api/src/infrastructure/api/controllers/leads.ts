import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  createLeadSchema,
  updateLeadSchema,
  listLeadsQuerySchema,
} from "@infrastructure/api/validations/lead.schema";
import { CreateLead } from "@application/use-cases/leads/CreateLead";
import { GetLead } from "@application/use-cases/leads/GetLead";
import { ListLeads } from "@application/use-cases/leads/ListLeads";
import { UpdateLead } from "@application/use-cases/leads/UpdateLead";
import { DeleteLead } from "@application/use-cases/leads/DeleteLead";
import { ListLeadsByContact } from "@application/use-cases/leads/ListLeadsByContact";
import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import type { IContactRepository } from "@domain/repositories/IContactRepository";

export function createLeadsController(
  leadRepository: ILeadRepository,
  contactRepository: IContactRepository,
) {
  const app = new Hono();

  const createLeadUseCase = new CreateLead(leadRepository, contactRepository);
  const getLeadUseCase = new GetLead(leadRepository);
  const listLeadsUseCase = new ListLeads(leadRepository);
  const updateLeadUseCase = new UpdateLead(leadRepository, contactRepository);
  const deleteLeadUseCase = new DeleteLead(leadRepository);

  app.get("/", zValidator("query", listLeadsQuerySchema), async (context) => {
    const { search, status } = context.req.valid("query");
    const leads = await listLeadsUseCase.execute(search, status);
    return context.json(leads);
  });

  app.get("/:id", async (context) => {
    const id = context.req.param("id");
    const lead = await getLeadUseCase.execute(id);
    return context.json(lead);
  });

  app.post("/", zValidator("json", createLeadSchema), async (context) => {
    const data = context.req.valid("json");
    const lead = await createLeadUseCase.execute(data);
    return context.json(lead, 201);
  });

  app.put("/:id", zValidator("json", updateLeadSchema), async (context) => {
    const id = context.req.param("id");
    const data = context.req.valid("json");
    const lead = await updateLeadUseCase.execute(id, data);
    return context.json(lead);
  });

  app.delete("/:id", async (context) => {
    const id = context.req.param("id");
    await deleteLeadUseCase.execute(id);
    return context.json({ message: "Lead deletado com sucesso" });
  });

  return app;
}

export function createContactLeadsController(
  leadRepository: ILeadRepository,
  contactRepository: IContactRepository,
) {
  const app = new Hono();

  const listLeadsByContactUseCase = new ListLeadsByContact(
    leadRepository,
    contactRepository,
  );

  app.get("/:contactId/leads", async (context) => {
    const contactId = context.req.param("contactId");
    const leads = await listLeadsByContactUseCase.execute(contactId);
    return context.json(leads);
  });

  return app;
}
