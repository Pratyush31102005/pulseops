"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metric } from "@/lib/types";

interface MetricCardProps {
  metric: Metric;
  index: number;
}

const miniSparklines: Record<string, number[]> = {
  "Monthly Revenue": [30, 35, 28, 42, 38, 50, 45, 55, 52, 60, 58, 65],
  "Active Customers": [40, 42, 45, 44, 48, 50, 52, 54, 56, 58, 60, 62],
  "Conversion Rate": [50, 48, 52, 54, 50, 56, 55, 58, 57, 60, 59, 62],
  "Churn Rate": [60, 58, 55, 52, 50, 48, 46, 44, 42, 40, 38, 36],
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 72;
  const height = 24;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MetricCard({ metric, index }: MetricCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isPositive = metric.trend === "up";
  const isNegativeGood = metric.label === "Churn Rate" && metric.trend === "down";
  const sparkColor = isPositive || isNegativeGood ? "#4CAF50" : "#E05050";
  const sparkData = miniSparklines[metric.label] || [30, 40, 35, 50, 45, 55, 50, 60, 55, 65, 60, 70];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3, ease: "easeOut" }}
      className="group relative rounded-2xl bg-card/80 backdrop-blur-sm p-5 neu-flat transition-all duration-300 hover:neu-hover cursor-default"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">{metric.label}</p>
        <div className="relative">
          <Info className="h-3.5 w-3.5 text-muted/40 transition-colors duration-150 group-hover:text-muted" />
          {showTooltip && (
            <div className="absolute right-0 top-full z-10 mt-1.5 w-48 rounded-2xl bg-card px-3 py-2 neu-hover">
              <p className="text-xs text-foreground">{metric.changeLabel}</p>
              <p className="mt-0.5 text-xs text-muted">
                {isPositive || isNegativeGood ? "Trending upward" : "Trending downward"} over the selected period.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <p className="text-4xl font-light tracking-tight text-foreground">{metric.value}</p>
        <MiniSparkline data={sparkData} color={sparkColor} />
      </div>

      <div className="mt-3 flex items-center gap-1.5">
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
      </div>
    </motion.div>
  );
}
