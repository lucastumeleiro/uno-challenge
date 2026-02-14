import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type { LeadResponseDTO } from "@application/dtos/lead.dto";
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
  ): Promise<LeadResponseDTO[]> {
    const leads = await this.leadRepository.findAll(search, status);

    const contactIds = [...new Set(leads.map((lead) => lead.contactId))];
    const contactNamesMap = new Map<string, string>();

    await Promise.all(
      contactIds.map(async (id) => {
        const contact = await this.contactRepository.findById(id);
        if (contact) contactNamesMap.set(id, contact.name);
      }),
    );

    return LeadMapper.toDTOList(leads, contactNamesMap);
  }
}
