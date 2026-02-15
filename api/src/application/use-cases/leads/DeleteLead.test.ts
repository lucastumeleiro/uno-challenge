import { describe, it, expect, beforeEach } from "vitest";
import { DeleteLead } from "./DeleteLead";
import { InMemoryLeadRepository } from "@infrastructure/repositories/InMemoryLeadRepository";
import { Lead } from "@domain/entities/Lead";
import { LeadNotFoundError } from "@application/exceptions/LeadNotFoundError";

describe("DeleteLead Use Case", () => {
  let leadRepository: InMemoryLeadRepository;
  let deleteLead: DeleteLead;

  beforeEach(() => {
    leadRepository = new InMemoryLeadRepository();
    deleteLead = new DeleteLead(leadRepository);
  });

  it("deve deletar um lead existente", async () => {
    const lead = Lead.create({
      contactId: crypto.randomUUID(),
      name: "Lead Teste",
      company: "Empresa Teste",
      status: "novo",
    });
    await leadRepository.save(lead);

    await deleteLead.execute(lead.id);

    const found = await leadRepository.findById(lead.id);
    expect(found).toBeNull();
  });

  it("deve lançar erro quando lead não existe", async () => {
    await expect(deleteLead.execute("id-inexistente")).rejects.toThrow(
      LeadNotFoundError,
    );
  });
});
