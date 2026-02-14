import { twMerge } from "tailwind-merge";
import type { ITableFooterProps } from "../Types";

export function InternalTableFooter({
  children,
  className,
  ...props
}: ITableFooterProps) {
  return (
    <tfoot
      className={twMerge(
        "border-t border-neutral-light bg-neutral-light/10",
        className,
      )}
      {...props}
    >
      {children}
    </tfoot>
  );
}
