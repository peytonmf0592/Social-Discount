"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Megaphone,
  BarChart3,
  Settings,
  Wallet,
  ClipboardCheck,
  Users,
  Building2,
} from "lucide-react";

interface SidebarProps {
  role: "MERCHANT" | "ADMIN" | "CUSTOMER";
}

const merchantLinks = [
  { href: "/app/business", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/business/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/app/business/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/app/business/redemptions", label: "Redemptions", icon: ClipboardCheck },
  { href: "/app/business/settings", label: "Settings", icon: Settings },
];

const adminLinks = [
  { href: "/app/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/admin/submissions", label: "Submissions", icon: ClipboardCheck },
  { href: "/app/admin/businesses", label: "Businesses", icon: Building2 },
  { href: "/app/admin/users", label: "Users", icon: Users },
];

const customerLinks = [
  { href: "/app/wallet", label: "Wallet", icon: Wallet },
  { href: "/app/history", label: "History", icon: BarChart3 },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function AppSidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const links =
    role === "MERCHANT"
      ? merchantLinks
      : role === "ADMIN"
      ? adminLinks
      : customerLinks;

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">Social Perks</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
