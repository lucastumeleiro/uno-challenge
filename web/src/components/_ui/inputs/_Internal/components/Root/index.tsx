import type { IInternalInputRootProps } from "../../Types";
import { twMerge } from "tailwind-merge";

export function InternalInputRoot({
  children,
  className,
}: IInternalInputRootProps) {
  return (
    <div className={twMerge("flex flex-col gap-1.5 w-full", className)}>
      {children}
    </div>
  );
}
