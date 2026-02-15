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
import type { LeadStatus } from "@domain/entities/Lead";

export function createLeadsController(
  leadRepository: ILeadRepository,
  contactRepository: IContactRepository,
) {
  const createLeadUseCase = new CreateLead(leadRepository, contactRepository);
  const getLeadUseCase = new GetLead(leadRepository, contactRepository);
  const listLeadsUseCase = new ListLeads(leadRepository, contactRepository);
  const updateLeadUseCase = new UpdateLead(leadRepository, contactRepository);
  const deleteLeadUseCase = new DeleteLead(leadRepository);

  return new Hono()
    .get("/", zValidator("query", listLeadsQuerySchema), async (context) => {
      const { search, status, page, limit } = context.req.valid("query");
      const leads = await listLeadsUseCase.execute(
        search,
        status as LeadStatus | undefined,
        page,
        limit,
      );
      return context.json(leads);
    })
    .get("/:id", async (context) => {
      const id = context.req.param("id");
      const lead = await getLeadUseCase.execute(id);
      return context.json(lead);
    })
    .post("/", zValidator("json", createLeadSchema), async (context) => {
      const data = context.req.valid("json");
      const lead = await createLeadUseCase.execute({
        ...data,
        status: data.status as LeadStatus,
      });
      return context.json(lead, 201);
    })
    .put("/:id", zValidator("json", updateLeadSchema), async (context) => {
      const id = context.req.param("id");
      const data = context.req.valid("json");
      const lead = await updateLeadUseCase.execute(id, {
        ...data,
        status: data.status as LeadStatus | undefined,
      });
      return context.json(lead);
    })
    .delete("/:id", async (context) => {
      const id = context.req.param("id");
      await deleteLeadUseCase.execute(id);
      return context.json({ message: "Lead deletado com sucesso" });
    });
}

export function createContactLeadsController(
  leadRepository: ILeadRepository,
  contactRepository: IContactRepository,
) {
  const listLeadsByContactUseCase = new ListLeadsByContact(
    leadRepository,
    contactRepository,
  );

  return new Hono().get("/:contactId/leads", async (context) => {
    const contactId = context.req.param("contactId");
    const leads = await listLeadsByContactUseCase.execute(contactId);
    return context.json(leads);
  });
}
