"use client";

import { Bell, ChevronDown } from "lucide-react";
import { useUserStore } from "@/lib/store/user";

interface TopBarProps {
  greetingName?: string;
  subtitle?: string;
}

export function TopBar({
  greetingName,
  subtitle = "Track your progress and increase your Rankix Score."
}: TopBarProps) {
  const { userName, userInitials, userRole } = useUserStore();
  const name = greetingName ?? userName.split(" ")[0];

  return (
    <header className="px-8 py-6 flex justify-between items-center gap-4">
      <div>
        <h1 className="text-[22px] font-bold text-text mb-1 tracking-tight">
          Welcome back, {name}! 👋
        </h1>
        <p className="text-text-light text-[13.5px]">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3.5">
        <button className="relative w-10 h-10 bg-surface border border-border rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-bg transition-colors">
          <Bell size={18} className="text-text-light" />
          <span className="absolute top-2 right-2 bg-danger text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>
        <button className="flex items-center gap-2.5 pr-3 py-1 pl-1 bg-surface border border-border rounded-[10px] cursor-pointer hover:bg-bg transition-colors">
          <span className="w-8 h-8 rounded-lg gradient-r flex items-center justify-center text-white font-bold text-[13px]">
            {userInitials}
          </span>
          <span className="text-left">
            <span className="block font-semibold text-[13px] leading-tight">
              {userName}
            </span>
            <span className="block text-[11px] text-text-light leading-tight capitalize">
              {userRole === "candidate" ? "AI Engineer" : userRole}
            </span>
          </span>
          <ChevronDown size={14} className="text-text-muted" />
        </button>
      </div>
    </header>
  );
}
