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
      className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg"
    >
      <p className="text-xs font-medium text-muted font-mono">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="mt-0.5 text-sm font-semibold text-foreground font-mono">
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
      className="rounded-lg border border-border bg-card p-5"
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
            className="rounded p-1 text-muted transition-colors duration-150 hover:bg-card-hover hover:text-foreground disabled:opacity-30 cursor-pointer"
            title="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}
            disabled={zoomLevel <= 1}
            className="rounded p-1 text-muted transition-colors duration-150 hover:bg-card-hover hover:text-foreground disabled:opacity-30 cursor-pointer"
            title="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="rounded p-1 text-muted transition-colors duration-150 hover:bg-card-hover hover:text-foreground cursor-pointer"
            title="Reset zoom"
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
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D97706" stopOpacity={0.08} />
                <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748B", fontFamily: "Fira Code" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748B", fontFamily: "Fira Code" }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="previousRevenue"
              stroke="#D97706"
              strokeWidth={1.5}
              strokeOpacity={0.5}
              strokeDasharray="4 4"
              fill="url(#gradientPrevious)"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#gradientRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
