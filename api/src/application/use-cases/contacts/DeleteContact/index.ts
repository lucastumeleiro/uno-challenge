import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import { ContactNotFoundError } from "@application/exceptions/ContactNotFoundError";
import { ContactHasLeadsError } from "@application/exceptions/ContactHasLeadsError";

export class DeleteContact {
  constructor(
    private readonly contactRepository: IContactRepository,
    private readonly leadRepository: ILeadRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      throw new ContactNotFoundError(id);
    }

    const leads = await this.leadRepository.findByContactId(id);
    if (leads.length > 0) {
      throw new ContactHasLeadsError(id, leads.length);
    }

    await this.contactRepository.delete(id);
  }
}
