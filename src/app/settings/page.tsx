"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ToastContainer, showToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const tabs = ["Profile", "Workspace", "Notifications", "Billing"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [saving, setSaving] = useState(false);

  function handleSave() {
    setSaving(true);
    setTimeout(() => { setSaving(false); showToast("Settings saved successfully."); }, 800);
  }

  return (
    <DashboardShell>
      <ToastContainer />
      <div>
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Settings</h1>
          <p className="mt-1 text-sm text-muted">Manage your account and workspace preferences.</p>
        </motion.div>

        <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer",
                activeTab === tab
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted hover:text-foreground hover:border-border-light"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6 space-y-6"
        >
          {activeTab === "Profile" && (
            <>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Personal Information</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-muted">Full name</label>
                    <input defaultValue="Alex Morgan" className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-150" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted">Email</label>
                    <input defaultValue="alex@pulseops.io" type="email" className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-150" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted">Role</label>
                    <input defaultValue="Admin" disabled className="mt-1 h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-muted cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted">Timezone</label>
                    <select className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-150 cursor-pointer">
                      <option>UTC-05:00 Eastern Time</option>
                      <option>UTC-06:00 Central Time</option>
                      <option>UTC-07:00 Mountain Time</option>
                      <option>UTC-08:00 Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </>
          )}

          {activeTab === "Workspace" && (
            <>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Workspace Details</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted">Workspace name</label>
                    <input defaultValue="PulseOps Inc." className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-150" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted">Industry</label>
                    <select className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-150 cursor-pointer">
                      <option>Technology</option>
                      <option>Finance</option>
                      <option>Healthcare</option>
                      <option>E-commerce</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Danger Zone</h3>
                <p className="mt-1 text-sm text-muted">Permanently delete this workspace and all associated data.</p>
                <Button variant="danger" size="sm" className="mt-4">Delete workspace</Button>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </>
          )}

          {activeTab === "Notifications" && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground">Notification Preferences</h3>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Email notifications", desc: "Receive email updates about account activity", default: true },
                  { label: "Marketing emails", desc: "Receive tips, product updates, and inspiration", default: false },
                  { label: "Security alerts", desc: "Get notified about suspicious account activity", default: true },
                  { label: "Weekly reports", desc: "Receive a weekly summary of your analytics", default: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted">{item.desc}</p>
                    </div>
                    <Toggle defaultChecked={item.default} />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </div>
          )}

          {activeTab === "Billing" && (
            <>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Current Plan</h3>
                <div className="mt-3 flex items-center gap-4">
                  <div className="rounded-full bg-highlight px-3 py-1 text-sm font-semibold text-white">Business</div>
                  <p className="text-sm text-muted">$299/month · Renews Jan 1, 2026</p>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Payment Method</h3>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-10 w-14 items-center justify-center rounded-xl border border-border bg-surface text-xs font-medium text-muted">VISA</div>
                  <div>
                    <p className="text-sm text-foreground">Visa ending in 4242</p>
                    <p className="text-xs text-muted">Expires 12/2026</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Billing History</h3>
                <div className="mt-3 space-y-2">
                  {[
                    { date: "Dec 1, 2025", amount: "$299.00", status: "Paid" },
                    { date: "Nov 1, 2025", amount: "$299.00", status: "Paid" },
                    { date: "Oct 1, 2025", amount: "$299.00", status: "Paid" },
                  ].map((item) => (
                    <div key={item.date} className="flex items-center justify-between rounded-xl border border-border px-3 py-2 transition-colors duration-150 hover:border-border-light">
                      <div>
                        <p className="text-sm text-foreground">{item.amount}</p>
                        <p className="text-xs text-muted">{item.date}</p>
                      </div>
                      <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </DashboardShell>
  );
}

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      onClick={() => setOn(!on)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-150",
        on ? "bg-accent" : "bg-border"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-150",
          on ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}
