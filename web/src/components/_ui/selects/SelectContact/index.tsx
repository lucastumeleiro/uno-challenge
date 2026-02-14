import { InternalSelect } from "../_Internal";
import type { ISelectContactProps } from "./Types";

export function SelectContact({
  label,
  error,
  required,
  value,
  onValueChange,
  placeholder = "Selecione um contato",
  disabled,
  contacts,
  emptyMessage = "Nenhum contato encontrado",
}: ISelectContactProps) {
  return (
    <InternalSelect.Root<string>
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || contacts.length === 0}
    >
      {label && (
        <InternalSelect.Label required={required ?? false}>
          {label}
        </InternalSelect.Label>
      )}
      <InternalSelect.Trigger
        placeholder={contacts.length === 0 ? emptyMessage : placeholder}
        hasError={!!error}
      />
      <InternalSelect.Content>
        {contacts.length === 0 ? (
          <div className="px-3 py-2 text-sm text-neutral-medium">{emptyMessage}</div>
        ) : (
          contacts.map((contact) => (
            <InternalSelect.Item key={contact.id} value={contact.id}>
              {contact.name} ({contact.email})
            </InternalSelect.Item>
          ))
        )}
      </InternalSelect.Content>
      <InternalSelect.ErrorMessage>{error}</InternalSelect.ErrorMessage>
    </InternalSelect.Root>
  );
}
