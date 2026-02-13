export type ContactDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type CreateContactData = {
  name: string;
  email: string;
  phone: string;
};

export type UpdateContactData = {
  name?: string;
  email?: string;
  phone?: string;
};

export type ListContactsParams = {
  search?: string;
};
