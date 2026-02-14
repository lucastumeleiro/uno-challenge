import type { ILeadStatus } from "@Hooks/useLeads/Types";

export const FORM_ID = "contact-form";

export const INITIAL_VALUES = {
  name: "",
  email: "",
  phone: "",
};

export const STATUS_LABELS: Record<ILeadStatus, string> = {
  novo: "Novo",
  contactado: "Contactado",
  qualificado: "Qualificado",
  convertido: "Convertido",
  perdido: "Perdido",
};
