"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metric } from "@/lib/types";

interface MetricCardProps {
  metric: Metric;
  index: number;
}

export function MetricCard({ metric, index }: MetricCardProps) {
  const isPositive = metric.trend === "up";
  const isNegativeGood = metric.label === "Churn Rate" && metric.trend === "down";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
      className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-light"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted">{metric.label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{metric.value}</p>
      <div className="mt-2 flex items-center gap-1.5">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            isPositive || isNegativeGood
              ? "bg-success/10 text-success"
              : "bg-error/10 text-error"
          )}
        >
          {isPositive || isNegativeGood ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {Math.abs(metric.change)}%
        </span>
        <span className="text-xs text-muted">{metric.changeLabel}</span>
      </div>
    </motion.div>
  );
}
