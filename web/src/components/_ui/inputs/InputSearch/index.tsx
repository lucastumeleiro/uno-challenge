import { forwardRef } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { InternalInput } from "../_Internal";
import type { IInputSearchProps } from "./Types";

export const InputSearch = forwardRef<HTMLInputElement, IInputSearchProps>(
  ({ label, error, required, id, className, ...props }, ref) => {
    const inputId = id || "input-search";

    return (
      <InternalInput.Root>
        {label && (
          <InternalInput.Label htmlFor={inputId} required={required ?? false}>
            {label}
          </InternalInput.Label>
        )}
        <div className="relative">
          <MagnifyingGlassIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-medium"
            size={18}
            weight="regular"
          />
          <InternalInput.Control
            ref={ref}
            id={inputId}
            type="search"
            hasError={!!error}
            className={`pl-10 ${className || ""}`}
            placeholder="Buscar registro..."
            {...props}
          />
        </div>
        <InternalInput.ErrorMessage>{error}</InternalInput.ErrorMessage>
      </InternalInput.Root>
    );
  },
);

InputSearch.displayName = "InputSearch";
