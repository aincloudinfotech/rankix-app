import { User, FolderGit2, Award, Code2, Send, Activity } from "lucide-react";
import type { Candidate, ActivityItem } from "@/types/candidate";

const ACTIVITY_ICONS: Record<ActivityItem["type"], React.ComponentType<{ size?: number; className?: string }>> = {
  profile_update: User,
  project_added: FolderGit2,
  cert_earned: Award,
  skills_updated: Code2,
  application: Send,
  score_change: Activity
};

function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date("2024-05-14T10:00:00Z"); // mock "now" matching the dashboard's frame
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

export function RecentActivity({ candidate }: { candidate: Candidate }) {
  return (
    <section className="bg-surface border border-border-light rounded-[14px] p-[22px] shadow-sm col-span-12 lg:col-span-4">
      <div className="flex items-center justify-between mb-[18px]">
        <h3 className="text-[15px] font-bold text-text flex items-center gap-2">
          <Activity size={18} className="text-primary" />
          Recent Activity
        </h3>
      </div>

      {candidate.recentActivity.map((item) => {
        const Icon = ACTIVITY_ICONS[item.type] ?? Activity;
        return (
          <div
            key={item.id}
            className="flex items-center gap-3 py-2.5 border-b border-border-light last:border-b-0"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
              <Icon size={15} className="text-primary" />
            </div>
            <div className="flex-1 text-[13px] font-semibold text-text">{item.text}</div>
            <div className="text-[11.5px] text-text-muted flex-shrink-0">{formatRelativeTime(item.timestamp)}</div>
          </div>
        );
      })}

      <a className="block mt-3 text-primary text-[13px] font-semibold cursor-pointer hover:underline">View all activity →</a>
    </section>
  );
}
