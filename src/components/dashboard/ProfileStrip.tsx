import { Briefcase, Eye } from "lucide-react";
import type { Candidate } from "@/types/candidate";

export function ProfileStrip({ candidate }: { candidate: Candidate }) {
  const profileStrength = 90;
  const visibility = candidate.visibility.visibility;

  // Profile strength circle math
  const strengthRadius = 32;
  const strengthCircumference = 2 * Math.PI * strengthRadius;
  const strengthOffset = strengthCircumference * (1 - profileStrength / 100);

  return (
    <section className="bg-surface border border-border-light rounded-[14px] p-[22px] shadow-sm col-span-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Profile Strength */}
        <div className="flex items-center gap-[18px]">
          <div className="relative w-[76px] h-[76px] flex-shrink-0">
            <svg viewBox="0 0 76 76">
              <circle cx="38" cy="38" r="32" fill="none" stroke="#EFF2F7" strokeWidth="6" />
              <circle
                cx="38"
                cy="38"
                r="32"
                fill="none"
                stroke="#10B981"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={strengthCircumference}
                strokeDashoffset={strengthOffset}
                transform="rotate(-90 38 38)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-extrabold text-success">
              {profileStrength}%
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-text mb-0.5 flex items-center gap-1.5">
              <Briefcase size={14} className="text-text-light" />
              Your Profile Strength
            </div>
            <div className="text-[12.5px] text-text-light leading-snug">
              <strong>Outstanding!</strong> A strong profile gets you better opportunities. Keep it updated and stay ahead.
            </div>
          </div>
          <button className="bg-primary text-white border-none px-4 py-2 rounded-[9px] font-semibold text-[12.5px] cursor-pointer flex-shrink-0 hover:bg-primary-dark transition-colors ml-auto">
            Update Profile
          </button>
        </div>

        {/* Profile Visibility */}
        <div className="flex items-start gap-[18px]">
          <div className="flex-1">
            <div className="text-sm font-bold text-text mb-0.5 flex items-center gap-1.5">
              <Eye size={14} className="text-text-light" />
              Profile Visibility
              <span className="bg-success/10 text-success text-[11px] font-bold px-2 py-0.5 rounded-full ml-1">High</span>
            </div>
            <div className="text-[12.5px] text-text-light leading-snug">Your profile is visible to recruiters.</div>
            <div className="flex items-center gap-2.5 mt-2">
              <div className="flex-1 h-1.5 bg-border-light rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-success to-[#34D399] rounded-full"
                  style={{ width: `${visibility}%` }}
                />
              </div>
              <div className="text-[12.5px] font-bold text-text">
                {visibility}
                <span className="text-text-muted font-medium">/100</span>
              </div>
            </div>
          </div>
          <button className="bg-white text-primary border border-primary px-4 py-2 rounded-[9px] font-semibold text-[12.5px] cursor-pointer flex-shrink-0 hover:bg-primary-light transition-colors">
            Increase Visibility
          </button>
        </div>
      </div>
    </section>
  );
}
