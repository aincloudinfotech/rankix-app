/**
 * Candidate service — adapter pattern.
 * Wave 1: returns mock data.
 * Wave 2+: swapped to call real Supabase. Components never know the difference.
 */
import type { Candidate } from "@/types/candidate";
import { allCandidates, johnDoe } from "@/lib/mock-data/candidates";

export const candidateService = {
  /** Get the current logged-in candidate. */
  async getCurrentCandidate(): Promise<Candidate> {
    return johnDoe;
  },

  /** Get a candidate by ID. */
  async getById(id: string): Promise<Candidate | null> {
    return allCandidates.find((c) => c.id === id) ?? null;
  },

  /** Search candidates (for employer-side discovery). */
  async search(filters: {
    region?: string;
    minScore?: number;
    maxScore?: number;
    skills?: string[];
  }): Promise<Candidate[]> {
    let result = allCandidates;
    if (filters.region) {
      result = result.filter((c) => c.region === filters.region);
    }
    if (filters.minScore !== undefined) {
      result = result.filter(
        (c) => c.rankixScore.total >= (filters.minScore as number)
      );
    }
    if (filters.maxScore !== undefined) {
      result = result.filter(
        (c) => c.rankixScore.total <= (filters.maxScore as number)
      );
    }
    if (filters.skills && filters.skills.length > 0) {
      const wantedSkills = filters.skills.map((s) => s.toLowerCase());
      result = result.filter((c) =>
        c.skills.some((s) => wantedSkills.includes(s.skillName.toLowerCase()))
      );
    }
    return result;
  }
};
