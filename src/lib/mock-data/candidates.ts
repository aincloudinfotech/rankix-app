/**
 * Mock candidate seed data for Wave 1.
 * John Doe = the demo candidate matching dashboard.html exactly.
 */
import type { Candidate } from "@/types/candidate";
import { buildRankixScore } from "@/lib/score/formula";

export const johnDoe: Candidate = {
  id: "candidate-001",
  name: "John Doe",
  initials: "JD",
  headline: "AI Engineer",
  region: "USA",
  city: "Austin",
  remotePreference: "remote",
  yearsExperience: 6,
  privacy: "public",
  compTarget: { min: 145000, max: 195000, currency: "USD" },

  rankixScore: buildRankixScore(
    {
      skills: 85,
      experience: 78,
      projects: 80,
      certifications: 75,
      credibility: 88,
      education: 90
    },
    {
      percentileGlobal: 82,
      percentileRegion: 78,
      lastUpdated: "2024-05-14T10:00:00Z",
      trend: [
        { date: "2024-02-14", score: 62 },
        { date: "2024-03-14", score: 65, event: "Earned AWS ML Specialty +6" },
        { date: "2024-04-14", score: 70, event: "Added 2 verified projects +5" },
        { date: "2024-04-30", score: 74, event: "Completed Python assessment +4" },
        { date: "2024-05-07", score: 78, event: "Earned GCP Professional ML +6" },
        { date: "2024-05-14", score: 82, event: "Verified email + GitHub" }
      ]
    }
  ),

  visibility: {
    visibility: 86,
    rankixScore: 82,
    privacyMultiplier: 1.0,
    activityMultiplier: 1.0,
    privacyState: "public",
    lastActiveDate: "2024-05-14T08:00:00Z"
  },

  skills: [
    {
      skillName: "Python",
      confidence: 95,
      state: "verified",
      evidence: [
        { source: "certification", weight: 25, description: "AWS ML Specialty (Credly verified)", verified: true },
        { source: "assessment", weight: 22, description: "Rankix Python assessment (94/100)", verified: true },
        { source: "project", weight: 18, description: "3 GitHub projects in Python", verified: true },
        { source: "experience", weight: 10, description: "6 yrs Python (LinkedIn cross-ref)", verified: true }
      ]
    },
    {
      skillName: "Machine Learning",
      confidence: 88,
      state: "verified",
      evidence: [
        { source: "certification", weight: 25, description: "AWS ML Specialty", verified: true },
        { source: "project", weight: 18, description: "Production ML at fintech", verified: true },
        { source: "experience", weight: 10, description: "5 yrs ML experience", verified: true }
      ]
    },
    {
      skillName: "TensorFlow",
      confidence: 80,
      state: "verified",
      evidence: [
        { source: "certification", weight: 20, description: "TensorFlow Developer Certificate", verified: true },
        { source: "project", weight: 15, description: "2 production TensorFlow projects", verified: true }
      ]
    },
    {
      skillName: "SQL",
      confidence: 70,
      state: "certified",
      evidence: [
        { source: "assessment", weight: 18, description: "Rankix SQL assessment (78/100)", verified: true },
        { source: "experience", weight: 10, description: "Daily SQL usage at work", verified: false }
      ]
    },
    {
      skillName: "Docker",
      confidence: 65,
      state: "certified",
      evidence: [
        { source: "project", weight: 15, description: "Dockerized 4 production projects", verified: true },
        { source: "experience", weight: 10, description: "DevOps at current role", verified: false }
      ]
    }
  ],

  experience: [
    {
      company: "DocumentAI",
      role: "Senior ML Engineer",
      startDate: "2022-01-01",
      isCurrent: true,
      description: "Lead production RAG pipeline. Cut p95 latency from 4.2s to 380ms."
    },
    {
      company: "FinTech Co",
      role: "ML Engineer",
      startDate: "2019-06-01",
      endDate: "2021-12-31",
      description: "Built fraud-detection models using XGBoost + deep learning."
    }
  ],

  education: [
    {
      institution: "University of Texas at Austin",
      degree: "Master's",
      field: "Computer Science (ML focus)",
      startYear: 2017,
      endYear: 2019,
      tier: 1,
      state: "verified"
    },
    {
      institution: "Coursera",
      degree: "Certificate",
      field: "Deep Learning Specialization (Andrew Ng)",
      startYear: 2018,
      endYear: 2018,
      tier: 2,
      state: "certified"
    }
  ],

  projects: [
    {
      id: "proj-001",
      title: "Production RAG eval framework",
      description: "Open-source eval kit for RAG pipelines. Used by 3 startups.",
      tags: ["RAG", "Eval", "Open-source"],
      url: "https://github.com/example/rag-eval",
      stars: 245,
      state: "verified"
    },
    {
      id: "proj-002",
      title: "torch-shard distributed training",
      description: "Library for sharded fine-tuning of 7B-70B models on commodity GPUs.",
      tags: ["PyTorch", "FSDP", "Distributed"],
      url: "https://github.com/example/torch-shard",
      stars: 1200,
      state: "verified"
    }
  ],

  certifications: [
    {
      id: "cert-001",
      issuer: "AWS",
      name: "AWS Certified Machine Learning — Specialty",
      tier: "specialty",
      issuedDate: "2025-01-15",
      expiryDate: "2028-01-15",
      verificationUrl: "https://www.credly.com/badges/example",
      state: "verified",
      scoreImpact: 6
    },
    {
      id: "cert-002",
      issuer: "GCP",
      name: "Google Cloud Professional ML Engineer",
      tier: "professional",
      issuedDate: "2024-09-10",
      expiryDate: "2026-09-10",
      verificationUrl: "https://www.credential.net/example",
      state: "verified",
      scoreImpact: 6
    },
    {
      id: "cert-003",
      issuer: "Databricks",
      name: "Databricks Certified ML Engineer Professional",
      tier: "professional",
      issuedDate: "2025-03-05",
      expiryDate: "2027-03-05",
      verificationUrl: "https://credentials.databricks.com/example",
      state: "verified",
      scoreImpact: 5
    },
    {
      id: "cert-004",
      issuer: "Azure",
      name: "Azure AI Engineer Associate (AI-102)",
      tier: "associate",
      issuedDate: "2023-07-12",
      expiryDate: "2024-09-30",
      verificationUrl: "https://learn.microsoft.com/example",
      state: "partial",
      scoreImpact: 2
    }
  ],

  achievements: [
    {
      id: "ach-001",
      icon: "🎖️",
      title: "Top 10% AI Engineers",
      description: "You're in the top 10% of AI Engineers on Rankix.ai",
      type: "tier"
    },
    {
      id: "ach-002",
      icon: "✅",
      title: "Profile Completeness",
      description: "You have a complete profile!",
      type: "milestone"
    },
    {
      id: "ach-003",
      icon: "🔥",
      title: "Consistency Streak",
      description: "You've maintained consistency for 14 days",
      type: "streak"
    }
  ],

  recentActivity: [
    { id: "act-001", type: "profile_update", text: "Profile updated", timestamp: "2024-05-14T08:00:00Z" },
    { id: "act-002", type: "project_added", text: "Added new project", timestamp: "2024-05-13T10:00:00Z" },
    { id: "act-003", type: "cert_earned", text: "Earned new certification", timestamp: "2024-05-11T14:00:00Z" },
    { id: "act-004", type: "skills_updated", text: "Skills updated", timestamp: "2024-05-10T09:00:00Z" },
    { id: "act-005", type: "application", text: "Applied for AI Engineer", timestamp: "2024-05-09T11:00:00Z" }
  ]
};

export const allCandidates: Candidate[] = [johnDoe];
