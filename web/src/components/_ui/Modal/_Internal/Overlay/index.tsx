import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import type { IModalOverlayProps } from "../Types";

export function InternalModalOverlay({ className }: IModalOverlayProps) {
  return (
    <Dialog.Overlay
      className={twMerge(
        "fixed inset-0 bg-black/50 backdrop-blur-sm z-40",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
    />
  );
}
