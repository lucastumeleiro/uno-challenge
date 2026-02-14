import { twMerge } from "tailwind-merge";
import type { ISpinnerProps } from "./Types";

const sizeStyles = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-3",
};

export function Spinner({ size = "md", className }: ISpinnerProps) {
  return (
    <div
      className={twMerge(
        "inline-block rounded-full border-neutral-light border-t-primary animate-spin",
        sizeStyles[size],
        className,
      )}
      role="status"
      aria-label="Carregando..."
    >
      <span className="sr-only">Carregando...</span>
    </div>
  );
}
