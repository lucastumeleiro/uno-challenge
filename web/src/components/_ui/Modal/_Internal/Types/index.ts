import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export interface IModalRootProps extends Dialog.DialogProps {
  children: ReactNode;
}

export interface IModalTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export interface IModalOverlayProps {
  className?: string;
}

export interface IModalContentProps {
  children: ReactNode;
  className?: string;
}

export interface IModalTitleProps {
  children: ReactNode;
  className?: string;
}

export interface IModalDescriptionProps {
  children: ReactNode;
  className?: string;
}

export interface IModalCloseProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}
