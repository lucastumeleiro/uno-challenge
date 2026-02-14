import { twMerge } from "tailwind-merge";
import type { IPageHeaderProps } from "../Types";

function InternalPageHeader({
  children,
  className,
  ...props
}: IPageHeaderProps) {
  return (
    <div
      className={twMerge("flex items-center justify-between mb-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { InternalPageHeader };
