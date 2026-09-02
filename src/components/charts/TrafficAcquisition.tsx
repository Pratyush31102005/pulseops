"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { TrafficSource } from "@/lib/types";
import { formatNumber, cn } from "@/lib/utils";

interface TrafficAcquisitionProps {
  data: TrafficSource[];
}

const sourceColors: Record<string, string> = {
  "Organic Search": "#10B981",
  "Direct": "#3B82F6",
  "Referral": "#D97706",
  "Paid": "#EF4444",
};

export function TrafficAcquisition({ data }: TrafficAcquisitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      className="rounded-lg border border-border bg-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground">Traffic / Acquisition</h3>
      <div className="mt-4 space-y-3">
        {data.map((source, idx) => {
          const color = sourceColors[source.source] || "#3B82F6";
          return (
            <motion.div
              key={source.source}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + idx * 0.05 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                <div>
                  <p className="text-sm text-foreground">{source.source}</p>
                  <p className="text-xs text-muted font-mono">{formatNumber(source.visitors)} visitors</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground font-mono">{source.percentage}%</span>
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-mono",
                    source.change > 0 ? "text-success" : "text-error"
                  )}
                >
                  {source.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(source.change)}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
