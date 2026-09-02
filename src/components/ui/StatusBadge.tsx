import { cn } from "@/lib/utils";

type BadgeVariant = "Active" | "Trial" | "Churned" | "Paused" | "Completed" | "Pending" | "Failed" | "Refunded";

const variantStyles: Record<BadgeVariant, string> = {
  Active: "bg-success/10 text-success",
  Trial: "bg-accent/15 text-accent-hover",
  Churned: "bg-error/10 text-error",
  Paused: "bg-warning/15 text-accent-hover",
  Completed: "bg-success/10 text-success",
  Pending: "bg-warning/15 text-accent-hover",
  Failed: "bg-error/10 text-error",
  Refunded: "bg-muted/10 text-muted",
};

const dotColors: Record<BadgeVariant, string> = {
  Active: "bg-success",
  Trial: "bg-accent",
  Churned: "bg-error",
  Paused: "bg-warning",
  Completed: "bg-success",
  Pending: "bg-warning",
  Failed: "bg-error",
  Refunded: "bg-muted",
};

export function StatusBadge({ status }: { status: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[status]
      )}
    >
      <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", dotColors[status])} />
      {status}
    </span>
  );
}
