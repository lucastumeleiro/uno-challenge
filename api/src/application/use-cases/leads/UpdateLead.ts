import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type {
  UpdateLeadDTO,
  LeadResponseDTO,
} from "@application/dtos/lead.dto";
import { LeadNotFoundError } from "@application/exceptions/LeadNotFoundError";
import { LeadContactNotFoundError } from "@application/exceptions/LeadContactNotFoundError";
import { LeadMapper } from "@application/mappers/LeadMapper";

export class UpdateLead {
  constructor(
    private readonly leadRepository: ILeadRepository,
    private readonly contactRepository: IContactRepository,
  ) {}

  async execute(id: string, data: UpdateLeadDTO): Promise<LeadResponseDTO> {
    const lead = await this.leadRepository.findById(id);

    if (!lead) {
      throw new LeadNotFoundError(id);
    }

    if (data.contactId !== undefined) {
      const contactExists = await this.contactRepository.findById(
        data.contactId,
      );
      if (!contactExists) {
        throw new LeadContactNotFoundError(data.contactId);
      }
    }

    lead.update(data);
    const updatedLead = await this.leadRepository.update(lead);

    return LeadMapper.toDTO(updatedLead);
  }
}
