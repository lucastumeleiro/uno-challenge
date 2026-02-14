import * as Select from "@radix-ui/react-select";
import type { IInternalSelectContentProps } from "../Types";
import { twMerge } from "tailwind-merge";

export function InternalSelectContent({
  children,
  className,
}: IInternalSelectContentProps) {
  return (
    <Select.Portal>
      <Select.Content
        className={twMerge(
          "overflow-hidden bg-white rounded-md shadow-lg",
          "border border-neutral-light",
          "z-50",
          "w-(--radix-select-trigger-width)",
          className,
        )}
        position="popper"
        sideOffset={4}
      >
        <Select.Viewport className="p-1">{children}</Select.Viewport>
      </Select.Content>
    </Select.Portal>
  );
}
