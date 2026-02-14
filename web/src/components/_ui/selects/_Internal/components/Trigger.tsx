import * as Select from "@radix-ui/react-select";
import { CaretDown } from "@phosphor-icons/react";
import type { IInternalSelectTriggerProps } from "../Types";
import { twMerge } from "tailwind-merge";

export function InternalSelectTrigger({
  children,
  placeholder,
  className,
  hasError,
}: IInternalSelectTriggerProps) {
  return (
    <Select.Trigger
      className={twMerge(
        "flex items-center justify-between w-full px-3 py-2 text-sm",
        "border border-neutral-light rounded-md",
        "bg-transparent",
        "focus:outline-none focus:border-primary",
        "disabled:bg-neutral-light/20 disabled:text-neutral-medium disabled:cursor-not-allowed",
        "data-placeholder:text-neutral-medium",
        "transition-colors",
        hasError && "border-status-lost-text focus:border-status-lost-text",
        className,
      )}
    >
      <Select.Value placeholder={placeholder} />
      <Select.Icon>
        <CaretDown size={16} weight="bold" />
      </Select.Icon>
    </Select.Trigger>
  );
}
