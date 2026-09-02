"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Settings, Bell, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/overview" },
  { label: "Analytics", href: "/analytics" },
  { label: "Customers", href: "/customers" },
  { label: "Transactions", href: "/transactions" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/overview" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Pulse<span className="text-accent">Ops</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-highlight text-white"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 text-muted transition-colors duration-150 hover:bg-surface hover:text-foreground">
            <Search className="h-4 w-4" />
          </button>
          <button className="relative rounded-full p-2 text-muted transition-colors duration-150 hover:bg-surface hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
          </button>
          <button className="rounded-full p-2 text-muted transition-colors duration-150 hover:bg-surface hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
          <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-highlight text-xs font-semibold text-white">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
