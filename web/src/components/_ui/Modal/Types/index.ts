import type { ReactNode } from "react";

export interface IModalProps {
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  classNameContent?: string;
  classNameTitle?: string;
  classNameDescription?: string;
}
