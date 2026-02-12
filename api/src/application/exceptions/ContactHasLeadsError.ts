export class ContactHasLeadsError extends Error {
  constructor(contactId: string, leadsCount: number) {
    super(
      `Não é possível deletar o contato ${contactId} pois ele possui ${leadsCount} lead(s) vinculado(s). exclua os leads primeiro.`,
    );
    this.name = "ContactHasLeadsError";
  }
}
