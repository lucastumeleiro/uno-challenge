import type { ComponentProps } from "react";

export interface IInputTextProps extends Omit<ComponentProps<"input">, "type"> {
  label?: string;
  error?: string;
  required?: boolean;
}
