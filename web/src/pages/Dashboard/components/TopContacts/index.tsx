import type { IDashboardData } from "@Hooks/useDashboard/Types";

function DashboardTopContacts({ data }: { data: IDashboardData }) {
  return (
    <div className="border border-neutral-light rounded-lg p-6">
      <h3 className="text-base font-semibold text-neutral-dark mb-4">
        Top 5 contatos
      </h3>
      {data.topContacts.length === 0 ? (
        <div className="text-center p-6 text-neutral-medium">
          Nenhum contato com leads.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.topContacts.map((contact, index) => (
            <div
              key={contact.id}
              className="flex items-center gap-4 p-3 rounded-lg border border-neutral-light/50"
            >
              <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-semibold shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-dark truncate">
                  {contact.name}
                </p>
                <p className="text-xs text-neutral-medium truncate">
                  {contact.email}
                </p>
              </div>
              <span className="text-xs font-medium text-neutral-dark bg-neutral-light/30 px-3 py-1 rounded-full shrink-0">
                {contact.leadsCount} leads
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { DashboardTopContacts };
