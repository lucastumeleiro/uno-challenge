import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import type { LeadResponseDTO } from "@application/dtos/lead.dto";
import type { LeadStatus } from "@domain/entities/Lead";
import { LeadMapper } from "@application/mappers/LeadMapper";

export class ListLeads {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(
    search?: string,
    status?: LeadStatus,
  ): Promise<LeadResponseDTO[]> {
    const leads = await this.leadRepository.findAll(search, status);
    return LeadMapper.toDTOList(leads);
  }
}
