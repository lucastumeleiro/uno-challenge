import { forwardRef } from "react";
import { InternalInput } from "../_Internal";
import type { IInputTextProps } from "./Types";

export const InputText = forwardRef<HTMLInputElement, IInputTextProps>(
  ({ label, error, required, id, name, ...props }, ref) => {
    const inputId = id || `input-text-name`;

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
          type="text"
          hasError={!!error}
          {...props}
        />
        <InternalInput.ErrorMessage>{error}</InternalInput.ErrorMessage>
      </InternalInput.Root>
    );
  },
);

InputText.displayName = "InputText";
