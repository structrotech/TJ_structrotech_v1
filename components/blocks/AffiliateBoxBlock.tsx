import Image from "next/image";
import Link from "next/link";
import { resolveSanityImageUrl } from "@/sanity/client";

export interface AffiliateBoxValue {
  enabled?: boolean;
  productName?: string;
  description?: string;
  image?: unknown;
  buttonText?: string;
  url?: string;
  badge?: string;
}

export function AffiliateBoxBlock({ value }: { value: AffiliateBoxValue }) {
  if (!value || value.enabled === false) return null;

  const imageUrl = value.image ? resolveSanityImageUrl(value.image) : null;

  return (
    <div className="my-8 p-6 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm not-prose">
      <div className="flex items-center justify-between gap-3 mb-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Recommended Resource
        </p>
        {value.badge ? (
          <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-primary/20 text-primary">
            {value.badge}
          </span>
        ) : null}
      </div>

      <div className="flex items-start gap-4">
        {imageUrl ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border">
            <Image
              src={imageUrl}
              alt={value.productName ?? "Affiliate product"}
              fill
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="flex-1">
          {value.productName ? (
            <h4 className="text-lg font-bold text-foreground mb-2">{value.productName}</h4>
          ) : null}
          {value.description ? (
            <p className="text-sm text-muted-foreground mb-4">{value.description}</p>
          ) : null}
          {value.url ? (
            <Link
              href={value.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              {value.buttonText ?? "Learn More"}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
