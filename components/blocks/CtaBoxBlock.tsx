import Link from "next/link";

export interface CtaBoxValue {
  enabled?: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function CtaBoxBlock({ value }: { value: CtaBoxValue }) {
  if (!value || value.enabled === false) return null;

  return (
    <div className="my-8 p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 text-center not-prose">
      {value.title ? (
        <h4 className="text-xl font-bold text-foreground mb-2">{value.title}</h4>
      ) : null}
      {value.description ? (
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          {value.description}
        </p>
      ) : null}
      {value.buttonLink ? (
        <Link
          href={value.buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors min-h-[44px]"
        >
          {value.buttonText ?? "Get Started"}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      ) : null}
    </div>
  );
}
