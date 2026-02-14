import type { ComponentProps } from "react";

export interface IInputSearchProps extends Omit<
  ComponentProps<"input">,
  "type"
> {
  label?: string;
  error?: string;
  required?: boolean;
}
