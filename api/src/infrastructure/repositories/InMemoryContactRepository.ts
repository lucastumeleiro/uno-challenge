import { Contact } from "@domain/entities/Contact";
import type { IContactRepository } from "@domain/repositories/IContactRepository";

export class InMemoryContactRepository implements IContactRepository {
  private contacts: Contact[] = [];

  async findById(id: string): Promise<Contact | null> {
    const contact = this.contacts.find((contact) => contact.id === id);
    return contact || null;
  }

  async findAll(search?: string): Promise<Contact[]> {
    if (!search) {
      return [...this.contacts];
    }

    const searchLower = search.toLowerCase();
    return this.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower),
    );
  }

  async findPaginated(search?: string, page = 1, limit = 10): Promise<{ data: Contact[]; total: number }> {
    const all = await this.findAll(search);
    const total = all.length;
    const start = (page - 1) * limit;
    const data = all.slice(start, start + limit);
    return { data, total };
  }

  async save(contact: Contact): Promise<Contact> {
    this.contacts.push(contact);
    return contact;
  }

  async update(contact: Contact): Promise<Contact> {
    const index = this.contacts.findIndex(
      (existingContact) => existingContact.id === contact.id,
    );
    if (index !== -1) {
      this.contacts[index] = contact;
    }
    return contact;
  }

  async delete(id: string): Promise<void> {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
  }

  async existsByEmail(email: string, excludeId?: string): Promise<boolean> {
    return this.contacts.some(
      (contact) => contact.email === email && contact.id !== excludeId,
    );
  }
}
