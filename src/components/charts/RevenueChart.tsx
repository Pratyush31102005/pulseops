"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import type { ChartDataPoint } from "@/lib/types";

interface RevenueChartProps {
  data: ChartDataPoint[];
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card px-3 py-2 shadow-lg"
    >
      <p className="text-xs font-medium text-muted">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="mt-0.5 text-sm font-semibold text-foreground">
          ${entry.value.toLocaleString()}
          <span className="ml-1 text-xs font-normal text-muted">
            {entry.dataKey === "revenue" ? "Current" : "Previous"}
          </span>
        </p>
      ))}
    </motion.div>
  );
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const visibleData = data.slice(0, Math.ceil(data.length / zoomLevel));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.3 }}
      className="rounded-2xl border border-border bg-card p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Revenue Overview</h3>
          <p className="mt-0.5 text-xs text-muted">Monthly revenue vs previous period</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 mr-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-muted">Current</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-highlight" />
              <span className="text-muted">Previous</span>
            </span>
          </div>
          <button
            onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 3))}
            disabled={zoomLevel >= 3}
            className="rounded-lg p-1.5 text-muted transition-colors duration-150 hover:bg-surface hover:text-foreground disabled:opacity-30 cursor-pointer"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}
            disabled={zoomLevel <= 1}
            className="rounded-lg p-1.5 text-muted transition-colors duration-150 hover:bg-surface hover:text-foreground disabled:opacity-30 cursor-pointer"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="rounded-lg p-1.5 text-muted transition-colors duration-150 hover:bg-surface hover:text-foreground cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="mt-4 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visibleData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradientRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4A843" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#D4A843" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D2D2D" stopOpacity={0.06} />
                <stop offset="95%" stopColor="#2D2D2D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D0" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#8A8070" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#8A8070" }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="previousRevenue"
              stroke="#2D2D2D"
              strokeWidth={1.5}
              strokeOpacity={0.3}
              strokeDasharray="4 4"
              fill="url(#gradientPrevious)"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#D4A843"
              strokeWidth={2.5}
              fill="url(#gradientRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
