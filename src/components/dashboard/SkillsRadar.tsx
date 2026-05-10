/**
 * Skills Radar — pentagon chart showing 5 dimensions of soft/cross-cutting skills.
 * Pure SVG implementation matching dashboard.html.
 */

const DIMENSIONS = [
  { label: "Problem Solving", value: 85, angle: -90 },
  { label: "Technical Skills", value: 88, angle: -18 },
  { label: "Communication", value: 70, angle: 54 },
  { label: "Leadership", value: 65, angle: 126 },
  { label: "Domain Knowledge", value: 80, angle: 198 }
];

const CENTER = 110;
const MAX_RADIUS = 80;

function pointForValue(angleDeg: number, valuePercent: number): { x: number; y: number } {
  const angleRad = (angleDeg * Math.PI) / 180;
  const r = MAX_RADIUS * (valuePercent / 100);
  return {
    x: CENTER + r * Math.cos(angleRad),
    y: CENTER + r * Math.sin(angleRad)
  };
}

function pentagonAtRadius(r: number): string {
  return DIMENSIONS.map((d) => {
    const angleRad = (d.angle * Math.PI) / 180;
    const x = CENTER + r * Math.cos(angleRad);
    const y = CENTER + r * Math.sin(angleRad);
    return `${x},${y}`;
  }).join(" ");
}

export function SkillsRadar() {
  const dataPoints = DIMENSIONS.map((d) => pointForValue(d.angle, d.value));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <section className="bg-surface border border-border-light rounded-[14px] p-[22px] shadow-sm col-span-12 md:col-span-6 lg:col-span-4">
      <div className="flex items-center justify-between mb-[18px]">
        <h3 className="text-[15px] font-bold text-text">Skills Radar</h3>
      </div>

      <div className="flex justify-center items-center h-[220px]">
        <svg viewBox="-10 -10 240 240" className="w-[220px] h-[220px]">
          <defs>
            <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F6BFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7C5DFA" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Concentric pentagons */}
          {[80, 60, 40, 20].map((r) => (
            <polygon key={r} points={pentagonAtRadius(r)} fill="none" stroke="#EFF2F7" strokeWidth="1" />
          ))}

          {/* Axes */}
          {DIMENSIONS.map((d, i) => {
            const end = pointForValue(d.angle, 100);
            return <line key={i} x1={CENTER} y1={CENTER} x2={end.x} y2={end.y} stroke="#EFF2F7" />;
          })}

          {/* Data polygon */}
          <polygon points={dataPolygon} fill="url(#radarFill)" stroke="#4F6BFF" strokeWidth="2" strokeLinejoin="round" />

          {/* Data points */}
          {dataPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#4F6BFF" stroke="white" strokeWidth="2" />
          ))}

          {/* Labels */}
          {DIMENSIONS.map((d, i) => {
            const labelPos = pointForValue(d.angle, 132);
            const valuePos = pointForValue(d.angle, 148);
            return (
              <g key={i}>
                <text x={labelPos.x} y={labelPos.y} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">
                  {d.label}
                </text>
                <text x={valuePos.x} y={valuePos.y} textAnchor="middle" fontSize="11" fontWeight="700" fill="#4F6BFF">
                  {d.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
