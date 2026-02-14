import * as Select from "@radix-ui/react-select";
import type { IInternalSelectRootProps } from "../Types";

export function InternalSelectRoot<T = string>({
  children,
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  name,
  required,
}: IInternalSelectRootProps<T>) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Select.Root
        {...(value !== undefined && { value: value as string })}
        {...(defaultValue !== undefined && { defaultValue: defaultValue as string })}
        {...(onValueChange && { onValueChange: onValueChange as (value: string) => void })}
        {...(open !== undefined && { open })}
        {...(defaultOpen !== undefined && { defaultOpen })}
        {...(onOpenChange && { onOpenChange })}
        {...(disabled !== undefined && { disabled })}
        {...(name !== undefined && { name })}
        {...(required !== undefined && { required })}
      >
        {children}
      </Select.Root>
    </div>
  );
}
