import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import type { IButtonProps } from "./Types";

const variantStyles = {
  default: "bg-neutral-light text-neutral-dark hover:bg-neutral-medium/20 border border-neutral-light",
  primary: "bg-primary text-white hover:bg-primary/80",
  success: "bg-primary text-white hover:bg-primary/80",
  danger: "bg-status-lost-text text-white hover:bg-status-lost-text/80",
  outline: "border border-neutral-light text-neutral-dark hover:bg-neutral-light/20",
};

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, variant = "default", className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={twMerge(
          "px-6 py-2 rounded-full font-medium text-sm",
          "transition-colors",
          "focus:outline-none",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
