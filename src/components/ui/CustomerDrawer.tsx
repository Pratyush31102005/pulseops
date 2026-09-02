"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Calendar, CreditCard, Activity, ExternalLink, Pencil } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Button } from "./Button";
import { formatDate, formatCurrency } from "@/lib/utils";
import type { Customer } from "@/lib/types";

interface CustomerDrawerProps {
  customer: Customer | null;
  open: boolean;
  onClose: () => void;
}

export function CustomerDrawer({ customer, open, onClose }: CustomerDrawerProps) {
  if (!customer) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative h-full w-full max-w-md overflow-y-auto border-l border-border bg-background"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-6 py-4">
              <h2 className="text-sm font-semibold text-foreground">Customer Details</h2>
              <button onClick={onClose} className="rounded-full p-1 text-muted transition-colors duration-150 hover:bg-surface hover:text-foreground cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-highlight text-sm font-bold text-white">
                  {customer.avatar}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{customer.name}</h3>
                  <p className="text-sm text-muted">{customer.company}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-xs text-muted uppercase tracking-wider">Plan</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{customer.plan}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-xs text-muted uppercase tracking-wider">Status</p>
                  <div className="mt-1"><StatusBadge status={customer.status} /></div>
                </div>
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-xs text-muted uppercase tracking-wider">MRR</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{customer.mrr > 0 ? formatCurrency(customer.mrr) : "—"}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-xs text-muted uppercase tracking-wider">Joined</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{formatDate(customer.joined)}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1">
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <ExternalLink className="h-3.5 w-3.5" /> Profile
                </Button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
                    <Mail className="h-3.5 w-3.5" /> Contact
                  </div>
                  <p className="mt-1.5 text-sm text-foreground">{customer.email}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
                    <Activity className="h-3.5 w-3.5" /> Last Activity
                  </div>
                  <p className="mt-1.5 text-sm text-foreground">{formatDate(customer.lastActivity)}</p>
                </div>
              </div>

              {customer.payments.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
                    <CreditCard className="h-3.5 w-3.5" /> Recent Payments
                  </div>
                  <div className="mt-2 space-y-2">
                    {customer.payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2 transition-colors duration-150 hover:border-border-light">
                        <div>
                          <p className="text-sm font-medium text-foreground">{formatCurrency(payment.amount)}</p>
                          <p className="text-xs text-muted">{formatDate(payment.date)}</p>
                        </div>
                        <StatusBadge status={payment.status} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {customer.activities.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
                    <Calendar className="h-3.5 w-3.5" /> Activity Timeline
                  </div>
                  <div className="mt-2 space-y-0">
                    {customer.activities.map((activity, idx) => (
                      <div key={activity.id} className="relative flex gap-3 pb-4">
                        {idx < customer.activities.length - 1 && (
                          <div className="absolute left-[7px] top-4 h-full w-px bg-border" />
                        )}
                        <div className="relative mt-1 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-accent/30 bg-background" />
                        <div>
                          <p className="text-sm text-foreground">{activity.description}</p>
                          <p className="text-xs text-muted">{formatDate(activity.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
