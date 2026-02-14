import type { ComponentProps, ReactNode } from "react";

export type IButtonVariant =
  | "default"
  | "primary"
  | "success"
  | "danger"
  | "outline";

export interface IButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  variant?: IButtonVariant;
  className?: string;
}
