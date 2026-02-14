import type { IInternalInputErrorMessageProps } from "../../Types";
import { twMerge } from "tailwind-merge";

export function InternalInputErrorMessage({
  children,
  className,
}: IInternalInputErrorMessageProps) {
  if (!children) return null;

  return (
    <span className={twMerge("text-xs text-status-lost-text", className)}>
      {children}
    </span>
  );
}
