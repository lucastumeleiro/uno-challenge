import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
import type { IModalCloseProps } from "../Types";

export function InternalModalClose({
  children,
  className,
  asChild = false,
}: IModalCloseProps) {
  if (asChild) {
    return <Dialog.Close asChild>{children}</Dialog.Close>;
  }

  return (
    <Dialog.Close
      className={twMerge(
        "absolute right-4 top-4",
        "rounded-full p-1.5",
        "text-neutral-medium hover:text-neutral-dark hover:bg-neutral-light/20",
        "transition-colors",
        "focus:outline-none",
        className,
      )}
    >
      {children || <X size={20} weight="bold" />}
    </Dialog.Close>
  );
}
