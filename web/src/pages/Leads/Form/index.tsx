import { useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLeads } from "@Hooks/useLeads";
import { useContacts } from "@Hooks/useContacts";
import { useConfirmDelete } from "@Hooks/useConfirmDelete";
import type { IContactDTO } from "@Hooks/useContacts/Types";
import { Page } from "@/components/_ui/Page";
import { Button } from "@/components/_ui/Button";
import { Form } from "@/components/_ui/Form";
import { Field } from "@/components/_ui/Field";
import { InputText } from "@/components/_ui/inputs/InputText";
import { SelectStatus } from "@/components/_ui/selects/SelectStatus";
import { SelectContact } from "@/components/_ui/selects/SelectContact";
import type { LeadFormData } from "./Types";
import { leadSchema } from "./Utils/validation";
import { FORM_ID, INITIAL_VALUES } from "./Utils/constants";

function LeadForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const { getLead, createLead, updateLead, deleteLead } = useLeads();
  const { getContacts } = useContacts();

  const [contacts, setContacts] = useState<IContactDTO[]>([]);
  const isEditing = !!id;

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: async () => {
      const contactsData = await getContacts();
      setContacts(contactsData);

      if (id) {
        const lead = await getLead(id);
        if (lead) {
          return {
            name: lead.name,
            company: lead.company,
            status: lead.status,
            contactId: lead.contactId,
          };
        }
      }

      return INITIAL_VALUES;
    },
  });

  const { confirmDelete, ConfirmDeleteModal } = useConfirmDelete({
    onConfirm: (leadId) => {
      startTransition(async () => {
        const success = await deleteLead(leadId);
        if (success) navigate("/leads");
      });
    },
  });

  async function handleSubmit(data: LeadFormData) {
    startTransition(async () => {
      if (isEditing) {
        const updated = await updateLead(id, data);
        if (updated) navigate("/leads");
      } else {
        const created = await createLead(data);
        if (created) navigate("/leads");
      }
    });
  }

  const contactOptions = contacts.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
  }));

  return (
    <Page
      title="Cadastro de leads"
      actionButtons={
        <>
          <Button
            variant="outline"
            onClick={() => navigate("/leads")}
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
              onClick={() => confirmDelete(id, form.getValues("name"))}
              disabled={isPending}
            >
              Excluir
            </Button>
          )}
        </>
      }
    >
      <Form id={FORM_ID} form={form} onSubmit={handleSubmit}>
        <Field<LeadFormData> name="name" xs={12}>
          <InputText
            label="Nome"
            placeholder="Ex: Projeto E-commerce"
            required
          />
        </Field>
        <Field<LeadFormData> name="company" xs={12}>
          <InputText label="Empresa" placeholder="Ex: UnoCRM" required />
        </Field>
        <Field<LeadFormData> name="status" xs={12} md={4}>
          <SelectStatus label="Status" />
        </Field>
        <Field<LeadFormData> name="contactId" xs={12} md={8}>
          <SelectContact label="Contato" required contacts={contactOptions} />
        </Field>
      </Form>

      {ConfirmDeleteModal}
    </Page>
  );
}

export { LeadForm };
