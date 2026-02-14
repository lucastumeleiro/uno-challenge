import { twMerge } from "tailwind-merge";
import type { IPageTitleProps } from "../Types";

function InternalPageTitle({ children, className, ...props }: IPageTitleProps) {
  return (
    <h1
      className={twMerge("text-xl font-semibold text-neutral-dark", className)}
      {...props}
    >
      {children}
    </h1>
  );
}

export { InternalPageTitle };
