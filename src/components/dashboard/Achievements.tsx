import type { Candidate } from "@/types/candidate";

const ACHIEVEMENT_STYLES: Record<string, { bg: string; text: string }> = {
  tier: { bg: "bg-[#F3E8FF]", text: "text-purple" },
  milestone: { bg: "bg-success/10", text: "text-success" },
  streak: { bg: "bg-warning/10", text: "text-warning" }
};

export function Achievements({ candidate }: { candidate: Candidate }) {
  return (
    <section className="bg-surface border border-border-light rounded-[14px] p-[22px] shadow-sm col-span-12 md:col-span-6 lg:col-span-4">
      <div className="flex items-center justify-between mb-[18px]">
        <h3 className="text-[15px] font-bold text-text">Achievements</h3>
      </div>

      {candidate.achievements.map((ach) => {
        const styles = ACHIEVEMENT_STYLES[ach.type] ?? ACHIEVEMENT_STYLES.milestone;
        return (
          <div key={ach.id} className="flex items-center gap-3 py-3 border-b border-border-light last:border-b-0">
            <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 text-lg ${styles.bg} ${styles.text}`}>
              {ach.icon}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-text mb-0.5">{ach.title}</div>
              <div className="text-[11.5px] text-text-light leading-snug">{ach.description}</div>
            </div>
          </div>
        );
      })}

      <a className="block mt-3 text-primary text-[13px] font-semibold cursor-pointer hover:underline">View all achievements →</a>
    </section>
  );
}
