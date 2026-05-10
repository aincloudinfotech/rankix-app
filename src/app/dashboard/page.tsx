import { candidateService } from "@/lib/services/candidates";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { ScoreBreakdown } from "@/components/dashboard/ScoreBreakdown";
import { ImproveScore } from "@/components/dashboard/ImproveScore";
import { ScoreTrend } from "@/components/dashboard/ScoreTrend";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TopSkills } from "@/components/dashboard/TopSkills";
import { SkillsRadar } from "@/components/dashboard/SkillsRadar";
import { Achievements } from "@/components/dashboard/Achievements";
import { ProfileStrip } from "@/components/dashboard/ProfileStrip";

export default async function DashboardPage() {
  const candidate = await candidateService.getCurrentCandidate();

  return (
    <div className="px-8 pb-8 grid grid-cols-12 gap-5">
      {/* Row 1: Score + Breakdown + Improve */}
      <ScoreCard candidate={candidate} />
      <ScoreBreakdown candidate={candidate} />
      <ImproveScore />

      {/* Row 2: Score Trend + Recent Activity */}
      <ScoreTrend candidate={candidate} />
      <RecentActivity candidate={candidate} />

      {/* Row 3: Top Skills + Skills Radar + Achievements */}
      <TopSkills candidate={candidate} />
      <SkillsRadar />
      <Achievements candidate={candidate} />

      {/* Row 4: Profile Strength + Visibility strip */}
      <ProfileStrip candidate={candidate} />
    </div>
  );
}
