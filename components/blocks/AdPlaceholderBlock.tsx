import { cn } from "@/lib/utils";

export interface AdPlaceholderValue {
  enabled?: boolean;
  position?: "top" | "middle" | "bottom" | "custom";
}

export function AdPlaceholderBlock({ value }: { value: AdPlaceholderValue }) {
  if (!value || value.enabled === false) return null;

  const position = value.position ?? "custom";
  const label = position.charAt(0).toUpperCase() + position.slice(1);

  return (
    <div className="w-full my-6 not-prose">
      <p className="text-xs text-muted-foreground text-center mb-2 uppercase tracking-wider">
        Advertisement
      </p>
      <div
        className={cn(
          "w-full rounded-lg border border-border bg-card/50 flex items-center justify-center",
          position === "middle" ? "h-[250px]" : "h-[90px]"
        )}
      >
        <p className="text-sm text-muted-foreground">Ad Space - {label}</p>
      </div>
    </div>
  );
}
