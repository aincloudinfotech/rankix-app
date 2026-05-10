import type { Candidate } from "@/types/candidate";

const SKILL_DISPLAY_DATA = [
  { name: "Python", iconBg: "#FFD43B", proficiency: "Expert", barColor: "#4F6BFF", level: 95 },
  { name: "Machine Learning", iconBg: "#10B981", proficiency: "Advanced", barColor: "#10B981", level: 85 },
  { name: "TensorFlow", iconBg: "#FF6F00", proficiency: "Advanced", barColor: "#F59E0B", level: 80 },
  { name: "SQL", iconBg: "#4F6BFF", proficiency: "Intermediate", barColor: "#4F6BFF", level: 70 },
  { name: "Docker", iconBg: "#4F6BFF", proficiency: "Intermediate", barColor: "#4F6BFF", level: 65 }
];

const PROFICIENCY_COLORS: Record<string, string> = {
  Expert: "text-success",
  Advanced: "text-primary",
  Intermediate: "text-warning"
};

export function TopSkills({ candidate }: { candidate: Candidate }) {
  return (
    <section className="bg-surface border border-border-light rounded-[14px] p-[22px] shadow-sm col-span-12 md:col-span-6 lg:col-span-4">
      <div className="flex items-center justify-between mb-[18px]">
        <h3 className="text-[15px] font-bold text-text">Top Skills</h3>
        <a className="text-primary text-[13px] font-semibold cursor-pointer hover:underline">View All Skills</a>
      </div>

      {SKILL_DISPLAY_DATA.map((skill) => (
        <div key={skill.name} className="flex items-center gap-3 py-2.5">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 text-white font-bold text-[10px]"
            style={{ backgroundColor: skill.iconBg }}
          >
            {skill.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="text-[13px] font-semibold text-text w-[110px] flex-shrink-0">{skill.name}</div>
          <div className="flex-1 h-1.5 bg-border-light rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: skill.barColor }} />
          </div>
          <div className={`text-[11.5px] font-bold w-[86px] text-right flex-shrink-0 ${PROFICIENCY_COLORS[skill.proficiency]}`}>
            {skill.proficiency}
          </div>
        </div>
      ))}
    </section>
  );
}
