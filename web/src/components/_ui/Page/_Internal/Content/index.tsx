import { twMerge } from "tailwind-merge";
import type { IPageContentProps } from "../Types";

function InternalPageContent({
  children,
  className,
  ...props
}: IPageContentProps) {
  return (
    <div
      className={twMerge("flex-1 flex flex-col overflow-y-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { InternalPageContent };
