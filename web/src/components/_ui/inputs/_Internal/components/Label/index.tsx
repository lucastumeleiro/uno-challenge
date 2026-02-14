import type { IInternalInputLabelProps } from "../../Types";
import { twMerge } from "tailwind-merge";

export function InternalInputLabel({
  children,
  htmlFor,
  className,
  required,
}: IInternalInputLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge("text-sm font-medium text-neutral-dark", className)}
    >
      {children}
      {required && <span className="text-status-lost-text ml-1">*</span>}
    </label>
  );
}
