import { twMerge } from "tailwind-merge";
import type { ITableRowProps } from "../Types";

export function InternalTableRow({
  children,
  className,
  ...props
}: ITableRowProps) {
  return (
    <tr
      className={twMerge(
        "block md:table-row",
        "mb-3 md:mb-0 border border-neutral-light md:border-0 rounded-lg md:rounded-none p-2 md:p-0",
        "hover:bg-neutral-light/10 transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}
