import { Badge } from "@/components/_ui/Badge";
import { STATUS_LABELS } from "@common/Constants";
import type { IDashboardData } from "@Hooks/useDashboard/Types";
import type { ILeadStatus } from "@Hooks/useLeads/Types";

function DashboardStatusDistribution({ data }: { data: IDashboardData }) {
  return (
    <div className="border border-neutral-light rounded-lg p-6">
      <h3 className="text-base font-semibold text-neutral-dark mb-4">
        Distribuição por status
      </h3>
      <div className="flex flex-col gap-4">
        {data.statusDistribution.map((item) => (
          <div key={item.status} className="flex items-center gap-3">
            <div className="w-28 shrink-0">
              <Badge variant={item.status as ILeadStatus}>
                {STATUS_LABELS[item.status as ILeadStatus] ?? item.status}
              </Badge>
            </div>
            <div className="flex-1 flex items-center gap-3">
              <span className="text-sm text-neutral-medium w-14 text-right shrink-0">
                {item.percentage.toFixed(2).replace(".", ",")}%
              </span>
              <span className="text-sm font-semibold text-neutral-dark w-6 text-right shrink-0">
                {item.count}
              </span>
              <div className="flex-1 h-2 bg-neutral-light/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { DashboardStatusDistribution };
