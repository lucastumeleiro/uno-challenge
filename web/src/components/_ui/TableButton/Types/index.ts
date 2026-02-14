import type { ComponentProps, ReactNode } from "react";

export type ITableButtonVariant = "view" | "edit" | "delete";

export interface ITableButtonProps extends ComponentProps<"button"> {
  children?: ReactNode;
  variant?: ITableButtonVariant;
  className?: string;
}
