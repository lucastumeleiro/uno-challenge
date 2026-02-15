import type { IDashboardData } from "@Hooks/useDashboard/Types";
import { KpiCard } from "./components/KpiCard";

export interface IDashboardKPIProps {}

function DashboardKPI({ data }: { data: IDashboardData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KpiCard label="Total de leads" value={String(data.totalLeads)} />
      <KpiCard
        label="Taxa de conversão"
        value={`${data.conversionRate.toFixed(2).replace(".", ",")}%`}
        subtitle="leads convertidos"
      />
      <KpiCard label="Total de contatos" value={String(data.totalContacts)} />
      <KpiCard
        label="Média por contato"
        value={data.averageLeadsPerContact.toFixed(1).replace(".", ",")}
        subtitle="Leads/contato"
      />
    </div>
  );
}

export { DashboardKPI };
