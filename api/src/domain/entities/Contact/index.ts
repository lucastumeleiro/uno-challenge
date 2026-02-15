import { ContactValidationError } from "@domain/exceptions/ContactValidationError";

export class Contact {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public phone: string,
    public readonly createdAt: string,
  ) {
    this.validate();
  }

  static create(data: { name: string; email: string; phone: string }): Contact {
    return new Contact(
      crypto.randomUUID(),
      data.name,
      data.email,
      data.phone,
      new Date().toISOString(),
    );
  }

  update(data: {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
  }): void {
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.email !== undefined) {
      this.email = data.email;
    }
    if (data.phone !== undefined) {
      this.phone = data.phone;
    }
    this.validate();
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this.name || this.name.trim().length < 2) {
      errors.push("Nome deve ter no mínimo 2 caracteres");
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push("Formato de email inválido");
    }

    if (!this.phone || this.phone.trim().length < 1) {
      errors.push("Telefone é obrigatório");
    }

    if (errors.length > 0) {
      throw new ContactValidationError(errors);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
