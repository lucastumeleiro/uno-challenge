export class LeadContactNotFoundError extends Error {
  constructor(contactId: string) {
    super(
      `Contato com ID ${contactId} não encontrado. Um lead deve estar vinculado a um contato existente.`,
    );
    this.name = "LeadContactNotFoundError";
  }
}
