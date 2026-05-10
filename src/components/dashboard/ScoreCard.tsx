import { Info } from "lucide-react";
import type { Candidate } from "@/types/candidate";

export function ScoreCard({ candidate }: { candidate: Candidate }) {
  const score = candidate.rankixScore.total;
  const tier = candidate.rankixScore.tier;
  const percentile = candidate.rankixScore.percentileGlobal;
  const lastUpdated = new Date(candidate.rankixScore.lastUpdated).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  // Gauge math: 345.5 = 2π × 55 (the dasharray total). Offset = 345.5 × (1 - score/100).
  const dashOffset = 345.5 * (1 - score / 100);
  // Indicator dot position based on score percentage
  const indicatorAngle = (score / 100) * 360 - 90; // start from top
  const indicatorRad = (indicatorAngle * Math.PI) / 180;
  const indicatorX = 65 + 55 * Math.cos(indicatorRad);
  const indicatorY = 65 + 55 * Math.sin(indicatorRad);

  return (
    <section className="bg-surface border border-border-light rounded-[14px] p-[22px] shadow-sm col-span-12 lg:col-span-4">
      <div className="flex items-center justify-between mb-[18px]">
        <h3 className="text-[15px] font-bold text-text flex items-center gap-2">
          Your Rankix Score
          <Info size={18} className="text-text-muted" />
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="text-[56px] font-extrabold text-primary leading-none tracking-[-2px]">
            {score}
            <span className="text-[22px] text-text-muted font-semibold">/100</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-success/10 text-success px-2.5 py-1 rounded-full text-xs font-bold mt-2">
            <span className="w-1.5 h-1.5 bg-success rounded-full" />
            {tier === "Elite" || tier === "Top" ? "Very Strong" : tier}
          </div>
          <p className="text-[12.5px] text-text-light mt-3.5 leading-snug">
            You're in the top <strong>{100 - percentile}%</strong> of
            <br />
            candidates on Rankix.ai
          </p>
          <div className="text-[11px] text-text-muted mt-4 flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Last updated: {lastUpdated}
          </div>
        </div>

        <div className="relative w-[130px] h-[130px] flex-shrink-0">
          <svg viewBox="0 0 130 130" className="w-full h-full">
            <defs>
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F6BFF" />
                <stop offset="100%" stopColor="#7C5DFA" />
              </linearGradient>
            </defs>
            <circle cx="65" cy="65" r="55" fill="none" stroke="#EFF2F7" strokeWidth="11" />
            <circle
              cx="65"
              cy="65"
              r="55"
              fill="none"
              stroke="url(#gaugeGrad)"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray="345.5"
              strokeDashoffset={dashOffset}
              transform="rotate(-90 65 65)"
            />
            <circle cx={indicatorX} cy={indicatorY} r="6" fill="#7C5DFA" stroke="white" strokeWidth="3" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
            <div className="text-[22px] leading-none">🏆</div>
            <div className="text-[10.5px] font-bold text-text mt-1 whitespace-nowrap">Keep improving!</div>
            <div className="text-[8.5px] text-text-light leading-[1.25] mt-1 max-w-[88px]">
              Higher than <strong>{percentile}%</strong> of candidates
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
