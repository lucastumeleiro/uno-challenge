import { useState, useEffect, useTransition, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLeads } from "@Hooks/useLeads";
import { useDebounce } from "@Hooks/useDebounce";
import { useConfirmDelete } from "@Hooks/useConfirmDelete";
import type { ILeadDTO, ILeadStatus } from "@Hooks/useLeads/Types";
import type { ILeadStatusWithAll } from "@/components/_ui/selects/SelectStatus/Types";
import { Page } from "@/components/_ui/Page";
import { Spinner } from "@/components/_ui/Spinner";
import { InputSearch } from "@/components/_ui/inputs/InputSearch";
import { SelectStatus } from "@/components/_ui/selects/SelectStatus";
import { Button } from "@/components/_ui/Button";
import { TableButton } from "@/components/_ui/TableButton";
import { Table } from "@/components/_ui/Table";
import { Badge } from "@/components/_ui/Badge";
import type { ISortDirection } from "@/components/_ui/Table/Types";
import type { ISortColumn } from "./Types";

const STATUS_LABELS: Record<ILeadStatus, string> = {
  novo: "Novo",
  contactado: "Contactado",
  qualificado: "Qualificado",
  convertido: "Convertido",
  perdido: "Perdido",
};

function Leads() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const [leads, setLeads] = useState<ILeadDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ILeadStatusWithAll>("todos");
  const [sortColumn, setSortColumn] = useState<ISortColumn>(null);
  const [sortDirection, setSortDirection] = useState<ISortDirection>(undefined);

  const debouncedSearchTerm = useDebounce(searchTerm);
  const { getLeads, deleteLead } = useLeads();

  const { confirmDelete, ConfirmDeleteModal } = useConfirmDelete({
    onConfirm: (id) => {
      startTransition(async () => {
        const success = await deleteLead(id);
        if (success) {
          setLeads((prev) => prev.filter((lead) => lead.id !== id));
        }
      });
    },
  });

  useEffect(() => {
    loadLeads();
  }, [debouncedSearchTerm, statusFilter]);

  const sortedLeads = useMemo(() => {
    let result = [...leads];

    if (sortColumn && sortDirection) {
      result.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [leads, sortColumn, sortDirection]);

  async function loadLeads() {
    startTransition(async () => {
      const data = await getLeads({
        search: debouncedSearchTerm || undefined,
        status: statusFilter !== "todos" ? statusFilter : undefined,
      });
      setLeads(data);
    });
  }

  function handleSort(column: ISortColumn) {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(undefined);
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  }

  return (
    <Page
      title="Leads"
      actionButtons={
        <Button
          variant="success"
          onClick={() => navigate("/leads/form")}
          disabled={isPending}
        >
          Novo Lead
        </Button>
      }
    >
      <div className="flex flex-col md:flex-row gap-4 w-full mb-6">
        <div className="flex-1">
          <InputSearch
            placeholder="Buscar por nome ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <SelectStatus
            value={statusFilter}
            onValueChange={setStatusFilter}
            includeAll
            disabled={isPending}
          />
        </div>
      </div>

      {sortedLeads.length === 0 && !isPending && (
        <div className="text-center p-10 text-neutral-medium">
          {searchTerm || statusFilter !== "todos"
            ? "Nenhum lead encontrado com os filtros aplicados."
            : "Nenhum lead cadastrado."}
        </div>
      )}

      {(sortedLeads.length > 0 || isPending) && (
        <div
          className={`relative ${isPending ? "opacity-50 pointer-events-none" : ""}`}
        >
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Spinner size="lg" />
            </div>
          )}
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head
                  sortable
                  sortDirection={
                    sortColumn === "name" ? sortDirection : undefined
                  }
                  onSort={() => handleSort("name")}
                >
                  Nome
                </Table.Head>
                <Table.Head>Empresa</Table.Head>
                <Table.Head>Contato</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head
                  sortable
                  sortDirection={
                    sortColumn === "createdAt" ? sortDirection : undefined
                  }
                  onSort={() => handleSort("createdAt")}
                >
                  Data
                </Table.Head>
                <Table.Head>Ações</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedLeads.map((lead) => (
                <Table.Row key={lead.id}>
                  <Table.Cell label="Nome">{lead.name}</Table.Cell>
                  <Table.Cell label="Empresa">{lead.company}</Table.Cell>
                  <Table.Cell label="Contato">{lead.contactName}</Table.Cell>
                  <Table.Cell label="Status">
                    <Badge variant={lead.status}>
                      {STATUS_LABELS[lead.status]}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell label="Data">
                    {formatDate(lead.createdAt)}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2 justify-end">
                      <TableButton
                        variant="edit"
                        onClick={() => navigate(`/leads/form/${lead.id}`)}
                        disabled={isPending}
                      />
                      <TableButton
                        variant="delete"
                        onClick={() => confirmDelete(lead.id, lead.name)}
                        disabled={isPending}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      )}

      {ConfirmDeleteModal}
    </Page>
  );
}

export { Leads };
