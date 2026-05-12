"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Mail, ArrowLeft, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

type ForgotData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotData>({
    resolver: zodResolver(forgotSchema),
    mode: "onBlur"
  });

  const onSubmit = async (data: ForgotData) => {
    await new Promise((r) => setTimeout(r, 600));
    setSubmittedEmail(data.email);
  };

  if (submittedEmail) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
        <Logo variant="compact" className="mb-8" />
        <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-5">
            <Mail size={32} className="text-primary" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-text mb-2 tracking-tight">Check your email</h1>
          <p className="text-text-light text-sm mb-2">If an account exists with</p>
          <p className="text-text font-semibold mb-6 break-all">{submittedEmail}</p>
          <p className="text-text-light text-xs mb-6 leading-relaxed">
            we sent a password reset link. The link expires in 1 hour. Check your spam folder if you don&apos;t see it.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
          >
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
      <Logo variant="compact" className="mb-8" />
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-text mb-2 tracking-tight">Reset your password</h1>
        <p className="text-text-light text-sm mb-6">
          Enter the email associated with your account, and we&apos;ll send you a link to reset your password.
        </p>

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
              autoFocus
              className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-text-muted"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
                <X size={12} /> {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <Link
          href="/sign-in"
          className="mt-6 flex items-center justify-center gap-2 text-text-light text-sm hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
