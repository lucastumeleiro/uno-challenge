import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import type { IModalContentProps } from "../Types";
import { InternalModalOverlay } from "../Overlay";

export function InternalModalContent({ children, className }: IModalContentProps) {
  return (
    <Dialog.Portal>
      <InternalModalOverlay />
      <Dialog.Content
        className={twMerge(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg max-h-[85vh] overflow-y-auto",
          "bg-white rounded-lg shadow-lg",
          "p-6",
          "z-50",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "focus:outline-none",
          className,
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
