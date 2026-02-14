import { useMemo } from "react";
import { InternalSelect } from "../_Internal";
import type { ISelectStatusProps, IStatusOption } from "./Types";

const baseStatusOptions: IStatusOption[] = [
  { value: "novo", label: "Novo" },
  { value: "contactado", label: "Contactado" },
  { value: "qualificado", label: "Qualificado" },
  { value: "convertido", label: "Convertido" },
  { value: "perdido", label: "Perdido" },
];

export function SelectStatus({
  label,
  error,
  required,
  value,
  onValueChange,
  placeholder = "Selecione um status",
  disabled,
  includeAll,
}: ISelectStatusProps) {
  const statusOptions = useMemo(() => {
    if (includeAll ?? false) {
      return [{ value: "todos" as const, label: "Todos" }, ...baseStatusOptions];
    }
    return baseStatusOptions;
  }, [includeAll]);

  return (
    <InternalSelect.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      {label && (
        <InternalSelect.Label required={required ?? false}>
          {label}
        </InternalSelect.Label>
      )}
      <InternalSelect.Trigger placeholder={placeholder} hasError={!!error} />
      <InternalSelect.Content>
        {statusOptions.map((option) => (
          <InternalSelect.Item key={option.value} value={option.value}>
            {option.label}
          </InternalSelect.Item>
        ))}
      </InternalSelect.Content>
      <InternalSelect.ErrorMessage>{error}</InternalSelect.ErrorMessage>
    </InternalSelect.Root>
  );
}
