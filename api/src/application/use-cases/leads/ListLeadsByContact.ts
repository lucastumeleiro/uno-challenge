import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type { LeadResponseDTO } from "@application/dtos/lead.dto";
import { ContactNotFoundError } from "@application/exceptions/ContactNotFoundError";
import { LeadMapper } from "@application/mappers/LeadMapper";

export class ListLeadsByContact {
  constructor(
    private readonly leadRepository: ILeadRepository,
    private readonly contactRepository: IContactRepository,
  ) {}

  async execute(contactId: string): Promise<LeadResponseDTO[]> {
    const contact = await this.contactRepository.findById(contactId);
    if (!contact) {
      throw new ContactNotFoundError(contactId);
    }

    const leads = await this.leadRepository.findByContactId(contactId);
    const contactNamesMap = new Map([[contactId, contact.name]]);
    return LeadMapper.toDTOList(leads, contactNamesMap);
  }
}
