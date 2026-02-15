import type { ILeadStatus } from "@Hooks/useLeads/Types";

export const STATUS_LABELS: Record<ILeadStatus, string> = {
  novo: "Novo",
  contactado: "Contactado",
  qualificado: "Qualificado",
  convertido: "Convertido",
  perdido: "Perdido",
};

export const ITEMS_PER_PAGE = 10;
