/**
 * Rankix Score architecture types.
 * The locked spec — see Rankix_Master_Application_Design.docx Section 3.
 */

/** The four verification states applied to any evidence claim. */
export type VerificationState = "verified" | "certified" | "partial" | "claimed";

/** The 6 components of the Rankix Score, weights summing to 100. */
export const SCORE_WEIGHTS = {
  skills: 0.30,
  experience: 0.20,
  projects: 0.15,
  certifications: 0.15,
  credibility: 0.10,
  education: 0.10
} as const;

export type ScoreComponent = keyof typeof SCORE_WEIGHTS;

/** A candidate's score broken down by all 6 components, each 0-100. */
export interface ScoreBreakdown {
  skills: number;        // /100
  experience: number;    // /100
  projects: number;      // /100
  certifications: number; // /100
  credibility: number;   // /100
  education: number;     // /100
}

/** Full Rankix Score record. */
export interface RankixScore {
  total: number;         // 0-100, derived from weighted breakdown
  breakdown: ScoreBreakdown;
  tier: "Emerging" | "Strong" | "Top" | "Elite";
  percentileGlobal: number; // 0-100
  percentileRegion?: number; // 0-100, optional regional comparison
  lastUpdated: string;   // ISO date
  trend: ScoreTrendPoint[]; // recent history
}

export interface ScoreTrendPoint {
  date: string;          // ISO date
  score: number;         // 0-100
  event?: string;        // optional reason for change ("Earned AWS ML Specialty +6")
}

/** Per-skill confidence score: Claim (10) + Evidence (70) + Verification (20). */
export interface SkillConfidence {
  skillName: string;
  confidence: number;    // 0-100
  state: VerificationState;
  evidence: SkillEvidence[];
}

export interface SkillEvidence {
  source: "certification" | "assessment" | "project" | "oss" | "experience" | "reference";
  weight: number;        // contribution to confidence
  description: string;   // e.g., "AWS ML Specialty cert (Credly verified)"
  verified: boolean;     // whether the evidence is independently verified
}

/** Rankix Match for a candidate × job pair (0-100%). */
export interface RankixMatch {
  candidateId: string;
  jobId: string;
  matchPercent: number;  // 0-100
  reasons: string[];     // top 3 explanations
  computedAt: string;
}

/** Recruiter Visibility: derivative of Rankix Score × Privacy × Activity. */
export interface RecruiterVisibility {
  visibility: number;    // 0-100
  rankixScore: number;
  privacyMultiplier: number; // 0.0 (Hidden) - 1.0 (Public)
  activityMultiplier: number; // 0.1 (180+ days) - 1.0 (last 7 days)
  privacyState: PrivacyState;
  lastActiveDate: string;
}

export type PrivacyState = "public" | "passive" | "quiet" | "hidden";

/** Score improvement recommendation. */
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  pointsImpact: number;  // estimated +N pts
  category: ScoreComponent;
  effortMinutes?: number;
}

/** Certification tier taxonomy. */
export type CertTier =
  | "foundational"
  | "associate"
  | "specialty"
  | "professional"
  | "expert"
  | "vendor"
  | "mooc";

export const CERT_TIER_WEIGHTS: Record<CertTier, number> = {
  foundational: 1,
  associate: 3,
  specialty: 5.5,
  professional: 5.5,
  expert: 6.5,
  vendor: 4,
  mooc: 0.5
};
