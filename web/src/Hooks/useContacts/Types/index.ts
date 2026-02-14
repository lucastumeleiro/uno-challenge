export type IContactDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type ICreateContactData = {
  name: string;
  email: string;
  phone: string;
};

export type IUpdateContactData = {
  name?: string;
  email?: string;
  phone?: string;
};

export type IListContactsParams = {
  search?: string;
};
