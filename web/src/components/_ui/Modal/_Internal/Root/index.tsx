import * as Dialog from "@radix-ui/react-dialog";
import type { IModalRootProps } from "../Types";

export function InternalModalRoot({ children, ...props }: IModalRootProps) {
  return <Dialog.Root {...props}>{children}</Dialog.Root>;
}
