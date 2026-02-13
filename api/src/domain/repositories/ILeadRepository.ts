import { Lead, type LeadStatus } from "@domain/entities/Lead";

export interface ILeadRepository {
  findById(id: string): Promise<Lead | null>;
  findAll(search?: string, status?: LeadStatus): Promise<Lead[]>;
  findByContactId(contactId: string): Promise<Lead[]>;
  save(lead: Lead): Promise<Lead>;
  update(lead: Lead): Promise<Lead>;
  delete(id: string): Promise<void>;
}
