import { z } from "zod";

const leadStatusEnum = z.enum([
  "novo",
  "contactado",
  "qualificado",
  "convertido",
  "perdido",
]);

export const createLeadSchema = z.object({
  contactId: z.uuid({ message: "ID do contato deve ser um UUID válido" }),
  name: z.string().min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
  company: z
    .string()
    .min(2, { message: "Empresa deve ter no mínimo 2 caracteres" }),
  status: leadStatusEnum,
});

export const updateLeadSchema = z.object({
  contactId: z
    .uuid({ message: "ID do contato deve ser um UUID válido" })
    .optional(),
  name: z
    .string()
    .min(2, { message: "Nome deve ter no mínimo 2 caracteres" })
    .optional(),
  company: z
    .string()
    .min(2, { message: "Empresa deve ter no mínimo 2 caracteres" })
    .optional(),
  status: leadStatusEnum.optional(),
});

export const listLeadsQuerySchema = z.object({
  search: z.string().optional(),
  status: leadStatusEnum.optional(),
});
