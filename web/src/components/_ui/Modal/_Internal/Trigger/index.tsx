import * as Dialog from "@radix-ui/react-dialog";
import type { IModalTriggerProps } from "../Types";

export function InternalModalTrigger({
  children,
  asChild = false,
}: IModalTriggerProps) {
  return <Dialog.Trigger asChild={asChild}>{children}</Dialog.Trigger>;
}
