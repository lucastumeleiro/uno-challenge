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
        "hover:bg-neutral-light/10 transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}
