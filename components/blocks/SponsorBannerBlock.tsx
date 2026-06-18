import Image from "next/image";
import Link from "next/link";
import { resolveSanityImageUrl } from "@/sanity/client";

export interface SponsorBannerValue {
  enabled?: boolean;
  brandName?: string;
  tagline?: string;
  logo?: unknown;
  buttonText?: string;
  url?: string;
}

export function SponsorBannerBlock({ value }: { value: SponsorBannerValue }) {
  if (!value || value.enabled === false) return null;

  const logoUrl = value.logo ? resolveSanityImageUrl(value.logo) : null;

  const inner = (
    <div className="my-8 rounded-2xl overflow-hidden border border-accent/30 bg-accent/5 backdrop-blur-sm not-prose">
      <p className="text-xs text-muted-foreground uppercase tracking-wider p-2 text-center">
        Sponsored
      </p>
      <div className="flex items-center gap-4 p-5">
        {logoUrl ? (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-card">
            <Image
              src={logoUrl}
              alt={value.brandName ?? "Sponsor"}
              fill
              className="object-contain p-1"
            />
          </div>
        ) : null}

        <div className="flex-1">
          {value.brandName ? (
            <h4 className="text-base font-bold text-foreground">{value.brandName}</h4>
          ) : null}
          {value.tagline ? (
            <p className="text-sm text-muted-foreground">{value.tagline}</p>
          ) : null}
        </div>

        {value.url ? (
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-foreground text-sm font-medium rounded-lg">
            {value.buttonText ?? "Visit"}
          </span>
        ) : null}
      </div>
    </div>
  );

  if (value.url) {
    return (
      <Link href={value.url} target="_blank" rel="noopener noreferrer sponsored">
        {inner}
      </Link>
    );
  }

  return inner;
}
