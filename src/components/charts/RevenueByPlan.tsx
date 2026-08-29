"use client";

import { motion } from "framer-motion";
import type { PlanBreakdown } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface RevenueByPlanProps {
  data: PlanBreakdown[];
}

export function RevenueByPlan({ data }: RevenueByPlanProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.35 }}
      className="rounded-lg border border-border bg-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground">Revenue by Plan</h3>
      <div className="mt-4 space-y-4">
        {data.map((plan, idx) => (
          <motion.div
            key={plan.plan}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.06 }}
          >
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: plan.color }} />
                <span className="text-foreground">{plan.plan}</span>
                <span className="text-xs text-muted">({formatNumber(plan.count)})</span>
              </div>
              <span className="font-medium text-foreground">{formatCurrency(plan.revenue)}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(plan.revenue / maxRevenue) * 100}%` }}
                transition={{ delay: 0.6 + idx * 0.08, duration: 0.5, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: plan.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
