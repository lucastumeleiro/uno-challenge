import { Contact } from "@domain/entities/Contact";
import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type {
  CreateContactDTO,
  ContactResponseDTO,
} from "@application/dtos/contact.dto";
import { ContactEmailAlreadyExistsError } from "@application/exceptions/ContactEmailAlreadyExistsError";
import { ContactMapper } from "@application/mappers/ContactMapper";

export class CreateContact {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(data: CreateContactDTO): Promise<ContactResponseDTO> {
    const emailExists = await this.contactRepository.existsByEmail(data.email);
    if (emailExists) {
      throw new ContactEmailAlreadyExistsError(data.email);
    }

    const contact = Contact.create(data);
    const savedContact = await this.contactRepository.save(contact);

    return ContactMapper.toDTO(savedContact);
  }
}
