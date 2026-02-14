import { twMerge } from "tailwind-merge";
import type { IGridProps } from "../../Types";

function Grid({ children, className, ...props }: IGridProps) {
  return (
    <div
      className={twMerge("-m-2 flex flex-wrap", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Grid };
