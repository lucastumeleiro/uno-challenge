export type ILeadStatus =
  | "novo"
  | "contactado"
  | "qualificado"
  | "convertido"
  | "perdido";

export type ILeadDTO = {
  id: string;
  contactId: string;
  contactName: string;
  name: string;
  company: string;
  status: ILeadStatus;
  createdAt: string;
};

export type ICreateLeadData = {
  contactId: string;
  name: string;
  company: string;
  status: ILeadStatus;
};

export type IUpdateLeadData = {
  contactId?: string;
  name?: string;
  company?: string;
  status?: ILeadStatus;
};

export type IListLeadsParams = {
  search?: string;
  status?: ILeadStatus;
};
