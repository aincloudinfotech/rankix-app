"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { GitHubIcon, GoogleIcon, LinkedInIcon } from "@/components/brand/OAuthIcons";

const signUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms to continue" })
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

type SignUpData = z.infer<typeof signUpSchema>;

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

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = (searchParams.get("role") as "candidate" | "employer") || "candidate";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur"
  });

  const password = watch("password") || "";
  const strength = passwordStrength(password);

  const onSubmit = async (data: SignUpData) => {
    // Mock sign-up — real auth wires up in Wave 2
    await new Promise((r) => setTimeout(r, 600));
    router.push(`/sign-up/verify-email?email=${encodeURIComponent(data.email)}&role=${role}`);
  };

  const handleOAuth = (provider: "github" | "google" | "linkedin") => {
    // Mock OAuth: in Wave 2 this calls Supabase Auth signInWithOAuth
    router.push(`/sign-up/verify-email?email=${provider}.user@example.com&role=${role}&via=${provider}`);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
      <Logo variant="compact" className="mb-8" />

      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-text mb-2 tracking-tight">Create your account</h1>
        <p className="text-text-light text-sm mb-6">
          {role === "employer"
            ? "Set up your hiring profile in minutes."
            : "Start building your verified profile in minutes."}{" "}
          <Link href="/" className="text-primary font-semibold hover:underline">
            Switch role
          </Link>
        </p>

        {/* OAuth buttons — top because faster path for most users */}
        <div className="space-y-2.5 mb-6">
          <button
            type="button"
            onClick={() => handleOAuth("github")}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-border rounded-lg hover:bg-bg transition-colors text-sm font-medium text-text"
          >
            <GitHubIcon />
            Continue with GitHub
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-border rounded-lg hover:bg-bg transition-colors text-sm font-medium text-text"
          >
            <GoogleIcon />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("linkedin")}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-border rounded-lg hover:bg-bg transition-colors text-sm font-medium text-text"
          >
            <LinkedInIcon />
            Continue with LinkedIn
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="px-3 text-text-muted text-xs font-medium">OR CONTINUE WITH EMAIL</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              autoComplete="email"
              className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-text-muted"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
                <X size={12} /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                autoComplete="new-password"
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

          {/* Confirm password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text mb-1.5">
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                autoComplete="new-password"
                className="w-full px-3.5 py-2.5 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-text-muted"
                placeholder="Re-enter your password"
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

          {/* Terms checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
            />
            <span className="text-xs text-text-light leading-relaxed">
              I agree to Rankix&apos;s{" "}
              <Link href="/terms" className="text-primary font-semibold hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary font-semibold hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-danger text-xs flex items-center gap-1 -mt-2">
              <X size={12} /> {errors.acceptTerms.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-xs text-text-muted mt-6 leading-relaxed">
          <Check size={12} className="inline mr-1 text-success" />
          Your data is yours. We never sell or share without your permission.
        </p>
      </div>

      <p className="mt-6 text-sm text-text-light">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
