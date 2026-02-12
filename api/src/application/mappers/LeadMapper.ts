import type { Lead } from "@domain/entities/Lead";
import type { LeadResponseDTO } from "@application/dtos/lead.dto";

export class LeadMapper {
  static toDTO(lead: Lead): LeadResponseDTO {
    return {
      id: lead.id,
      contactId: lead.contactId,
      name: lead.name,
      company: lead.company,
      status: lead.status,
      createdAt: lead.createdAt,
    };
  }

  static toDTOList(leads: Lead[]): LeadResponseDTO[] {
    return leads.map((lead) => this.toDTO(lead));
  }
}
