import { Code2, ShieldCheck, FolderGit2, Award, ChevronRight, TrendingUp } from "lucide-react";

const RECOMMENDATIONS = [
  { icon: Code2, title: "Add more skills", description: "Adding in-demand skills can boost your score.", points: "+5 pts" },
  { icon: ShieldCheck, title: "Verify your email & phone", description: "Increase credibility and trust.", points: "+3 pts" },
  { icon: FolderGit2, title: "Add a new project", description: "Strong projects can improve your score.", points: "+5 pts" },
  { icon: Award, title: "Get certified", description: "Add certifications relevant to your domain.", points: "+5 pts" }
];

export function ImproveScore() {
  return (
    <section className="bg-surface border border-border-light rounded-[14px] p-[22px] shadow-sm col-span-12 lg:col-span-3">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-[15px] font-bold text-text flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          Improve Your Score
        </h3>
      </div>

      {RECOMMENDATIONS.map(({ icon: Icon, title, description, points }) => (
        <div
          key={title}
          className="flex items-center gap-3 p-3 rounded-[10px] bg-[#FAFBFD] hover:bg-primary-light cursor-pointer transition-colors mb-2 last:mb-0"
        >
          <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center flex-shrink-0">
            <Icon size={15} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-semibold text-text leading-tight">{title}</div>
            <div className="text-[11px] text-text-light leading-tight mt-0.5">{description}</div>
          </div>
          <div className="bg-primary-light text-primary-dark text-[11px] font-bold px-2 py-1 rounded-full flex-shrink-0">
            {points}
          </div>
          <ChevronRight size={14} className="text-text-muted flex-shrink-0" />
        </div>
      ))}

      <a className="block text-center mt-3 py-2.5 text-primary text-[13px] font-semibold cursor-pointer hover:underline">
        View all recommendations →
      </a>
    </section>
  );
}
