import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type { ContactResponseDTO } from "@application/dtos/contact.dto";
import type { PaginatedResponseDTO } from "@application/dtos/pagination.dto";
import { ContactMapper } from "@application/mappers/ContactMapper";

export class ListContacts {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(search?: string, page?: number, limit?: number): Promise<PaginatedResponseDTO<ContactResponseDTO>> {
    const { data, total } = await this.contactRepository.findPaginated(search, page, limit);
    return {
      data: ContactMapper.toDTOList(data),
      total,
      page: page ?? 1,
      limit: limit ?? 10,
    };
  }
}
