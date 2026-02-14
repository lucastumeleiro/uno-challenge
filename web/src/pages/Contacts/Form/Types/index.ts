import type z from "zod";
import type { contactSchema } from "../Utils/validation";

export type ContactFormData = z.infer<typeof contactSchema>;
