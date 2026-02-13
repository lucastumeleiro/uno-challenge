import { LeadValidationError } from "@domain/exceptions/LeadValidationError";

export type LeadStatus =
  | "novo"
  | "contactado"
  | "qualificado"
  | "convertido"
  | "perdido";

export class Lead {
  constructor(
    public readonly id: string,
    public contactId: string,
    public name: string,
    public company: string,
    public status: LeadStatus,
    public readonly createdAt: string,
  ) {
    this.validate();
  }

  static create(data: {
    contactId: string;
    name: string;
    company: string;
    status: LeadStatus;
  }): Lead {
    return new Lead(
      crypto.randomUUID(),
      data.contactId,
      data.name,
      data.company,
      data.status,
      new Date().toISOString(),
    );
  }

  update(data: {
    contactId?: string | undefined;
    name?: string | undefined;
    company?: string | undefined;
    status?: LeadStatus | undefined;
  }): void {
    if (data.contactId !== undefined) {
      this.contactId = data.contactId;
    }
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.company !== undefined) {
      this.company = data.company;
    }
    if (data.status !== undefined) {
      this.status = data.status;
    }
    this.validate();
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this.name || this.name.trim().length < 2) {
      errors.push("Nome deve ter no mínimo 2 caracteres");
    }

    if (!this.company || this.company.trim().length < 2) {
      errors.push("Empresa deve ter no mínimo 2 caracteres");
    }

    if (!this.contactId || this.contactId.trim().length === 0) {
      errors.push("ID do contato é obrigatório");
    }

    if (!this.isValidStatus(this.status)) {
      errors.push(
        "Status deve ser: novo, contactado, qualificado, convertido ou perdido",
      );
    }

    if (errors.length > 0) {
      throw new LeadValidationError(errors);
    }
  }

  private isValidStatus(status: string): boolean {
    const validStatuses = [
      "novo",
      "contactado",
      "qualificado",
      "convertido",
      "perdido",
    ];
    return validStatuses.includes(status);
  }
}
