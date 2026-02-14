import { twMerge } from "tailwind-merge";
import type { IPageActionsProps } from "../Types";

function InternalPageActions({
  children,
  className,
  ...props
}: IPageActionsProps) {
  return (
    <div className={twMerge("flex items-center gap-3", className)} {...props}>
      {children}
    </div>
  );
}

export { InternalPageActions };
