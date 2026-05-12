"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, CheckCircle2, X, AlertTriangle } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

type ResetData = z.infer<typeof resetSchema>;

function passwordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong", "Excellent"];
  const colors = ["bg-danger", "bg-danger", "bg-warning", "bg-warning", "bg-success", "bg-success"];
  return { score, label: labels[score], color: colors[score] };
}

function ResetForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ResetData>({
    resolver: zodResolver(resetSchema),
    mode: "onBlur"
  });

  const password = watch("password") || "";
  const strength = passwordStrength(password);

  const onSubmit = async (_data: ResetData) => {
    await new Promise((r) => setTimeout(r, 600));
    setSuccess(true);
    setTimeout(() => router.push("/sign-in"), 2000);
  };

  // No token → show error state
  if (!token) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
        <Logo variant="compact" className="mb-8" />
        <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle size={32} className="text-danger" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-text mb-2 tracking-tight">Invalid reset link</h1>
          <p className="text-text-light text-sm mb-6 leading-relaxed">
            This password reset link is missing or has expired. Request a new one to continue.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors text-center"
          >
            Request new reset link
          </Link>
          <Link
            href="/sign-in"
            className="block mt-4 text-text-light text-sm hover:text-primary transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
        <Logo variant="compact" className="mb-8" />
        <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-success" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-text mb-2 tracking-tight">Password updated</h1>
          <p className="text-text-light text-sm mb-2">Your password has been successfully reset.</p>
          <p className="text-text-light text-sm">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  // Normal form state
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
      <Logo variant="compact" className="mb-8" />
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-text mb-2 tracking-tight">Set new password</h1>
        <p className="text-text-light text-sm mb-6">
          Choose a strong password you don&apos;t use anywhere else.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text mb-1.5">
              New password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                autoComplete="new-password"
                autoFocus
                className="w-full px-3.5 py-2.5 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-text-muted"
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i <= strength.score ? strength.color : "bg-border-light"}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-text-light mt-1.5">
                  Strength: <span className="font-semibold">{strength.label}</span>
                </p>
              </div>
            )}
            {errors.password && (
              <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
                <X size={12} /> {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text mb-1.5">
              Confirm new password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                autoComplete="new-password"
                className="w-full px-3.5 py-2.5 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-text-muted"
                placeholder="Re-enter new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                tabIndex={-1}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
                <X size={12} /> {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}

function ResetFallback() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
      <Logo variant="compact" className="mb-8" />
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm">
        <div className="h-7 w-44 bg-border-light rounded animate-pulse mb-3" />
        <div className="h-4 w-64 bg-border-light rounded animate-pulse mb-6" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-11 bg-border-light rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetFallback />}>
      <ResetForm />
    </Suspense>
  );
}
