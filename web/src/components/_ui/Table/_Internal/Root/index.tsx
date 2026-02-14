import { twMerge } from "tailwind-merge";
import type { ITableRootProps } from "../Types";

export function InternalTableRoot({
  children,
  className,
  ...props
}: ITableRootProps) {
  return (
    <div className="w-full overflow-auto">
      <table
        className={twMerge("w-full block md:table md:border-collapse", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}
