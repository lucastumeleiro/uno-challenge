export type IDashboardStatusDistribution = {
  status: string;
  count: number;
  percentage: number;
};

export type IDashboardTopContact = {
  id: string;
  name: string;
  email: string;
  leadsCount: number;
};

export type IDashboardData = {
  totalLeads: number;
  totalContacts: number;
  conversionRate: number;
  averageLeadsPerContact: number;
  statusDistribution: IDashboardStatusDistribution[];
  topContacts: IDashboardTopContact[];
};
