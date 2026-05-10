/**
 * VerificationBadge — the load-bearing trust UI element.
 * Four states: ✔ Verified / ✔ Certified / ⚠ Partial Proof / ❌ Claimed Only.
 * See Master Design Doc Section 3.3.
 */
import { Check, AlertTriangle, X, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerificationState } from "@/types/score";

interface VerificationBadgeProps {
  state: VerificationState;
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

const STATE_CONFIG = {
  verified: {
    icon: Check,
    label: "Verified",
    bg: "bg-success/10",
    text: "text-success",
    ring: "ring-success/20"
  },
  certified: {
    icon: Award,
    label: "Certified",
    bg: "bg-primary/10",
    text: "text-primary",
    ring: "ring-primary/20"
  },
  partial: {
    icon: AlertTriangle,
    label: "Partial Proof",
    bg: "bg-warning/10",
    text: "text-warning",
    ring: "ring-warning/20"
  },
  claimed: {
    icon: X,
    label: "Claimed Only",
    bg: "bg-text-muted/10",
    text: "text-text-muted",
    ring: "ring-text-muted/20"
  }
} as const;

export function VerificationBadge({
  state,
  size = "sm",
  showLabel = true,
  className
}: VerificationBadgeProps) {
  const config = STATE_CONFIG[state];
  const Icon = config.icon;
  const sizeClasses =
    size === "sm" ? "text-[10px] px-1.5 py-0.5 gap-0.5" : "text-xs px-2 py-1 gap-1";
  const iconSize = size === "sm" ? 10 : 12;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-bold",
        config.bg,
        config.text,
        sizeClasses,
        className
      )}
      title={config.label}
    >
      <Icon size={iconSize} strokeWidth={3} />
      {showLabel && config.label}
    </span>
  );
}
