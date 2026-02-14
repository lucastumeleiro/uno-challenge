import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import type { IModalDescriptionProps } from "../Types";

export function InternalModalDescription({
  children,
  className,
}: IModalDescriptionProps) {
  return (
    <Dialog.Description
      className={twMerge("text-sm text-neutral-medium mt-2", className)}
    >
      {children}
    </Dialog.Description>
  );
}
