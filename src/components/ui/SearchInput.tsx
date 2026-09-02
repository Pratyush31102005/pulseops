"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: void) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder = "Search...", className }: SearchInputProps) {
  return (
    <div className={className}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value as unknown as void)}
          placeholder={placeholder}
          className="h-10 w-full rounded-xl bg-surface/60 pl-10 pr-4 text-sm text-foreground placeholder:text-muted neu-inset focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all duration-150"
        />
      </div>
    </div>
  );
}
