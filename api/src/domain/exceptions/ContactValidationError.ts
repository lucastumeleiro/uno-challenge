export class ContactValidationError extends Error {
  constructor(public readonly errors: string[]) {
    super(`Validação de contato falhou: ${errors.join(", ")}`);
    this.name = "ContactValidationError";
  }
}
