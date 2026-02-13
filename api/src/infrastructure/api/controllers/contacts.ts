import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  createContactSchema,
  updateContactSchema,
  listContactsQuerySchema,
} from "@infrastructure/api/validations/contact.schema";
import { CreateContact } from "@application/use-cases/contacts/CreateContact";
import { GetContact } from "@application/use-cases/contacts/GetContact";
import { ListContacts } from "@application/use-cases/contacts/ListContacts";
import { UpdateContact } from "@application/use-cases/contacts/UpdateContact";
import { DeleteContact } from "@application/use-cases/contacts/DeleteContact";
import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type { ILeadRepository } from "@domain/repositories/ILeadRepository";

export function createContactsController(
  contactRepository: IContactRepository,
  leadRepository: ILeadRepository,
) {
  const createContactUseCase = new CreateContact(contactRepository);
  const getContactUseCase = new GetContact(contactRepository);
  const listContactsUseCase = new ListContacts(contactRepository);
  const updateContactUseCase = new UpdateContact(contactRepository);
  const deleteContactUseCase = new DeleteContact(
    contactRepository,
    leadRepository,
  );

  return new Hono()
    .get("/", zValidator("query", listContactsQuerySchema), async (context) => {
      const { search } = context.req.valid("query");
      const contacts = await listContactsUseCase.execute(search);
      return context.json(contacts);
    })
    .get("/:id", async (context) => {
      const id = context.req.param("id");
      const contact = await getContactUseCase.execute(id);
      return context.json(contact);
    })
    .post("/", zValidator("json", createContactSchema), async (context) => {
      const data = context.req.valid("json");
      const contact = await createContactUseCase.execute(data);
      return context.json(contact, 201);
    })
    .put("/:id", zValidator("json", updateContactSchema), async (context) => {
      const id = context.req.param("id");
      const data = context.req.valid("json");
      const contact = await updateContactUseCase.execute(id, data);
      return context.json(contact);
    })
    .delete("/:id", async (context) => {
      const id = context.req.param("id");
      await deleteContactUseCase.execute(id);
      return context.json({ message: "Contato deletado com sucesso" });
    });
}
