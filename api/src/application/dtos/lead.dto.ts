import type { LeadStatus } from "@domain/entities/Lead";

export interface CreateLeadDTO {
  contactId: string;
  name: string;
  company: string;
  status: LeadStatus;
}

export interface UpdateLeadDTO {
  contactId?: string | undefined;
  name?: string | undefined;
  company?: string | undefined;
  status?: LeadStatus | undefined;
}

export interface LeadResponseDTO {
  id: string;
  contactId: string;
  contactName: string;
  name: string;
  company: string;
  status: LeadStatus;
  createdAt: string;
}
