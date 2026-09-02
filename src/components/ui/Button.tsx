import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        variant === "primary" && "bg-highlight text-white hover:bg-highlight-hover shadow-sm hover:shadow-md",
        variant === "secondary" && "border border-border bg-card text-foreground hover:bg-card-hover",
        variant === "ghost" && "text-muted hover:bg-surface hover:text-foreground",
        variant === "danger" && "bg-error/10 text-error hover:bg-error/15 border border-error/20",
        size === "sm" && "h-8 px-3 text-xs",
        size === "md" && "h-9 px-4 text-sm",
        size === "lg" && "h-10 px-6 text-sm",
        className
      )}
      {...props}
    />
  );
}
