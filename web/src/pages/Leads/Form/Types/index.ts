import type z from "zod";
import type { leadSchema } from "../Utils/validation";

export type LeadFormData = z.infer<typeof leadSchema>;
