/**
 * Rankix Score formula — implements the locked architecture.
 * See Rankix_Master_Application_Design.docx Section 3 for the full spec.
 */

import type {
  ScoreBreakdown,
  RankixScore,
  SkillConfidence
} from "@/types/score";
import { SCORE_WEIGHTS } from "@/types/score";

/** Compute the total Rankix Score (0-100) from component sub-scores. */
export function computeRankixScore(breakdown: ScoreBreakdown): number {
  const total =
    breakdown.skills * SCORE_WEIGHTS.skills +
    breakdown.experience * SCORE_WEIGHTS.experience +
    breakdown.projects * SCORE_WEIGHTS.projects +
    breakdown.certifications * SCORE_WEIGHTS.certifications +
    breakdown.credibility * SCORE_WEIGHTS.credibility +
    breakdown.education * SCORE_WEIGHTS.education;
  return Math.round(total * 10) / 10; // one decimal
}

/** Map a 0-100 score to its tier band. */
export function tierForScore(
  score: number
): "Emerging" | "Strong" | "Top" | "Elite" {
  if (score >= 85) return "Elite";
  if (score >= 70) return "Top";
  if (score >= 50) return "Strong";
  return "Emerging";
}

/**
 * Skills component aggregation.
 * Top-10 highest-confidence skills relevant to declared role.
 * Skills component score = (sum of top-10 confidences) / 1000 × 100.
 * Skills with confidence < 30 don't count.
 */
export function aggregateSkillsComponent(
  skills: SkillConfidence[]
): number {
  const eligible = skills.filter((s) => s.confidence >= 30);
  const top10 = eligible
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10);
  const sum = top10.reduce((acc, s) => acc + s.confidence, 0);
  return Math.round((sum / 1000) * 100);
}

/** Compute Recruiter Visibility from Rankix Score, Privacy, and Activity. */
export function computeRecruiterVisibility(
  rankixScore: number,
  privacy: "public" | "passive" | "quiet" | "hidden",
  daysSinceActive: number
): number {
  const privacyMult = {
    public: 1.0,
    passive: 0.7,
    quiet: 0.3,
    hidden: 0.0
  }[privacy];

  let activityMult: number;
  if (daysSinceActive <= 7) activityMult = 1.0;
  else if (daysSinceActive <= 30) activityMult = 0.85;
  else if (daysSinceActive <= 90) activityMult = 0.6;
  else if (daysSinceActive <= 180) activityMult = 0.3;
  else activityMult = 0.1;

  return Math.round(rankixScore * privacyMult * activityMult);
}

/**
 * Build a fully-derived RankixScore object from a breakdown + metadata.
 */
export function buildRankixScore(
  breakdown: ScoreBreakdown,
  meta: {
    percentileGlobal: number;
    percentileRegion?: number;
    lastUpdated: string;
    trend?: { date: string; score: number; event?: string }[];
  }
): RankixScore {
  const total = computeRankixScore(breakdown);
  return {
    total,
    breakdown,
    tier: tierForScore(total),
    percentileGlobal: meta.percentileGlobal,
    percentileRegion: meta.percentileRegion,
    lastUpdated: meta.lastUpdated,
    trend: meta.trend ?? []
  };
}
