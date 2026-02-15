import { useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContacts } from "@Hooks/useContacts";
import { useConfirmDelete } from "@Hooks/useConfirmDelete";
import { useLeads } from "@Hooks/useLeads";
import type { ILeadDTO } from "@Hooks/useLeads/Types";
import { Page } from "@/components/_ui/Page";
import { Button } from "@/components/_ui/Button";
import { Form } from "@/components/_ui/Form";
import { Field } from "@/components/_ui/Field";
import { InputText } from "@/components/_ui/inputs/InputText";
import { InputEmail } from "@/components/_ui/inputs/InputEmail";
import { InputPhone } from "@/components/_ui/inputs/InputPhone";
import { Table } from "@/components/_ui/Table";
import { Badge } from "@/components/_ui/Badge";
import { TableButton } from "@/components/_ui/TableButton";
import type { ContactFormData } from "./Types";
import { contactSchema } from "./Utils/validation";
import { FORM_ID, INITIAL_VALUES } from "./Utils/constants";
import { STATUS_LABELS } from "@common/Constants";

function ContactForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const {
    getContact,
    getContactLeads,
    createContact,
    updateContact,
    deleteContact,
  } = useContacts();
  const { deleteLead } = useLeads();

  const [leads, setLeads] = useState<ILeadDTO[]>([]);
  const isEditing = !!id;

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: async () => {
      if (id) {
        const [contact, contactLeads] = await Promise.all([
          getContact(id),
          getContactLeads(id),
        ]);

        setLeads(contactLeads);

        if (contact) {
          return {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
          };
        }
      }

      return INITIAL_VALUES;
    },
  });

  const { confirmDelete: confirmDeleteContact, ConfirmDeleteModal } =
    useConfirmDelete({
      onConfirm: (contactId) => {
        startTransition(async () => {
          const success = await deleteContact(contactId);
          if (success) navigate("/contacts");
        });
      },
    });

  const {
    confirmDelete: confirmDeleteLead,
    ConfirmDeleteModal: ConfirmDeleteLeadModal,
  } = useConfirmDelete({
    onConfirm: (leadId) => {
      startTransition(async () => {
        const success = await deleteLead(leadId);
        if (success) {
          setLeads((prev) => prev.filter((l) => l.id !== leadId));
        }
      });
    },
  });

  async function handleSubmit(data: ContactFormData) {
    startTransition(async () => {
      if (isEditing) {
        const updated = await updateContact(id, data);
        if (updated) navigate("/contacts");
      } else {
        const created = await createContact(data);
        if (created) navigate("/contacts");
      }
    });
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("pt-BR");
  }

  return (
    <Page
      title="Cadastro de contato"
      actionButtons={
        <>
          <Button
            variant="outline"
            onClick={() => navigate("/contacts")}
            disabled={isPending}
          >
            Voltar
          </Button>
          <Button
            variant="success"
            type="submit"
            form={FORM_ID}
            disabled={isPending}
          >
            Salvar
          </Button>
          {isEditing && (
            <Button
              variant="danger"
              onClick={() => confirmDeleteContact(id, form.getValues("name"))}
              disabled={isPending}
            >
              Excluir
            </Button>
          )}
        </>
      }
    >
      <Form id={FORM_ID} form={form} onSubmit={handleSubmit}>
        <Field<ContactFormData> name="name" xs={12}>
          <InputText label="Nome" placeholder="Ex: João da Silva" required />
        </Field>
        <Field<ContactFormData> name="email" xs={12} md={8}>
          <InputEmail label="Email" placeholder="joao@email.com" required />
        </Field>
        <Field<ContactFormData> name="phone" xs={12} md={4}>
          <InputPhone
            label="Telefone"
            placeholder="Ex: (11) 11111-1111"
            required
          />
        </Field>
      </Form>

      {isEditing && leads.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-neutral-dark mt-6 mb-4">
            Leads
          </h2>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Nome</Table.Head>
                <Table.Head>Empresa</Table.Head>
                <Table.Head>Contato</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Data</Table.Head>
                <Table.Head>Ações</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {leads.map((lead) => (
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
                      />
                      <TableButton
                        variant="delete"
                        onClick={() => confirmDeleteLead(lead.id, lead.name)}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      )}

      {ConfirmDeleteModal}
      {ConfirmDeleteLeadModal}
    </Page>
  );
}

export { ContactForm };
