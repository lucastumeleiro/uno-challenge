import { forwardRef } from "react";
import { InternalInput } from "../_Internal";
import type { IInputEmailProps } from "./Types";

export const InputEmail = forwardRef<HTMLInputElement, IInputEmailProps>(
  ({ label, error, required, id, ...props }, ref) => {
    const inputId =
      id || `input-email-${Math.random().toString(36).substring(7)}`;

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
          type="email"
          hasError={!!error}
          {...props}
        />
        <InternalInput.ErrorMessage>{error}</InternalInput.ErrorMessage>
      </InternalInput.Root>
    );
  },
);

InputEmail.displayName = "InputEmail";
