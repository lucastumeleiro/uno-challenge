export class LeadNotFoundError extends Error {
  constructor(id: string) {
    super(`Lead com ID ${id} não encontrado`);
    this.name = "LeadNotFoundError";
  }
}
