import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type {
  UpdateContactDTO,
  ContactResponseDTO,
} from "@application/dtos/contact.dto";
import { ContactNotFoundError } from "@application/exceptions/ContactNotFoundError";
import { ContactEmailAlreadyExistsError } from "@application/exceptions/ContactEmailAlreadyExistsError";
import { ContactMapper } from "@application/mappers/ContactMapper";

export class UpdateContact {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(
    id: string,
    data: UpdateContactDTO,
  ): Promise<ContactResponseDTO> {
    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      throw new ContactNotFoundError(id);
    }

    if (data.email) {
      const emailExists = await this.contactRepository.existsByEmail(
        data.email,
        id,
      );
      if (emailExists) {
        throw new ContactEmailAlreadyExistsError(data.email);
      }
    }

    contact.update(data);
    const updatedContact = await this.contactRepository.update(contact);

    return ContactMapper.toDTO(updatedContact);
  }
}
