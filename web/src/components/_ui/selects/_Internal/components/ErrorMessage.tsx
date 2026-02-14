import type { IInternalSelectErrorMessageProps } from "../Types";
import { twMerge } from "tailwind-merge";

export function InternalSelectErrorMessage({
  children,
  className,
}: IInternalSelectErrorMessageProps) {
  if (!children) return null;

  return (
    <span className={twMerge("text-xs text-status-lost-text", className)}>
      {children}
    </span>
  );
}
