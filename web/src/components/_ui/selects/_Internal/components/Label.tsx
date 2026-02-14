import type { IInternalSelectLabelProps } from "../Types";
import { twMerge } from "tailwind-merge";

export function InternalSelectLabel({
  children,
  className,
  required,
}: IInternalSelectLabelProps) {
  return (
    <label className={twMerge("text-sm font-medium text-neutral-dark", className)}>
      {children}
      {required && <span className="text-status-lost-text ml-1">*</span>}
    </label>
  );
}
