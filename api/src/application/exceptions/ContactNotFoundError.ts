export class ContactNotFoundError extends Error {
  constructor(id: string) {
    super(`Contato com id ${id} não encontrado`);
    this.name = "ContactNotFoundError";
  }
}
