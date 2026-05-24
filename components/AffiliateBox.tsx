import Link from "next/link";

interface AffiliateBoxProps {
  title: string;
  description: string;
  link: string;
}

export function AffiliateBox({ title, description, link }: AffiliateBoxProps) {
  return (
    <div className="my-8 p-6 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm">
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Recommended Resource
      </p>
      <h4 className="text-lg font-bold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
      >
        Learn More
      </Link>
    </div>
  );
}
