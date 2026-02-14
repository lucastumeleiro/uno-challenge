import { twMerge } from "tailwind-merge";
import type { IPageRootProps } from "../Types";

function InternalPageRoot({ children, className, ...props }: IPageRootProps) {
  return (
    <div
      className={twMerge(
        "bg-white rounded-3xl p-8 flex flex-col overflow-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { InternalPageRoot };
