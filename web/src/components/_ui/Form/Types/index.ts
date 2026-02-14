import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export interface IFormProps<T extends FieldValues> {
  id: string;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  children: ReactNode;
  className?: string;
}
