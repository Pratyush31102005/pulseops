"use client";

import { TopNav } from "./TopNav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 pt-8 pb-6 sm:px-6">
        {children}
      </main>
    </div>
  );
}
