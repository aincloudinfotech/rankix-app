/**
 * Rankix Logo — icon + wordmark + optional tagline.
 * Use `variant="full"` for hero placements (landing, marketing).
 * Use `variant="compact"` for sidebars and small spaces.
 */
import { RankixIcon } from "./RankixIcon";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "compact" | "hero";
  className?: string;
  showTagline?: boolean;
}

export function Logo({ variant = "compact", className, showTagline = false }: LogoProps) {
  const iconSize = variant === "hero" ? 80 : variant === "full" ? 56 : 36;
  const wordmarkSize = variant === "hero" ? "text-5xl" : variant === "full" ? "text-3xl" : "text-lg";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <RankixIcon size={iconSize} />
      <div className="flex flex-col">
        <div className={cn("font-extrabold tracking-tight leading-none text-text", wordmarkSize)}>
          Ranki
          <span className="bg-gradient-to-br from-primary to-purple bg-clip-text text-transparent">
            x
          </span>
        </div>
        {showTagline && (
          <div className="text-xs text-text-light mt-1.5 tracking-wide">
            Verified Talent <span className="text-text-muted mx-1">|</span>{" "}
            <span className="text-primary">Smarter Hiring</span>
          </div>
        )}
      </div>
    </div>
  );
}
