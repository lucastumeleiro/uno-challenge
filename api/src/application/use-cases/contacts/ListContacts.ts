import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type { ContactResponseDTO } from "@application/dtos/contact.dto";
import { ContactMapper } from "@application/mappers/ContactMapper";

export class ListContacts {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(search?: string): Promise<ContactResponseDTO[]> {
    const contacts = await this.contactRepository.findAll(search);
    return ContactMapper.toDTOList(contacts);
  }
}
