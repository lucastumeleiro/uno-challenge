import { twMerge } from "tailwind-merge";
import type { ITableCellProps } from "../Types";

export function InternalTableCell({
  children,
  className,
  ...props
}: ITableCellProps) {
  return (
    <td
      className={twMerge("px-4 py-3 text-sm text-neutral-dark", className)}
      {...props}
    >
      {children}
    </td>
  );
}
