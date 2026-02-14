import { twMerge } from "tailwind-merge";
import type { IBadgeProps } from "./Types";

const variantStyles = {
  novo: "bg-status-new-bg text-status-new-text border border-status-new-text/20",
  contactado: "bg-status-contacted-bg text-status-contacted-text border border-status-contacted-text/20",
  qualificado: "bg-status-qualified-bg text-status-qualified-text border border-status-qualified-text/20",
  convertido: "bg-status-converted-bg text-status-converted-text border border-status-converted-text/20",
  perdido: "bg-status-lost-bg text-status-lost-text border border-status-lost-text/20",
};

export function Badge({ children, variant, className }: IBadgeProps) {
  return (
    <span
      className={twMerge(
        "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium min-w-25",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
