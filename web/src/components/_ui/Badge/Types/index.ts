import type { ReactNode } from "react";

export type IBadgeVariant =
  | "novo"
  | "contactado"
  | "qualificado"
  | "convertido"
  | "perdido";

export interface IBadgeProps {
  children: ReactNode;
  variant: IBadgeVariant;
  className?: string;
}
