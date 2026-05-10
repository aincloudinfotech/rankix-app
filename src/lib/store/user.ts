/**
 * Global user store (Zustand).
 * In Wave 1: holds the mock current user.
 * In Wave 2: replaced by real Supabase Auth state.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Region, Currency } from "@/types/candidate";

export interface UserStore {
  // Mock user identity
  isSignedIn: boolean;
  userId: string | null;
  userName: string;
  userInitials: string;
  userRole: "candidate" | "employer" | null;

  // Region + currency preferences
  region: Region;
  currency: Currency;

  // Actions
  signIn: (id: string, name: string, role: "candidate" | "employer") => void;
  signOut: () => void;
  setRegion: (region: Region) => void;
  setCurrency: (currency: Currency) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isSignedIn: true, // Wave 1: mock signed-in by default for demo
      userId: "candidate-001",
      userName: "John Doe",
      userInitials: "JD",
      userRole: "candidate",
      region: "Global",
      currency: "USD",

      signIn: (id, name, role) =>
        set({
          isSignedIn: true,
          userId: id,
          userName: name,
          userInitials: name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
          userRole: role
        }),

      signOut: () =>
        set({
          isSignedIn: false,
          userId: null,
          userName: "",
          userInitials: "",
          userRole: null
        }),

      setRegion: (region) => set({ region }),
      setCurrency: (currency) => set({ currency })
    }),
    {
      name: "rankix-user"
    }
  )
);
