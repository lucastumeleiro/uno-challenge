import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type { LeadResponseDTO } from "@application/dtos/lead.dto";
import { LeadNotFoundError } from "@application/exceptions/LeadNotFoundError";
import { LeadMapper } from "@application/mappers/LeadMapper";

export class GetLead {
  constructor(
    private readonly leadRepository: ILeadRepository,
    private readonly contactRepository: IContactRepository,
  ) {}

  async execute(id: string): Promise<LeadResponseDTO> {
    const lead = await this.leadRepository.findById(id);

    if (!lead) {
      throw new LeadNotFoundError(id);
    }

    const contact = await this.contactRepository.findById(lead.contactId);
    return LeadMapper.toDTO(lead, contact?.name ?? "");
  }
}
