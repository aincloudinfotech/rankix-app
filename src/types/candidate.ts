import type {
  RankixScore,
  SkillConfidence,
  RecruiterVisibility,
  PrivacyState,
  CertTier,
  VerificationState
} from "./score";

export type Region = "UAE" | "India" | "USA" | "Global";
export type Currency = "USD" | "AED" | "INR";

export interface Candidate {
  id: string;
  name: string;
  initials: string;
  headline: string; // "Senior ML Engineer"
  region: Region;
  city: string;
  remotePreference: "remote" | "hybrid" | "onsite" | "open";
  yearsExperience: number;
  rankixScore: RankixScore;
  skills: SkillConfidence[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  privacy: PrivacyState;
  visibility: RecruiterVisibility;
  compTarget: { min: number; max: number; currency: Currency };
  achievements: Achievement[];
  recentActivity: ActivityItem[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  isCurrent?: boolean;
}

export interface Education {
  institution: string;
  degree: "Bachelor's" | "Master's" | "PhD" | "Bootcamp" | "Certificate";
  field: string;
  startYear: number;
  endYear: number;
  tier: 1 | 2 | 3;
  state: VerificationState;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  stars?: number;
  state: VerificationState;
}

export interface Certification {
  id: string;
  issuer: "AWS" | "Azure" | "GCP" | "Databricks" | "NVIDIA" | "IBM" | "HuggingFace" | "Other";
  name: string;
  tier: CertTier;
  issuedDate: string;
  expiryDate?: string;
  verificationUrl?: string;
  state: VerificationState;
  scoreImpact: number; // current pts contributed
}

export interface Achievement {
  id: string;
  icon: string;          // emoji
  title: string;
  description: string;
  type: "milestone" | "streak" | "tier";
}

export interface ActivityItem {
  id: string;
  type: "profile_update" | "project_added" | "cert_earned" | "skills_updated" | "application" | "score_change";
  text: string;
  timestamp: string;     // ISO
}
