import Image from "next/image";
import Link from "next/link";

interface SponsorBannerProps {
  imageUrl?: string;
  link?: string;
}

export function SponsorBanner({ imageUrl, link }: SponsorBannerProps) {
  if (!imageUrl) {
    return (
      <div className="my-8 p-6 rounded-2xl border border-accent/30 bg-accent/5 backdrop-blur-sm">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          Sponsored
        </p>
        <div className="h-[120px] flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Sponsor Banner Placeholder</p>
        </div>
      </div>
    );
  }

  const content = (
    <div className="my-8 rounded-2xl overflow-hidden border border-accent/30">
      <p className="text-xs text-muted-foreground uppercase tracking-wider p-2 bg-accent/5 text-center">
        Sponsored
      </p>
      <div className="relative h-[120px]">
        <Image
          src={imageUrl}
          alt="Sponsor"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer sponsored">
        {content}
      </Link>
    );
  }

  return content;
}
