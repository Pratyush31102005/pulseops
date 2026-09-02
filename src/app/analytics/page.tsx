"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ToastContainer } from "@/components/ui/Toast";
import { userGrowthData, conversionFunnel, retentionData, trafficSources } from "@/lib/data";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg"
    >
      <p className="text-xs font-medium text-muted font-mono">{label}</p>
      <p className="text-sm font-semibold text-foreground font-mono">{payload[0]?.value.toLocaleString()}</p>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <ToastContainer />
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">Analytics</h1>
          <p className="mt-1 text-sm text-muted">Deep dive into your platform performance metrics.</p>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border border-border bg-card p-5"
          >
            <h3 className="text-sm font-semibold text-foreground">User Growth</h3>
            <p className="mt-1 text-xs text-muted">Total active users over time</p>
            <div className="mt-4 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradientGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748B", fontFamily: "Fira Code" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748B", fontFamily: "Fira Code" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#gradientGrowth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-lg border border-border bg-card p-5"
          >
            <h3 className="text-sm font-semibold text-foreground">Retention Curve</h3>
            <p className="mt-1 text-xs text-muted">User retention over 12 weeks</p>
            <div className="mt-4 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748B", fontFamily: "Fira Code" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748B", fontFamily: "Fira Code" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: "#10B981", strokeWidth: 0 }} activeDot={{ r: 5, fill: "#10B981", stroke: "#0A0E27", strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border border-border bg-card p-5"
          >
            <h3 className="text-sm font-semibold text-foreground">Conversion Funnel</h3>
            <p className="mt-1 text-xs text-muted">Visitor to customer journey</p>
            <div className="mt-5 space-y-3">
              {conversionFunnel.map((step, idx) => (
                <div key={step.step}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{step.step}</span>
                    <span className="font-medium text-foreground font-mono text-xs">{step.count.toLocaleString()}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${step.percentage}%` }}
                      transition={{ delay: 0.3 + idx * 0.08, duration: 0.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-primary-light"
                    />
                  </div>
                  <p className="mt-0.5 text-xs text-muted font-mono">{step.percentage}%</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-lg border border-border bg-card p-5"
          >
            <h3 className="text-sm font-semibold text-foreground">Top Acquisition Channels</h3>
            <p className="mt-1 text-xs text-muted">Traffic source breakdown</p>
            <div className="mt-4 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficSources} layout="vertical" margin={{ top: 0, right: 5, left: 80, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748B", fontFamily: "Fira Code" }} />
                  <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94A3B8" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="visitors" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  );
}
