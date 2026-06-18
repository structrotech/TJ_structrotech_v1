import { Mail } from "lucide-react";

export interface NewsletterBoxValue {
  enabled?: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
}

export function NewsletterBoxBlock({ value }: { value: NewsletterBoxValue }) {
  if (!value || value.enabled === false) return null;

  return (
    <div className="my-8 p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm not-prose">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-foreground mb-1">
            {value.title ?? "Subscribe to our newsletter"}
          </h4>
          {value.description ? (
            <p className="text-sm text-muted-foreground mb-4">{value.description}</p>
          ) : null}
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg">
            {value.buttonText ?? "Subscribe"}
          </span>
        </div>
      </div>
    </div>
  );
}
