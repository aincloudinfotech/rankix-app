import Link from "next/link";
import { User, Briefcase, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function RootPage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
      {/* Logo + tagline */}
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="mb-8">
          <Logo variant="hero" showTagline />
        </div>

        <h1 className="text-3xl md:text-[40px] font-extrabold text-text mb-4 tracking-tight max-w-2xl leading-tight">
          The credit score for <span className="text-primary">verified talent</span>
        </h1>
        <p className="text-text-light text-base md:text-lg max-w-xl leading-relaxed">
          Verified evidence. Explainable matches. The trusted score recruiters and candidates reference in every hiring conversation.
        </p>
      </div>

      {/* Role choice cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl">
        {/* Candidate card */}
        <Link
          href="/sign-up?role=candidate"
          className="group bg-surface border-2 border-border rounded-2xl p-8 hover:border-primary hover:shadow-lg transition-all"
        >
          <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
            <User size={28} className="text-primary group-hover:text-white transition-colors" />
          </div>
          <h2 className="text-xl font-bold text-text mb-2">I&apos;m looking for opportunities</h2>
          <p className="text-text-light text-sm mb-6 leading-relaxed">
            Build an evidence-backed profile, raise your Rankix Score, get discovered by serious employers in UAE, India, and globally.
          </p>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            Continue as candidate
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Employer card */}
        <Link
          href="/sign-up?role=employer"
          className="group bg-surface border-2 border-border rounded-2xl p-8 hover:border-purple hover:shadow-lg transition-all"
        >
          <div className="w-14 h-14 rounded-xl bg-purple-light flex items-center justify-center mb-5 group-hover:bg-purple transition-colors">
            <Briefcase size={28} className="text-purple group-hover:text-white transition-colors" />
          </div>
          <h2 className="text-xl font-bold text-text mb-2">I&apos;m hiring talent</h2>
          <p className="text-text-light text-sm mb-6 leading-relaxed">
            Verified candidates with explainable Rankix Match scores for your open roles. Shortlists in 72 hours, not 12 weeks.
          </p>
          <div className="flex items-center gap-2 text-purple font-semibold text-sm">
            Continue as employer
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Sign in link */}
      <div className="mt-12 text-center">
        <Link href="/sign-in" className="text-text-light text-sm hover:text-primary transition-colors">
          Already have an account? <span className="text-primary font-semibold">Sign in</span>
        </Link>
      </div>

      {/* Demo footer */}
      <div className="mt-8 text-center">
        <Link href="/dashboard" className="text-text-muted text-xs hover:text-primary transition-colors">
          View dashboard demo →
        </Link>
      </div>
    </div>
  );
}
