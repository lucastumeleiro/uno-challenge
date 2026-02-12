import type { Contact } from "@domain/entities/Contact";
import type { ContactResponseDTO } from "@application/dtos/contact.dto";

export class ContactMapper {
  static toDTO(contact: Contact): ContactResponseDTO {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      createdAt: contact.createdAt,
    };
  }

  static toDTOList(contacts: Contact[]): ContactResponseDTO[] {
    return contacts.map((contact) => this.toDTO(contact));
  }
}
