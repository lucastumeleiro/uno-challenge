import { Contact } from "@domain/entities/Contact";

export interface IContactRepository {
  findById(id: string): Promise<Contact | null>;
  findAll(search?: string): Promise<Contact[]>;
  findPaginated(search?: string, page?: number, limit?: number): Promise<{ data: Contact[]; total: number }>;
  save(contact: Contact): Promise<Contact>;
  update(contact: Contact): Promise<Contact>;
  delete(id: string): Promise<void>;
  existsByEmail(email: string, excludeId?: string): Promise<boolean>;
}
