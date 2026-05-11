"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  User,
  Code2,
  Briefcase,
  FolderGit2,
  Award,
  Send,
  ClipboardCheck,
  TrendingUp,
  Settings,
  Crown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/skills", label: "Skills", icon: Code2 },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/certifications", label: "Certifications", icon: Award },
  { href: "/applications", label: "Applications", icon: Send },
  { href: "/assessments", label: "Assessments", icon: ClipboardCheck },
  { href: "/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-60 bg-surface border-r border-border-light flex-col sticky top-0 h-screen flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-6">
        <Logo variant="compact" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-light text-primary-dark font-semibold"
                  : "text-text-light hover:bg-primary-light hover:text-primary-dark"
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <div className="m-4 p-[18px] gradient-r rounded-[14px] text-white relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-20 h-20 bg-white/10 rounded-full" />
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2.5 relative">
          <Crown size={18} className="text-white" />
        </div>
        <h4 className="text-sm font-bold mb-1.5 relative">Unlock Full Potential</h4>
        <p className="text-xs opacity-85 mb-3.5 leading-tight relative">
          Get personalized insights and priority visibility with Rankix Pro.
        </p>
        <button className="w-full bg-white text-primary-dark border-none px-3.5 py-2 rounded-lg font-semibold text-xs cursor-pointer relative hover:-translate-y-px transition-transform">
          Upgrade to Pro
        </button>
      </div>
    </aside>
  );
}
