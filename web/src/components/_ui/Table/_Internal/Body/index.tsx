import { twMerge } from "tailwind-merge";
import type { ITableBodyProps } from "../Types";

export function InternalTableBody({
  children,
  className,
  ...props
}: ITableBodyProps) {
  return (
    <tbody
      className={twMerge("divide-y divide-neutral-light", className)}
      {...props}
    >
      {children}
    </tbody>
  );
}
