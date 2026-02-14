import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import type { IModalTitleProps } from "../Types";

export function InternalModalTitle({ children, className }: IModalTitleProps) {
  return (
    <Dialog.Title asChild>
      <h4 className={twMerge("font-semibold text-neutral-dark", className)}>
        {children}
      </h4>
    </Dialog.Title>
  );
}
