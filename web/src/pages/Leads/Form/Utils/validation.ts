import z from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  company: z.string().min(2, "Empresa deve ter no mínimo 2 caracteres"),
  status: z.enum([
    "novo",
    "contactado",
    "qualificado",
    "convertido",
    "perdido",
  ]),
  contactId: z.string().min(1, "Contato é obrigatório"),
});
