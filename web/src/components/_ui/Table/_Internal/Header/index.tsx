import { twMerge } from "tailwind-merge";
import type { ITableHeaderProps } from "../Types";

export function InternalTableHeader({
  children,
  className,
  ...props
}: ITableHeaderProps) {
  return (
    <thead
      className={twMerge("border-b border-neutral-light", className)}
      {...props}
    >
      {children}
    </thead>
  );
}
