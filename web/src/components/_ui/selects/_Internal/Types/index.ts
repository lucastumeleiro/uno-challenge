import type { ReactNode } from "react";

export interface IInternalSelectRootProps<T = string> {
  children: ReactNode;
  value?: T | undefined;
  defaultValue?: T | undefined;
  onValueChange?: ((value: T) => void) | undefined;
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  disabled?: boolean | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
}

export interface IInternalSelectTriggerProps {
  children?: ReactNode;
  placeholder?: string;
  className?: string;
  hasError?: boolean;
}

export interface IInternalSelectContentProps {
  children: ReactNode;
  className?: string;
}

export interface IInternalSelectItemProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export interface IInternalSelectLabelProps {
  children: ReactNode;
  className?: string;
  required?: boolean;
}

export interface IInternalSelectErrorMessageProps {
  children?: ReactNode;
  className?: string;
}
