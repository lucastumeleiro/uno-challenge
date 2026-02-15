import type { ILeadRepository } from "@domain/repositories/ILeadRepository";
import type { IContactRepository } from "@domain/repositories/IContactRepository";
import type { LeadStatus } from "@domain/entities/Lead";
import type { DashboardResponseDTO } from "@application/dtos/dashboard.dto";

const ALL_STATUSES: LeadStatus[] = [
  "novo",
  "contactado",
  "qualificado",
  "convertido",
  "perdido",
];

export class GetDashboard {
  constructor(
    private readonly leadRepository: ILeadRepository,
    private readonly contactRepository: IContactRepository,
  ) {}

  async execute(): Promise<DashboardResponseDTO> {
    const [leads, contacts] = await Promise.all([
      this.leadRepository.findAll(),
      this.contactRepository.findAll(),
    ]);

    const totalLeads = leads.length;
    const totalContacts = contacts.length;

    const convertedCount = leads.filter(
      (lead) => lead.status === "convertido",
    ).length;
    const conversionRate =
      totalLeads > 0 ? (convertedCount / totalLeads) * 100 : 0;

    const averageLeadsPerContact =
      totalContacts > 0 ? totalLeads / totalContacts : 0;

    const statusCounts = new Map<string, number>();
    for (const status of ALL_STATUSES) {
      statusCounts.set(status, 0);
    }
    for (const lead of leads) {
      statusCounts.set(lead.status, (statusCounts.get(lead.status) ?? 0) + 1);
    }

    const statusDistribution = ALL_STATUSES.map((status) => {
      const count = statusCounts.get(status) ?? 0;
      return {
        status,
        count,
        percentage: totalLeads > 0 ? (count / totalLeads) * 100 : 0,
      };
    });

    const leadsPerContact = new Map<string, number>();
    for (const lead of leads) {
      leadsPerContact.set(
        lead.contactId,
        (leadsPerContact.get(lead.contactId) ?? 0) + 1,
      );
    }

    const contactsMap = new Map(contacts.map((c) => [c.id, c]));

    const topContacts = [...leadsPerContact.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([contactId, leadsCount]) => {
        const contact = contactsMap.get(contactId);
        return {
          id: contactId,
          name: contact?.name ?? "",
          email: contact?.email ?? "",
          leadsCount,
        };
      });

    return {
      totalLeads,
      totalContacts,
      conversionRate,
      averageLeadsPerContact,
      statusDistribution,
      topContacts,
    };
  }
}
