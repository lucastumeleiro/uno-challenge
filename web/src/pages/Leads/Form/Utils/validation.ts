import z from "zod";

export const leadSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  company: z.string().min(1, "Empresa é obrigatória"),
  status: z.enum([
    "novo",
    "contactado",
    "qualificado",
    "convertido",
    "perdido",
  ]),
  contactId: z.string().min(1, "Contato é obrigatório"),
});
