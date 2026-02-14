import { twMerge } from "tailwind-merge";
import type { IPageActionsProps } from "../Types";

function InternalPageActions({
  children,
  className,
  ...props
}: IPageActionsProps) {
  return (
    <div className={twMerge("flex items-center gap-3 flex-wrap justify-center", className)} {...props}>
      {children}
    </div>
  );
}

export { InternalPageActions };
