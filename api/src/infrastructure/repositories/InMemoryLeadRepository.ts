import { Lead, type LeadStatus } from "@domain/entities/Lead";
import type { ILeadRepository } from "@domain/repositories/ILeadRepository";

export class InMemoryLeadRepository implements ILeadRepository {
  private leads: Lead[] = [];

  async findById(id: string): Promise<Lead | null> {
    const lead = this.leads.find((lead) => lead.id === id);
    return lead || null;
  }

  async findAll(search?: string, status?: LeadStatus): Promise<Lead[]> {
    let filteredLeads = [...this.leads];

    if (search) {
      const searchLower = search.toLowerCase();
      filteredLeads = filteredLeads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchLower) ||
          lead.company.toLowerCase().includes(searchLower),
      );
    }

    if (status) {
      filteredLeads = filteredLeads.filter((lead) => lead.status === status);
    }

    return filteredLeads;
  }

  async findByContactId(contactId: string): Promise<Lead[]> {
    return this.leads.filter((lead) => lead.contactId === contactId);
  }

  async save(lead: Lead): Promise<Lead> {
    this.leads.push(lead);
    return lead;
  }

  async update(lead: Lead): Promise<Lead> {
    const index = this.leads.findIndex(
      (existingLead) => existingLead.id === lead.id,
    );
    if (index !== -1) {
      this.leads[index] = lead;
    }
    return lead;
  }

  async delete(id: string): Promise<void> {
    this.leads = this.leads.filter((lead) => lead.id !== id);
  }
}
