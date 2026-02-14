import { twMerge } from "tailwind-merge";
import type { ITableCellProps } from "../Types";

export function InternalTableCell({
  children,
  className,
  label,
  ...props
}: ITableCellProps) {
  return (
    <td
      className={twMerge(
        "px-4 py-3 text-sm text-neutral-dark",
        "block md:table-cell",
        label && "flex items-center justify-between gap-2 before:content-[attr(data-label)] before:font-medium before:text-xs before:uppercase before:text-neutral-dark before:tracking-wider md:before:content-none",
        !label && "block md:table-cell",
        className,
      )}
      data-label={label}
      {...props}
    >
      {children}
    </td>
  );
}
