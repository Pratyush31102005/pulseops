"use client";

import { motion } from "framer-motion";
import { FileText, Download, Calendar } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ToastContainer, showToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

const reportTemplates = [
  { name: "Monthly Revenue Summary", description: "Comprehensive breakdown of monthly revenue by plan and region.", lastGenerated: "Dec 1, 2025" },
  { name: "Customer Cohort Analysis", description: "Retention and churn analysis grouped by signup month.", lastGenerated: "Nov 28, 2025" },
  { name: "Conversion Funnel Report", description: "Detailed conversion metrics from visitor to paid customer.", lastGenerated: "Nov 25, 2025" },
  { name: "Churn Risk Report", description: "Identify customers at risk of churning based on activity patterns.", lastGenerated: "Nov 20, 2025" },
  { name: "Annual Performance Summary", description: "Year-over-year comparison of all key business metrics.", lastGenerated: "—" },
];

export default function ReportsPage() {
  return (
    <DashboardShell>
      <ToastContainer />
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">Reports</h1>
            <p className="mt-1 text-sm text-muted">Generate and download detailed analytics reports.</p>
          </div>
          <Button onClick={() => showToast("Report generation started")}>
            <FileText className="h-4 w-4" /> New Report
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          {reportTemplates.map((report, idx) => (
            <motion.div
              key={report.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:border-border-light"
            >
              <div>
                <h3 className="text-sm font-medium text-foreground">{report.name}</h3>
                <p className="mt-0.5 text-xs text-muted">{report.description}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <Calendar className="h-3 w-3" />
                  Last generated: {report.lastGenerated}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => showToast("Download started")}>
                <Download className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
