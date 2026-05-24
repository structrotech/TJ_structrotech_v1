import { cn } from "@/lib/utils";

interface AdBannerProps {
  position: "top" | "middle" | "bottom";
}

export function AdBanner({ position }: AdBannerProps) {
  return (
    <div className="w-full my-6">
      <p className="text-xs text-muted-foreground text-center mb-2 uppercase tracking-wider">
        Advertisement
      </p>
      <div
        className={cn(
          "w-full rounded-lg border border-border bg-card/50 flex items-center justify-center",
          position === "middle" ? "h-[250px]" : "h-[90px]"
        )}
      >
        <p className="text-sm text-muted-foreground">
          Ad Space - {position.charAt(0).toUpperCase() + position.slice(1)}
        </p>
      </div>
    </div>
  );
}
