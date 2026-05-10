import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as a Rankix score (0-100) with optional /100 suffix. */
export function formatScore(score: number, opts?: { withMax?: boolean }): string {
  const rounded = Math.round(score);
  return opts?.withMax ? `${rounded}/100` : `${rounded}`;
}

/** Map a 0-100 score to its tier band. */
export function scoreTier(score: number): {
  label: "Emerging" | "Strong" | "Top" | "Elite";
  color: "warning" | "primary" | "success" | "purple";
} {
  if (score >= 85) return { label: "Elite", color: "purple" };
  if (score >= 70) return { label: "Top", color: "success" };
  if (score >= 50) return { label: "Strong", color: "primary" };
  return { label: "Emerging", color: "warning" };
}

/** Format currency by region. */
export function formatComp(
  amount: number,
  currency: "USD" | "AED" | "INR" = "USD"
): string {
  if (currency === "INR") {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)}L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  if (currency === "AED") {
    return `AED ${(amount / 12).toFixed(0).toLocaleString()}/mo`;
  }
  return `$${amount.toLocaleString("en-US")}`;
}
