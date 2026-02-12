import type { IContactRepository } from "@domain/repositories/IContactRepository";
import { ContactNotFoundError } from "@application/exceptions/ContactNotFoundError";

export class DeleteContact {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(id: string): Promise<void> {
    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      throw new ContactNotFoundError(id);
    }

    await this.contactRepository.delete(id);
  }
}
