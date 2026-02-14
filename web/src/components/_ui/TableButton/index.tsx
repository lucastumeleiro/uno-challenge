import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { EyeIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import type { ITableButtonProps } from "./Types";

const variantStyles = {
  view: "bg-neutral-light text-neutral-dark hover:bg-neutral-medium/20 border border-neutral-light",
  edit: "bg-primary text-white hover:bg-primary/80",
  delete: "bg-status-lost-text text-white hover:bg-status-lost-text/80",
};

const variantIcons = {
  view: EyeIcon,
  edit: PencilSimpleIcon,
  delete: TrashIcon,
};

export const TableButton = forwardRef<HTMLButtonElement, ITableButtonProps>(
  ({ children, variant = "view", className, ...props }, ref) => {
    const Icon = variantIcons[variant];

    return (
      <button
        ref={ref}
        type="button"
        className={twMerge(
          "w-8 h-8 rounded-full flex items-center justify-center",
          "transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {children || <Icon size={16} weight="bold" />}
      </button>
    );
  },
);

TableButton.displayName = "TableButton";
