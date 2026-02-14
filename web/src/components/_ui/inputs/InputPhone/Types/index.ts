import type { ComponentProps } from "react";

export interface IInputPhoneProps extends Omit<ComponentProps<"input">, "type"> {
  label?: string;
  error?: string;
  required?: boolean;
}
