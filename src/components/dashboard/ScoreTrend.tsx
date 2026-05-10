"use client";

import { TrendingUp } from "lucide-react";
import type { Candidate } from "@/types/candidate";

export function ScoreTrend({ candidate }: { candidate: Candidate }) {
  const trend = candidate.rankixScore.trend;
  const latest = trend[trend.length - 1]?.score ?? 0;
  const oldest = trend[0]?.score ?? 0;
  const delta = latest - oldest;

  // Custom SVG line chart with the same styling as dashboard.html
  const width = 700;
  const height = 200;
  const paddingLeft = 40;
  const paddingRight = 20;
  const innerWidth = width - paddingLeft - paddingRight;
  const yMax = 100;

  // Map points to SVG coordinates
  const points = trend.map((point, i) => {
    const x = paddingLeft + (i / (trend.length - 1)) * innerWidth;
    const y = 20 + ((yMax - point.score) / yMax) * 160;
    return { x, y, ...point };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} 180 L ${points[0].x} 180 Z`;

  return (
    <section className="bg-surface border border-border-light rounded-[14px] p-[22px] shadow-sm col-span-12 lg:col-span-8">
      <div className="flex items-center justify-between mb-[18px]">
        <h3 className="text-[15px] font-bold text-text flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          Score Trend
        </h3>
      </div>

      <div className="flex gap-6 items-stretch">
        <div className="flex-1 min-w-0">
          <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-[200px]">
            <defs>
              <linearGradient id="trendFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4F6BFF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4F6BFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Y axis gridlines */}
            {[20, 65, 110, 155].map((y) => (
              <line key={y} x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#EFF2F7" strokeDasharray="3,3" />
            ))}
            {/* Y axis labels */}
            <text x="20" y="24" fontSize="11" fill="#94A3B8">100</text>
            <text x="25" y="69" fontSize="11" fill="#94A3B8">75</text>
            <text x="25" y="114" fontSize="11" fill="#94A3B8">50</text>
            <text x="25" y="159" fontSize="11" fill="#94A3B8">25</text>
            <text x="30" y="184" fontSize="11" fill="#94A3B8">0</text>
            {/* Filled area */}
            <path d={areaPath} fill="url(#trendFill)" />
            {/* Line */}
            <path d={linePath} fill="none" stroke="#4F6BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Points + labels */}
            {points.map((p, i) => {
              const isLast = i === points.length - 1;
              return (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={isLast ? 6 : 5} fill={isLast ? "#4F6BFF" : "white"} stroke={isLast ? "white" : "#4F6BFF"} strokeWidth="3" />
                  <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize={isLast ? "13" : "12"} fontWeight={isLast ? "800" : "700"} fill={isLast ? "#4F6BFF" : "#0F172A"}>
                    {p.score}
                  </text>
                  <text x={p.x} y="200" textAnchor="middle" fontSize="11" fill="#94A3B8">
                    {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="w-[200px] bg-gradient-to-b from-[#F0FDF4] to-[#ECFDF5] rounded-[14px] p-[18px] flex flex-col justify-center border border-[#D1FAE5]">
          <div className="text-[22px] mb-1.5">🎉</div>
          <h4 className="text-[14.5px] font-bold text-success mb-1">Great Progress!</h4>
          <p className="text-[12.5px] text-text-light leading-tight mb-3.5">
            Your score has improved by {delta} points in the last 3 months.
          </p>
          <div className="bg-success text-white px-3.5 py-2.5 rounded-[10px] text-center">
            <div className="text-[22px] font-extrabold leading-none">↑ {delta} pts</div>
            <div className="text-[10.5px] opacity-90 mt-1">Since {new Date(trend[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
