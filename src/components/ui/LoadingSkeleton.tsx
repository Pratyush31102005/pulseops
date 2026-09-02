import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-border", className)} />;
}

export function MetricCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-3 h-7 w-20" />
      <Skeleton className="mt-3 h-4 w-32" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-4 h-[250px] w-full rounded-xl" />
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="border-b border-border p-4">
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="p-4 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4">
            {Array.from({ length: cols }).map((_, j) => (
              <Skeleton key={j} className={cn("h-4", j === 0 ? "w-32" : "w-20")} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
