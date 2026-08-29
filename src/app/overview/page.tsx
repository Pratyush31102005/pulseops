"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ToastContainer } from "@/components/ui/Toast";
import { MetricCard } from "@/components/ui/MetricCard";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { RevenueByPlan } from "@/components/charts/RevenueByPlan";
import { TrafficAcquisition } from "@/components/charts/TrafficAcquisition";
import { cn } from "@/lib/utils";
import { metrics, revenueChartData, planBreakdown, trafficSources } from "@/lib/data";

const dateRanges = ["7 days", "30 days", "90 days", "Custom"];

export default function OverviewPage() {
  const [activeRange, setActiveRange] = useState("30 days");

  return (
    <DashboardShell>
      <ToastContainer />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Good morning, Alex
            </h1>
            <p className="mt-1 text-sm text-muted">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
            {dateRanges.map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  activeRange === range
                    ? "bg-accent text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        <div className="mt-6">
          <RevenueChart data={revenueChartData} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <RevenueByPlan data={planBreakdown} />
          <TrafficAcquisition data={trafficSources} />
        </div>
      </div>
    </DashboardShell>
  );
}
