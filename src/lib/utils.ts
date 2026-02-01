import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPercent(value: number) {
  if (0 <= value && value <= 1) value = value * 100;
  return `${Math.round(value)}%`;
}
