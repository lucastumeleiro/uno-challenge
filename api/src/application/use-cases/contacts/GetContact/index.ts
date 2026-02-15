import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type { ContactResponseDTO } from "@application/dtos/contact.dto";
import { ContactNotFoundError } from "@application/exceptions/ContactNotFoundError";
import { ContactMapper } from "@application/mappers/ContactMapper";

export class GetContact {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(id: string): Promise<ContactResponseDTO> {
    const contact = await this.contactRepository.findById(id);

    if (!contact) {
      throw new ContactNotFoundError(id);
    }

    return ContactMapper.toDTO(contact);
  }
}
