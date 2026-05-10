# Rankix.ai

> The credit score for AI talent.

The verified, evidence-backed talent score for the AI/ML industry. Recruiters use it to filter; candidates work to improve it.

## Stack

- **Framework**: Next.js 14+ (App Router) + TypeScript (strict)
- **Styling**: Tailwind CSS + shadcn-style component primitives
- **State**: Zustand (client) + TanStack Query (server)
- **Forms**: react-hook-form + zod
- **Charts**: Recharts + custom SVG
- **Icons**: lucide-react
- **Auth**: Supabase Auth (mocked in Wave 1)
- **Database**: Supabase Postgres (Wave 2+)
- **Hosting**: Vercel
- **Mock data layer**: custom adapter pattern (swappable for real Supabase calls in Wave 2)

## Getting started

```bash
# Install dependencies
npm install

# Copy environment example (Wave 1 doesn't need real values)
cp .env.example .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The root URL redirects to `/dashboard` (the canonical Module 02 candidate dashboard).

## Project structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (candidate)/      # Candidate-side routes (dashboard, profile, etc.)
│   ├── (employer)/       # Employer-side routes
│   ├── (auth)/           # Sign-in, sign-up, onboarding
│   ├── (marketing)/      # Public landing
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Root redirect
│   └── globals.css       # Global CSS + design tokens
├── components/
│   ├── ui/               # shadcn-style primitives (Button, Card, etc.)
│   ├── layout/           # Layouts, navigation
│   ├── dashboard/        # Dashboard cards (ScoreCard, ScoreBreakdown, etc.)
│   ├── verification/     # VerificationBadge component
│   └── shared/
├── lib/
│   ├── mock-data/        # Seed data for Wave 1
│   ├── services/         # Data adapter (mock now → real Supabase later)
│   ├── score/            # Rankix Score formula + Skill Confidence math
│   ├── store/            # Zustand global state (user, region, currency)
│   └── utils.ts
├── types/
│   ├── score.ts          # Rankix Score architecture types (LOCKED — see design doc)
│   ├── candidate.ts      # Candidate domain types
│   ├── employer.ts
│   └── job.ts
└── styles/
```

## Rankix Score architecture (locked spec)

See `Rankix_Master_Application_Design.docx` Section 3 for the full spec. Key elements:

- **Rankix Score** (0-100): 6-component weighted formula. Skills 30% + Experience 20% + Projects 15% + Certifications 15% + Credibility 10% + Education 10%.
- **Rankix Match** (0-100%): per-job × per-candidate fit score, contextual.
- **Recruiter Visibility** (derivative): Rankix Score × Privacy Multiplier × Activity Multiplier.
- **Skill Confidence**: Claim Weight (10) + Evidence Weight (70) + Verification Weight (20). 30-confidence floor for inclusion in Skills.
- **Verification badges**: ✔ Verified / ✔ Certified / ⚠ Partial Proof / ❌ Claimed Only — applied to every claim.

## Wave 1 scope

The first 10 weeks build ~68 critical-path screens across:

- Module 01 — Authentication & Onboarding
- Module 02 — Candidate Profile & Identity (incl. Certifications)
- Module 04 — Rankix Score System (FLAGSHIP)
- Module 08 — Employer Company & Team
- Module 10 — Shortlist & Discovery

Mock data only. Wave 2+ wires up real Supabase backend.

See `Rankix_Wave1_Execution_Plan.docx` for the full 6-phase build plan.

## Working model

- **Claude** owns code authoring.
- **Surya** owns Product, QA, deployment, and credentials. Claude writes code; Surya commits, pushes, and configures Vercel + Supabase.

## Conventions

- TypeScript strict mode. No `any`.
- Imports use `@/` path alias (mapped to `src/`).
- Tailwind utility-first; component-level styles only when necessary.
- Mock data adapter pattern: every data fetch goes through `lib/services/*` so swap to real backend in Wave 2 is mechanical.
- Component naming: PascalCase for React components, kebab-case for files in `app/`.
- Commit prefixes: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.

## Deploy

Connect this repo to a Vercel project. Auto-deploys on push to `main`. Set environment variables in Vercel dashboard (see `.env.example`).

## Status

Wave 1 — Phase 0 in progress.
