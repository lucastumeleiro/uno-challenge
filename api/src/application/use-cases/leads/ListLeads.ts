import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type { LeadResponseDTO } from "@application/dtos/lead.dto";
import type { PaginatedResponseDTO } from "@application/dtos/pagination.dto";
import type { LeadStatus } from "@domain/entities/Lead";
import { LeadMapper } from "@application/mappers/LeadMapper";

export class ListLeads {
  constructor(
    private readonly leadRepository: ILeadRepository,
    private readonly contactRepository: IContactRepository,
  ) {}

  async execute(
    search?: string,
    status?: LeadStatus,
    page?: number,
    limit?: number,
  ): Promise<PaginatedResponseDTO<LeadResponseDTO>> {
    const { data: leads, total } = await this.leadRepository.findPaginated(search, status, page, limit);

    const contactIds = [...new Set(leads.map((lead) => lead.contactId))];
    const contactNamesMap = new Map<string, string>();

    await Promise.all(
      contactIds.map(async (id) => {
        const contact = await this.contactRepository.findById(id);
        if (contact) contactNamesMap.set(id, contact.name);
      }),
    );

    return {
      data: LeadMapper.toDTOList(leads, contactNamesMap),
      total,
      page: page ?? 1,
      limit: limit ?? 10,
    };
  }
}
