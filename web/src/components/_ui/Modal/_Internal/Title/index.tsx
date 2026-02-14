import { twMerge } from "tailwind-merge";
import type { IModalTitleProps } from "../Types";

export function InternalModalTitle({ children, className }: IModalTitleProps) {
  return (
    <h4
      className={twMerge(
        "text-base font-semibold text-neutral-dark",
        className,
      )}
    >
      {children}
    </h4>
  );
}
