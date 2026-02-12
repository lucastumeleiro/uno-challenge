export class LeadValidationError extends Error {
  constructor(public readonly errors: string[]) {
    super(`Erro de validação: ${errors.join(", ")}`);
    this.name = "LeadValidationError";
  }
}
