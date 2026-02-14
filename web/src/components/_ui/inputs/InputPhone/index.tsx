import { forwardRef, type ChangeEvent } from "react";
import { InternalInput } from "../_Internal";
import type { IInputPhoneProps } from "./Types";

export const InputPhone = forwardRef<HTMLInputElement, IInputPhoneProps>(
  ({ label, error, required, id, onChange, value, ...props }, ref) => {
    const inputId =
      id || `input-phone-${Math.random().toString(36).substring(7)}`;

    const formatPhoneNumber = (value: string) => {
      const numbers = value.replace(/\D/g, "");

      if (numbers.length <= 10) {
        return numbers
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2");
      } else {
        return numbers
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .slice(0, 15);
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      e.target.value = formatted;
      onChange?.(e);
    };

    return (
      <InternalInput.Root>
        {label && (
          <InternalInput.Label htmlFor={inputId} required={required ?? false}>
            {label}
          </InternalInput.Label>
        )}
        <InternalInput.Control
          ref={ref}
          id={inputId}
          type="tel"
          hasError={!!error}
          onChange={handleChange}
          value={value}
          placeholder="(00) 00000-0000"
          {...props}
        />
        <InternalInput.ErrorMessage>{error}</InternalInput.ErrorMessage>
      </InternalInput.Root>
    );
  },
);

InputPhone.displayName = "InputPhone";
