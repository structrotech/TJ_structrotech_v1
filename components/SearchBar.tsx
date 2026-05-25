"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-2xl items-center gap-3 rounded-full px-5 py-3 transition-all",
        "bg-white border border-black/10 shadow-[inset_0_2px_8px_rgba(0,0,0,0.08)]",
        "focus-within:border-purple-500/50 focus-within:shadow-lg focus-within:shadow-purple-500/10",
        "dark:bg-[#0a0a0f] dark:border-white/10 dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]",
        "dark:focus-within:border-purple-500/50 dark:focus-within:shadow-purple-500/20",
        className
      )}
    >
      <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[15px] font-normal leading-[1.7] text-foreground placeholder:text-muted-foreground focus:outline-none"
        aria-label={placeholder}
      />
    </div>
  );
}
