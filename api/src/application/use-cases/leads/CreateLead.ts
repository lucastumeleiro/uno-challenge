import { Lead } from "@domain/entities/Lead";
import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type {
  CreateLeadDTO,
  LeadResponseDTO,
} from "@application/dtos/lead.dto";
import { LeadContactNotFoundError } from "@application/exceptions/LeadContactNotFoundError";
import { LeadMapper } from "@application/mappers/LeadMapper";

export class CreateLead {
  constructor(
    private readonly leadRepository: ILeadRepository,
    private readonly contactRepository: IContactRepository,
  ) {}

  async execute(data: CreateLeadDTO): Promise<LeadResponseDTO> {
    const contactExists = await this.contactRepository.findById(data.contactId);
    if (!contactExists) {
      throw new LeadContactNotFoundError(data.contactId);
    }

    const lead = Lead.create(data);
    const savedLead = await this.leadRepository.save(lead);

    return LeadMapper.toDTO(savedLead);
  }
}
