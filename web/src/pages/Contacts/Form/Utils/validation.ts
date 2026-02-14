import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.email("Email inválido").min(1, "Email é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
});
