export class ContactEmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Contato com email ${email} já existe`);
    this.name = "ContactEmailAlreadyExistsError";
  }
}
