"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { GitHubIcon, GoogleIcon, LinkedInIcon } from "@/components/brand/OAuthIcons";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional()
});

type SignInData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur"
  });

  const onSubmit = async (data: SignInData) => {
    setAuthError(null);
    await new Promise((r) => setTimeout(r, 500));
    // Demo: passwords starting with "wrong" fail so you can test the error state
    if (data.password.toLowerCase().startsWith("wrong")) {
      setAuthError("Invalid email or password. Please try again.");
      return;
    }
    router.push("/dashboard");
  };

  const handleOAuth = (_provider: "github" | "google" | "linkedin") => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
      <Logo variant="compact" className="mb-8" />

      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-text mb-2 tracking-tight">Welcome back</h1>
        <p className="text-text-light text-sm mb-6">Sign in to continue to Rankix.</p>

        {/* OAuth */}
        <div className="space-y-2.5 mb-6">
          <button
            type="button"
            onClick={() => handleOAuth("github")}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-border rounded-lg hover:bg-bg transition-colors text-sm font-medium text-text"
          >
            <GitHubIcon /> Continue with GitHub
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-border rounded-lg hover:bg-bg transition-colors text-sm font-medium text-text"
          >
            <GoogleIcon /> Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("linkedin")}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-border rounded-lg hover:bg-bg transition-colors text-sm font-medium text-text"
          >
            <LinkedInIcon /> Continue with LinkedIn
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="px-3 text-text-muted text-xs font-medium">OR SIGN IN WITH EMAIL</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {authError && (
          <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 mb-4 flex items-start gap-2">
            <X size={16} className="text-danger flex-shrink-0 mt-0.5" />
            <p className="text-danger text-sm">{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-text">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-primary font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                autoComplete="current-password"
                className="w-full px-3.5 py-2.5 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-text-muted"
                placeholder="Your password"
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
            {errors.password && (
              <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
                <X size={12} /> {errors.password.message}
              </p>
            )}
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
            />
            <span className="text-sm text-text-light">Keep me signed in for 30 days</span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm text-text-light">
        Don&apos;t have an account?{" "}
        <Link href="/" className="text-primary font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
