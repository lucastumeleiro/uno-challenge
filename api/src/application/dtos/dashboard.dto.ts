export interface DashboardStatusDistribution {
  status: string;
  count: number;
  percentage: number;
}

export interface DashboardTopContact {
  id: string;
  name: string;
  email: string;
  leadsCount: number;
}

export interface DashboardResponseDTO {
  totalLeads: number;
  totalContacts: number;
  conversionRate: number;
  averageLeadsPerContact: number;
  statusDistribution: DashboardStatusDistribution[];
  topContacts: DashboardTopContact[];
}
