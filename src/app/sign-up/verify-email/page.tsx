"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, CheckCircle2, RefreshCw } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

function VerifyEmailContent() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") || "your email";
  const role = params.get("role") || "candidate";

  const [state, setState] = useState<"sent" | "verified">("sent");
  const [resending, setResending] = useState(false);
  const [justResent, setJustResent] = useState(false);

  const handleResend = async () => {
    setResending(true);
    await new Promise((r) => setTimeout(r, 800));
    setResending(false);
    setJustResent(true);
    setTimeout(() => setJustResent(false), 3000);
  };

  const handleSimulateVerify = () => {
    setState("verified");
  };

  const handleContinue = () => {
    router.push(`/onboarding/${role}`);
  };

  if (state === "verified") {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
        <Logo variant="compact" className="mb-8" />
        <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-success" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-text mb-2 tracking-tight">Email verified</h1>
          <p className="text-text-light text-sm mb-2">
            <strong className="text-text">{email}</strong> is confirmed.
          </p>
          <p className="text-text-light text-sm mb-6">Let&apos;s set up your profile.</p>
          <button
            onClick={handleContinue}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
      <Logo variant="compact" className="mb-8" />
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-5">
          <Mail size={32} className="text-primary" strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-bold text-text mb-2 tracking-tight">Check your email</h1>
        <p className="text-text-light text-sm mb-2">We sent a verification link to</p>
        <p className="text-text font-semibold mb-6 break-all">{email}</p>
        <p className="text-text-light text-xs mb-6 leading-relaxed">
          Click the link in the email to verify your account. The link expires in 24 hours. Check your spam folder if you don&apos;t see it.
        </p>

        <button
          onClick={handleSimulateVerify}
          className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors mb-3"
        >
          Simulate email verified (demo)
        </button>

        <button
          onClick={handleResend}
          disabled={resending}
          className="w-full flex items-center justify-center gap-2 text-text-light text-sm hover:text-primary transition-colors py-2 disabled:opacity-50"
        >
          <RefreshCw size={14} className={resending ? "animate-spin" : ""} />
          {resending ? "Resending..." : justResent ? "Email resent!" : "Resend email"}
        </button>

        <p className="text-xs text-text-muted mt-6">
          Wrong email?{" "}
          <Link href="/" className="text-primary font-semibold hover:underline">
            Start over
          </Link>
        </p>
      </div>
    </div>
  );
}

function VerifyEmailFallback() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
      <Logo variant="compact" className="mb-8" />
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-border-light animate-pulse mx-auto mb-5" />
        <div className="h-7 w-40 bg-border-light rounded animate-pulse mx-auto mb-3" />
        <div className="h-4 w-64 bg-border-light rounded animate-pulse mx-auto mb-6" />
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
