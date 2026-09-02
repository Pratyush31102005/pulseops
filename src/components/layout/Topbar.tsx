"use client";

import { Menu, Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  collapsed: boolean;
  onMobileMenuOpen: () => void;
}

export function Topbar({ collapsed, onMobileMenuOpen }: TopbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center border-b border-border bg-surface/80 px-4 backdrop-blur-md transition-all duration-200 lg:px-6",
        collapsed ? "lg:pl-[76px]" : "lg:pl-[236px]"
      )}
    >
      <button
        onClick={onMobileMenuOpen}
        className="mr-3 rounded p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-card hover:text-foreground lg:hidden cursor-pointer"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center gap-3">
        <div className="relative hidden max-w-xs flex-1 sm:block">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors duration-150"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative rounded-md p-2 text-muted-foreground transition-colors duration-150 hover:bg-card hover:text-foreground cursor-pointer">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-highlight" />
        </button>
        <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary-light lg:hidden cursor-pointer">
          AM
        </div>
      </div>
    </header>
  );
}
