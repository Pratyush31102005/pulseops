"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDollarSign, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ToastContainer } from "@/components/ui/Toast";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { transactions, transactionMetrics } from "@/lib/data";

const statusFilters = ["All", "Completed", "Pending", "Failed", "Refunded"];
const methodFilters = ["All", "Visa", "Mastercard", "Amex", "PayPal", "Bank Transfer"];

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");

  const filtered = useMemo(() => {
    let result = [...transactions];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) => t.id.toLowerCase().includes(q) || t.customerName.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") result = result.filter((t) => t.status === statusFilter);
    if (methodFilter !== "All") result = result.filter((t) => t.paymentMethod === methodFilter);
    return result;
  }, [search, statusFilter, methodFilter]);

  const summaryCards = [
    { label: "Total Value", value: formatCurrency(transactionMetrics.totalValue), icon: CircleDollarSign, color: "text-foreground", bg: "bg-surface" },
    { label: "Successful", value: formatCurrency(transactionMetrics.successful), icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
    { label: "Refunds", value: formatCurrency(transactionMetrics.refunds), icon: RotateCcw, color: "text-accent", bg: "bg-accent/10" },
    { label: "Failed", value: formatCurrency(transactionMetrics.failed), icon: XCircle, color: "text-error", bg: "bg-error/10" },
  ];

  return (
    <DashboardShell>
      <ToastContainer />
      <div>
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Transactions</h1>
          <p className="mt-1 text-sm text-muted">Monitor all payment activity across your platform.</p>
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {summaryCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-4 transition-all duration-150 hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl", card.bg)}>
                  <card.icon className={cn("h-4 w-4", card.color)} />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">{card.label}</p>
              </div>
              <p className="mt-3 text-xl font-bold text-foreground">{card.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <SearchInput value={search} onChange={setSearch} placeholder="Search transactions..." className="w-full sm:w-64" />
          <FilterDropdown label="Status" options={statusFilters} value={statusFilter} onChange={setStatusFilter} />
          <FilterDropdown label="Method" options={methodFilters} value={methodFilter} onChange={setMethodFilter} />
        </motion.div>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Customer</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted sm:table-cell">Amount</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted md:table-cell">Date</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted lg:table-cell">Method</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((txn, idx) => (
                  <motion.tr
                    key={txn.id}
                    layout
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ delay: idx * 0.02, duration: 0.2 }}
                    className="border-b border-border last:border-0 transition-colors duration-150 hover:bg-surface"
                  >
                    <td className="px-4 py-3 text-sm text-muted font-mono text-xs">{txn.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{txn.customerName}</td>
                    <td className="hidden px-4 py-3 text-sm font-medium text-foreground sm:table-cell">{formatCurrency(txn.amount)}</td>
                    <td className="hidden px-4 py-3 text-sm text-muted md:table-cell">{formatDate(txn.date)}</td>
                    <td className="hidden px-4 py-3 text-sm text-muted lg:table-cell">{txn.paymentMethod}</td>
                    <td className="px-4 py-3"><StatusBadge status={txn.status} /></td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-muted">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
