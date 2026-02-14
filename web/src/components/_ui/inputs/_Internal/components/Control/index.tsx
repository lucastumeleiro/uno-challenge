import { forwardRef } from "react";
import type { IInternalInputControlProps } from "../../Types";
import { twMerge } from "tailwind-merge";

export const InternalInputControl = forwardRef<
  HTMLInputElement,
  IInternalInputControlProps
>(({ className, hasError, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge(
        "w-full px-3 py-2 text-sm",
        "border border-neutral-light rounded-md",
        "placeholder:text-neutral-medium",
        "focus:outline-none focus:border-primary",
        "disabled:bg-neutral-light/20 disabled:text-neutral-medium disabled:cursor-not-allowed",
        "transition-colors",
        hasError && "border-status-lost-text focus:border-status-lost-text",
        className,
      )}
      {...props}
    />
  );
});

InternalInputControl.displayName = "InternalInputControl";
