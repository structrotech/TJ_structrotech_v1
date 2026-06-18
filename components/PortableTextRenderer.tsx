import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { resolveSanityImageUrl } from "@/sanity/client";
import { AdPlaceholderBlock } from "@/components/blocks/AdPlaceholderBlock";
import { AffiliateBoxBlock } from "@/components/blocks/AffiliateBoxBlock";
import { SponsorBannerBlock } from "@/components/blocks/SponsorBannerBlock";
import { DownloadBoxBlock } from "@/components/blocks/DownloadBoxBlock";
import { NewsletterBoxBlock } from "@/components/blocks/NewsletterBoxBlock";
import { CtaBoxBlock } from "@/components/blocks/CtaBoxBlock";

const components: PortableTextComponents = {
  types: {
    // Preserves the existing inline-image rendering behavior unchanged.
    image: ({ value }: { value: any }) => (
      <Image
        src={resolveSanityImageUrl(value)}
        alt={value?.alt || ""}
        width={1200}
        height={675}
        className="rounded-xl my-6 w-full h-auto"
      />
    ),
    adPlaceholder: ({ value }: { value: any }) => <AdPlaceholderBlock value={value} />,
    affiliateBox: ({ value }: { value: any }) => <AffiliateBoxBlock value={value} />,
    sponsorBanner: ({ value }: { value: any }) => <SponsorBannerBlock value={value} />,
    downloadBox: ({ value }: { value: any }) => <DownloadBoxBlock value={value} />,
    newsletterBox: ({ value }: { value: any }) => <NewsletterBoxBlock value={value} />,
    ctaBox: ({ value }: { value: any }) => <CtaBoxBlock value={value} />,
  },
};

/**
 * Reusable Portable Text renderer with Page Builder block support.
 * Renders nothing when there is no content, so existing behavior is preserved.
 */
export function PortableTextRenderer({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
