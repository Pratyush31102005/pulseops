import { cn } from "@/lib/utils";

type BadgeVariant = "Active" | "Trial" | "Churned" | "Paused" | "Completed" | "Pending" | "Failed" | "Refunded";

const variantStyles: Record<BadgeVariant, string> = {
  Active: "bg-success/10 text-success border border-success/20",
  Trial: "bg-accent/10 text-accent border border-accent/20",
  Churned: "bg-error/10 text-error border border-error/20",
  Paused: "bg-warning/10 text-warning border border-warning/20",
  Completed: "bg-success/10 text-success border border-success/20",
  Pending: "bg-warning/10 text-warning border border-warning/20",
  Failed: "bg-error/10 text-error border border-error/20",
  Refunded: "bg-muted/10 text-muted-foreground border border-muted/20",
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
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variantStyles[status]
      )}
    >
      <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", dotColors[status])} />
      {status}
    </span>
  );
}
