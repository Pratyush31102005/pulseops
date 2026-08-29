import { cn } from "@/lib/utils";

type BadgeVariant = "Active" | "Trial" | "Churned" | "Paused" | "Completed" | "Pending" | "Failed" | "Refunded";

const variantStyles: Record<BadgeVariant, string> = {
  Active: "bg-success/10 text-success",
  Trial: "bg-accent/10 text-accent",
  Churned: "bg-error/10 text-error",
  Paused: "bg-warning/10 text-warning",
  Completed: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Failed: "bg-error/10 text-error",
  Refunded: "bg-muted/10 text-muted-foreground",
};

export function StatusBadge({ status }: { status: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variantStyles[status]
      )}
    >
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          status === "Active" || status === "Completed" ? "bg-success" :
          status === "Trial" || status === "Pending" ? "bg-accent" :
          status === "Churned" || status === "Failed" ? "bg-error" :
          status === "Refunded" ? "bg-muted" :
          "bg-warning"
        )}
      />
      {status}
    </span>
  );
}
