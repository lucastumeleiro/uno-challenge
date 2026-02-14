import type { Lead } from "@domain/entities/Lead";
import type { LeadResponseDTO } from "@application/dtos/lead.dto";

export class LeadMapper {
  static toDTO(lead: Lead, contactName = ""): LeadResponseDTO {
    return {
      id: lead.id,
      contactId: lead.contactId,
      contactName,
      name: lead.name,
      company: lead.company,
      status: lead.status,
      createdAt: lead.createdAt,
    };
  }

  static toDTOList(
    leads: Lead[],
    contactNamesMap: Map<string, string>,
  ): LeadResponseDTO[] {
    return leads.map((lead) => {
      const contactName = contactNamesMap.get(lead.contactId) ?? "";
      return this.toDTO(lead, contactName);
    });
  }
}
