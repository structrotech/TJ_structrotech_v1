"use client";

import { cn } from "@/lib/utils";

interface FilterTabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export function FilterTabs({ tabs, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "px-5 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200",
            active === tab
              ? "bg-primary text-primary-foreground"
              : "border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
