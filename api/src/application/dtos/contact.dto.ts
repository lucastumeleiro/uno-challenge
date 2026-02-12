export interface CreateContactDTO {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateContactDTO {
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
}

export interface ContactResponseDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}
