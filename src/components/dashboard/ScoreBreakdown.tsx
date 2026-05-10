import { Code2, Briefcase, FolderGit2, Award, UserPlus, GraduationCap } from "lucide-react";
import type { Candidate } from "@/types/candidate";

const COMPONENTS = [
  { key: "skills" as const, label: "Skills", weight: "30%", icon: Code2, bgColor: "#EEF2FF", iconColor: "#4F6BFF", barColor: "#4F6BFF" },
  { key: "experience" as const, label: "Experience", weight: "20%", icon: Briefcase, bgColor: "#ECFDF5", iconColor: "#10B981", barColor: "#10B981" },
  { key: "projects" as const, label: "Projects", weight: "15%", icon: FolderGit2, bgColor: "#F3E8FF", iconColor: "#8B5CF6", barColor: "#8B5CF6" },
  { key: "certifications" as const, label: "Certifications", weight: "15%", icon: Award, bgColor: "#FEF3C7", iconColor: "#F59E0B", barColor: "#F59E0B" },
  { key: "credibility" as const, label: "Credibility", weight: "10%", icon: UserPlus, bgColor: "#FCE7F3", iconColor: "#EC4899", barColor: "#EC4899" },
  { key: "education" as const, label: "Education", weight: "10%", icon: GraduationCap, bgColor: "#CCFBF1", iconColor: "#14B8A6", barColor: "#14B8A6" }
];

export function ScoreBreakdown({ candidate }: { candidate: Candidate }) {
  const breakdown = candidate.rankixScore.breakdown;

  return (
    <section className="bg-surface border border-border-light rounded-[14px] p-[22px] shadow-sm col-span-12 lg:col-span-5">
      <div className="flex items-center justify-between mb-[18px]">
        <h3 className="text-[15px] font-bold text-text">Score Breakdown</h3>
        <a className="text-primary text-[13px] font-semibold cursor-pointer hover:underline">View Details</a>
      </div>

      {COMPONENTS.map(({ key, label, weight, icon: Icon, bgColor, iconColor, barColor }) => {
        const value = breakdown[key];
        return (
          <div key={key} className="flex items-center gap-3.5 mb-3.5 last:mb-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: bgColor, color: iconColor }}
            >
              <Icon size={16} />
            </div>
            <div className="text-[13.5px] font-semibold text-text w-[100px] flex-shrink-0">
              {label} <span className="text-[10px] text-text-muted">{weight}</span>
            </div>
            <div className="flex-1 h-2 bg-border-light rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: `${value}%`, backgroundColor: barColor }}
              />
            </div>
            <div className="text-[13px] font-bold text-text w-14 text-right flex-shrink-0">
              {value}
              <span className="text-text-muted font-medium text-[11.5px]">/100</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
