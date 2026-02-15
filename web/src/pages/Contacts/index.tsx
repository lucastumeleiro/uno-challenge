import { useState, useEffect, useTransition, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "@Hooks/useContacts";
import { useDebounce } from "@Hooks/useDebounce";
import { useConfirmDelete } from "@Hooks/useConfirmDelete";
import type { IContactDTO } from "@Hooks/useContacts/Types";
import { Page } from "@/components/_ui/Page";
import { Spinner } from "@/components/_ui/Spinner";
import { InputSearch } from "@/components/_ui/inputs/InputSearch";
import { Button } from "@/components/_ui/Button";
import { TableButton } from "@/components/_ui/TableButton";
import { Table } from "@/components/_ui/Table";
import { Pagination } from "@/components/_ui/Pagination";
import type { ISortDirection } from "@/components/_ui/Table/Types";
import type { ISortColumn } from "./Types";

const ITEMS_PER_PAGE = 10;

function Contacts() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const [contacts, setContacts] = useState<IContactDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<ISortColumn>(null);
  const [sortDirection, setSortDirection] = useState<ISortDirection>(undefined);

  const debouncedSearchTerm = useDebounce(searchTerm);
  const { getContacts, deleteContact } = useContacts();

  const { confirmDelete, ConfirmDeleteModal } = useConfirmDelete({
    onConfirm: (id) => {
      startTransition(async () => {
        const success = await deleteContact(id);
        if (success) {
          loadContacts();
        }
      });
    },
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadContacts();
  }, [debouncedSearchTerm, page]);

  const sortedContacts = useMemo(() => {
    let result = [...contacts];

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
  }, [contacts, sortColumn, sortDirection]);

  async function loadContacts() {
    startTransition(async () => {
      const result = await getContacts({
        search: debouncedSearchTerm || undefined,
        page,
        limit: ITEMS_PER_PAGE,
      });
      setContacts(result.data);
      setTotal(result.total);
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
      title={"Contatos"}
      actionButtons={
        <Button
          variant="success"
          onClick={() => navigate("/contacts/form")}
          disabled={isPending}
        >
          Novo contato
        </Button>
      }
    >
      <div className="w-full mb-6">
        <InputSearch
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {sortedContacts.length === 0 && !isPending && (
        <div className="text-center p-10 text-neutral-medium">
          {searchTerm
            ? "Nenhum contato encontrado com os filtros aplicados."
            : "Nenhum contato cadastrado."}
        </div>
      )}

      {(sortedContacts.length > 0 || isPending) && (
        <div className={`relative ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
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
              <Table.Head>Email</Table.Head>
              <Table.Head>Telefone</Table.Head>
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
            {sortedContacts.map((contact) => (
              <Table.Row key={contact.id}>
                <Table.Cell label="Nome">{contact.name}</Table.Cell>
                <Table.Cell label="Email">{contact.email}</Table.Cell>
                <Table.Cell label="Telefone">{contact.phone}</Table.Cell>
                <Table.Cell label="Data">{formatDate(contact.createdAt)}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2 justify-end">
                    <TableButton
                      variant="edit"
                      onClick={() => navigate(`/contacts/form/${contact.id}`)}
                      disabled={isPending}
                    />
                    <TableButton
                      variant="delete"
                      onClick={() => confirmDelete(contact.id, contact.name)}
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

      <Pagination
        page={page}
        total={total}
        limit={ITEMS_PER_PAGE}
        onPageChange={setPage}
        disabled={isPending}
      />

      {ConfirmDeleteModal}
    </Page>
  );
}

export { Contacts };
