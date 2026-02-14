import type { ComponentProps } from "react";

export interface IInputEmailProps extends Omit<ComponentProps<"input">, "type"> {
  label?: string;
  error?: string;
  required?: boolean;
}
