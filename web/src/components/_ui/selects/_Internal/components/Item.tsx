import * as Select from "@radix-ui/react-select";
import { Check } from "@phosphor-icons/react";
import type { IInternalSelectItemProps } from "../Types";
import { twMerge } from "tailwind-merge";

export function InternalSelectItem({
  children,
  value,
  className,
}: IInternalSelectItemProps) {
  return (
    <Select.Item
      value={value}
      className={twMerge(
        "flex items-center gap-2 px-3 py-2 text-sm",
        "cursor-pointer outline-none",
        "data-[highlighted]:bg-primary/10",
        "data-[state=checked]:bg-primary/20",
        "rounded",
        className,
      )}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="ml-auto">
        <Check size={16} weight="bold" />
      </Select.ItemIndicator>
    </Select.Item>
  );
}
