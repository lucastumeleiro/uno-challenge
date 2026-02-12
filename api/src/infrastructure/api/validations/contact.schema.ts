import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
  email: z.string().email({ message: "Formato de email inválido" }),
  phone: z.string().min(1, { message: "Telefone é obrigatório" }),
});

export const updateContactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter no mínimo 2 caracteres" })
    .optional(),
  email: z.string().email({ message: "Formato de email inválido" }).optional(),
  phone: z.string().min(1, { message: "Telefone é obrigatório" }).optional(),
});

export const listContactsQuerySchema = z.object({
  search: z.string().optional(),
});
