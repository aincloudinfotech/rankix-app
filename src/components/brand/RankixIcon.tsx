/**
 * Rankix radial sunburst icon — pure SVG, brand-consistent.
 * Generates a circular pattern of elongated dots in a blue→purple gradient.
 */
import { cn } from "@/lib/utils";

interface RankixIconProps {
  size?: number;
  className?: string;
}

export function RankixIcon({ size = 48, className }: RankixIconProps) {
  const NUM_RAYS = 20;
  const CENTER = 50;

  // Generate dots: 3 per ray, decreasing size outward
  const dots = Array.from({ length: NUM_RAYS }).flatMap((_, rayIdx) => {
    const angle = (rayIdx / NUM_RAYS) * 360 - 90; // start from top
    const angleRad = (angle * Math.PI) / 180;

    // Color gradient based on angle: blue at left, purple at right
    // Map cos(angle) [-1, 1] to color stop [0, 1]
    const colorStop = (Math.cos(angleRad) + 1) / 2;
    const blueComponent = Math.round(124 + (59 - 124) * colorStop); // 124 (purple) → 59 (blue)
    const greenComponent = Math.round(93 + (130 - 93) * colorStop); // 93 → 130
    const redComponent = Math.round(124 + (59 - 124) * colorStop);
    // Use named gradient stops for cleaner color
    const isLeftHalf = Math.cos(angleRad) < 0;
    const baseHue = isLeftHalf ? "#3B82F6" : "#7C5DFA";

    return [1, 2, 3].map((ringIdx) => {
      const distance = 14 + ringIdx * 9;
      const x = CENTER + distance * Math.cos(angleRad);
      const y = CENTER + distance * Math.sin(angleRad);
      // Outer dots smaller; inner dots more elongated
      const rx = 1.4 - ringIdx * 0.25;
      const ry = ringIdx === 1 ? 4.5 : ringIdx === 2 ? 3 : 2;
      // Color saturates toward the edges
      let fill: string;
      if (colorStop < 0.3) fill = "#3B82F6"; // bright blue
      else if (colorStop < 0.55) fill = "#5B6BFC"; // blue-purple
      else if (colorStop < 0.8) fill = "#7C5DFA"; // purple
      else fill = "#8B5CF6"; // bright purple

      return {
        key: `${rayIdx}-${ringIdx}`,
        x,
        y,
        rx,
        ry,
        fill,
        rotation: angle + 90 // align ovals along the ray direction
      };
    });
  });

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
      aria-label="Rankix"
    >
      {dots.map((d) => (
        <ellipse
          key={d.key}
          cx={d.x}
          cy={d.y}
          rx={d.rx}
          ry={d.ry}
          fill={d.fill}
          transform={`rotate(${d.rotation} ${d.x} ${d.y})`}
        />
      ))}
    </svg>
  );
}
