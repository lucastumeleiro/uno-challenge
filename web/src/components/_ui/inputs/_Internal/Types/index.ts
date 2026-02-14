import type { ComponentProps, ReactNode } from "react";

export interface IInternalInputRootProps {
  children: ReactNode;
  className?: string;
}

export interface IInternalInputLabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
  required?: boolean;
}

export interface IInternalInputControlProps extends ComponentProps<"input"> {
  hasError?: boolean;
}

export interface IInternalInputErrorMessageProps {
  children?: ReactNode;
  className?: string;
}
