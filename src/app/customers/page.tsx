"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ToastContainer } from "@/components/ui/Toast";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CustomerDrawer } from "@/components/ui/CustomerDrawer";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { showToast } from "@/components/ui/Toast";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { customers } from "@/lib/data";
import type { Customer } from "@/lib/types";

const ITEMS_PER_PAGE = 6;
const plans = ["All", "Starter", "Pro", "Business", "Enterprise"];
const statuses = ["All", "Active", "Trial", "Churned", "Paused"];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<"name" | "mrr" | "joined">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Customer | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...customers];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.company.toLowerCase().includes(q)
      );
    }
    if (planFilter !== "All") result = result.filter((c) => c.plan === planFilter);
    if (statusFilter !== "All") result = result.filter((c) => c.status === statusFilter);
    result.sort((a, b) => {
      if (sortField === "name") return sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      if (sortField === "mrr") return sortDir === "asc" ? a.mrr - b.mrr : b.mrr - a.mrr;
      return sortDir === "asc" ? a.joined.localeCompare(b.joined) : b.joined.localeCompare(a.joined);
    });
    return result;
  }, [search, planFilter, statusFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function handleSort(field: "name" | "mrr" | "joined") {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  }

  function SortIcon({ field }: { field: string }) {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3 text-accent" /> : <ArrowDown className="h-3 w-3 text-accent" />;
  }

  function openDrawer(c: Customer) {
    setSelectedCustomer(c);
    setDrawerOpen(true);
    setMenuOpen(null);
  }

  return (
    <DashboardShell>
      <ToastContainer />
      <div>
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Customers</h1>
          <p className="mt-1 text-sm text-muted">Manage your customer base and subscriptions.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <SearchInput value={search} onChange={(v) => setSearch(v as unknown as string)} placeholder="Search customers..." className="w-full sm:w-64" />
          <FilterDropdown label="Plan" options={plans} value={planFilter} onChange={(v) => { setPlanFilter(v); setPage(1); }} />
          <FilterDropdown label="Status" options={statuses} value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(1); }} />
        </motion.div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No customers found"
            description="Try adjusting your search or filters to find what you're looking for."
            actionLabel="Clear filters"
            onAction={() => { setSearch(""); setPlanFilter("All"); setStatusFilter("All"); setPage(1); }}
          />
        ) : (
          <>
            <div className="mt-4 overflow-x-auto rounded-2xl bg-card/80 backdrop-blur-sm neu-flat">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted group cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("name")}>
                      <span className="flex items-center gap-1.5">Customer <SortIcon field="name" /></span>
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted md:table-cell">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Plan</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Status</th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted cursor-pointer hover:text-foreground transition-colors sm:table-cell group" onClick={() => handleSort("mrr")}>
                      <span className="flex items-center gap-1.5">MRR <SortIcon field="mrr" /></span>
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted cursor-pointer hover:text-foreground transition-colors lg:table-cell group" onClick={() => handleSort("joined")}>
                      <span className="flex items-center gap-1.5">Joined <SortIcon field="joined" /></span>
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {paged.map((customer, idx) => (
                      <motion.tr
                        key={customer.id}
                        layout
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ delay: idx * 0.025, duration: 0.2 }}
                        className="border-b border-border/30 last:border-0 transition-colors duration-150 hover:bg-surface/50 cursor-pointer"
                        onClick={() => openDrawer(customer)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-highlight text-xs font-semibold text-white">
                              {customer.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{customer.name}</p>
                              <p className="text-xs text-muted md:hidden">{customer.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 text-sm text-muted md:table-cell">{customer.email}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{customer.plan}</td>
                        <td className="px-4 py-3"><StatusBadge status={customer.status} /></td>
                        <td className="hidden px-4 py-3 text-sm font-medium text-foreground sm:table-cell">{customer.mrr > 0 ? formatCurrency(customer.mrr) : "—"}</td>
                        <td className="hidden px-4 py-3 text-sm text-muted lg:table-cell">{formatDate(customer.joined)}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="relative inline-block">
                            <button
                              onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === customer.id ? null : customer.id); }}
                              className="rounded-full p-1 text-muted transition-colors duration-150 hover:bg-highlight hover:text-white cursor-pointer"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                            {menuOpen === customer.id && (
                              <div className="absolute right-0 top-full z-20 mt-1 w-36 rounded-xl bg-card py-1 neu-float">
                                <button onClick={(e) => { e.stopPropagation(); openDrawer(customer); }} className="w-full px-3 py-1.5 text-left text-sm text-foreground hover:bg-surface transition-colors cursor-pointer">View details</button>
                                <button onClick={(e) => { e.stopPropagation(); setMenuOpen(null); showToast("Customer edited"); }} className="w-full px-3 py-1.5 text-left text-sm text-foreground hover:bg-surface transition-colors cursor-pointer">Edit</button>
                                <button onClick={(e) => { e.stopPropagation(); setDeleteModal(customer); setMenuOpen(null); }} className="w-full px-3 py-1.5 text-left text-sm text-error hover:bg-surface transition-colors cursor-pointer">Remove</button>
                              </div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted">
                {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <span className="text-sm text-muted">{page} / {totalPages}</span>
                <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <CustomerDrawer customer={selectedCustomer} open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Modal
        open={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Remove customer"
        description={`Are you sure you want to remove ${deleteModal?.name}? This action cannot be undone.`}
      >
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteModal(null)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => { setDeleteModal(null); showToast("Customer removed"); }}
          >
            Remove
          </Button>
        </div>
      </Modal>
    </DashboardShell>
  );
}
