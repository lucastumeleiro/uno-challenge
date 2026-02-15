import { useState, useEffect, useTransition } from "react";
import { useDashboard } from "@Hooks/useDashboard";
import type { IDashboardData } from "@Hooks/useDashboard/Types";
import { Page } from "@/components/_ui/Page";
import { Spinner } from "@/components/_ui/Spinner";
import { DashboardKPI } from "./components/KPI";
import { DashboardStatusDistribution } from "./components/StatusDistribution";
import { DashboardTopContacts } from "./components/TopContacts";

function Dashboard() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<IDashboardData | null>(null);
  const { getDashboard } = useDashboard();

  useEffect(() => {
    startTransition(async () => {
      const result = await getDashboard();
      setData(result);
    });
  }, []);

  if (!data && isPending) {
    return (
      <Page title="Dashboard">
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
        </div>
      </Page>
    );
  }

  if (!data) {
    return (
      <Page title="Dashboard">
        <div className="text-center p-10 text-neutral-medium">
          Erro ao carregar dados do dashboard.
        </div>
      </Page>
    );
  }

  return (
    <Page title="Dashboard">
      <DashboardKPI data={data} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardStatusDistribution data={data} />
        <DashboardTopContacts data={data} />
      </div>
    </Page>
  );
}

export { Dashboard };
