export type LeadStatus =
  | "novo"
  | "contactado"
  | "qualificado"
  | "convertido"
  | "perdido";

export type LeadDTO = {
  id: string;
  contactId: string;
  name: string;
  company: string;
  status: LeadStatus;
  createdAt: string;
};

export type CreateLeadData = {
  contactId: string;
  name: string;
  company: string;
  status: LeadStatus;
};

export type UpdateLeadData = {
  contactId?: string;
  name?: string;
  company?: string;
  status?: LeadStatus;
};

export type ListLeadsParams = {
  search?: string;
  status?: LeadStatus;
};
