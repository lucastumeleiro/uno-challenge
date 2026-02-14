import { twMerge } from "tailwind-merge";
import type { IPageHeaderProps } from "../Types";

function InternalPageHeader({
  children,
  className,
  ...props
}: IPageHeaderProps) {
  return (
    <div
      className={twMerge("flex flex-col items-center gap-4 mb-6 md:flex-row md:justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { InternalPageHeader };
