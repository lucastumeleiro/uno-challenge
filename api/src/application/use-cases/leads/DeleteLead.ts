import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import { LeadNotFoundError } from "@application/exceptions/LeadNotFoundError";

export class DeleteLead {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(id: string): Promise<void> {
    const lead = await this.leadRepository.findById(id);

    if (!lead) {
      throw new LeadNotFoundError(id);
    }

    await this.leadRepository.delete(id);
  }
}
