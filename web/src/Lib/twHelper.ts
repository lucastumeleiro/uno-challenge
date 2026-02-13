import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind Helper - Mescla classes CSS condicionalmente e resolve conflitos do Tailwind.
 *
 * Combina clsx (para classes condicionais) com tailwind-merge
 * (para resolver conflitos entre classes Tailwind).
 *
 * @example
 * ```tsx
 * twHelper('px-2', isActive && 'px-4') // "px-4"
 * twHelper('base', { active: isActive }) // "base active" ou "base"
 * twHelper('text-sm', ['font-bold', isError && 'text-red-500'])
 * ```
 *
 * @param inputs - Classes CSS, objetos condicionais, arrays ou valores booleanos
 * @returns String com classes mescladas e sem conflitos
 */
export function twHelper(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
