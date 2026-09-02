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
      className="rounded-2xl bg-card px-3 py-2 neu-hover"
    >
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="text-sm font-semibold text-foreground">{payload[0]?.value.toLocaleString()}</p>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <ToastContainer />
      <div>
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Analytics</h1>
          <p className="mt-1 text-sm text-muted">Deep dive into your platform performance metrics.</p>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-card/80 backdrop-blur-sm p-5 neu-flat"
          >
            <h3 className="text-sm font-semibold text-foreground">User Growth</h3>
            <p className="mt-1 text-xs text-muted">Total active users over time</p>
            <div className="mt-4 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradientGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E8B830" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#E8B830" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D0" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A8070" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A8070" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#E8B830" strokeWidth={2.5} fill="url(#gradientGrowth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl bg-card/80 backdrop-blur-sm p-5 neu-flat"
          >
            <h3 className="text-sm font-semibold text-foreground">Retention Curve</h3>
            <p className="mt-1 text-xs text-muted">User retention over 12 weeks</p>
            <div className="mt-4 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D0" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A8070" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A8070" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2.5} dot={{ r: 3, fill: "#4CAF50", strokeWidth: 0 }} activeDot={{ r: 5, fill: "#4CAF50", stroke: "#FFFFFF", strokeWidth: 2 }} />
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
            className="rounded-2xl bg-card/80 backdrop-blur-sm p-5 neu-flat"
          >
            <h3 className="text-sm font-semibold text-foreground">Conversion Funnel</h3>
            <p className="mt-1 text-xs text-muted">Visitor to customer journey</p>
            <div className="mt-5 space-y-3">
              {conversionFunnel.map((step, idx) => (
                <div key={step.step}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{step.step}</span>
                    <span className="font-medium text-foreground">{step.count.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full neu-inset">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${step.percentage}%` }}
                      transition={{ delay: 0.3 + idx * 0.08, duration: 0.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted">{step.percentage}%</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl bg-card/80 backdrop-blur-sm p-5 neu-flat"
          >
            <h3 className="text-sm font-semibold text-foreground">Top Acquisition Channels</h3>
            <p className="mt-1 text-xs text-muted">Traffic source breakdown</p>
            <div className="mt-4 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficSources} layout="vertical" margin={{ top: 0, right: 5, left: 80, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D0" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A8070" }} />
                  <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A8070" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="visitors" fill="#E8B830" radius={[0, 8, 8, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  );
}
