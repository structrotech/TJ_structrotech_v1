"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  Share2,
  Link2,
  Check,
  Mail,
  Send,
  Twitter,
  Linkedin,
  Facebook,
  MessageCircle,
} from "lucide-react";
import {
  getAbsoluteUrl,
  getShareTargets,
  copyToClipboard,
  nativeShareOrCopy,
} from "@/lib/share";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  WhatsApp: MessageCircle,
  X: Twitter,
  LinkedIn: Linkedin,
  Facebook: Facebook,
  Telegram: Send,
  Email: Mail,
};

interface ShareMenuProps {
  title: string;
  /** Relative path or absolute URL. Defaults to the current page. */
  url?: string;
  triggerClassName?: string;
  align?: "left" | "right" | "center";
  /** Show the "Share" text next to the icon. Defaults to true. */
  showLabel?: boolean;
}

export function ShareMenu({
  title,
  url,
  triggerClassName,
  align = "center",
  showLabel = true,
}: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const resolvedUrl = getAbsoluteUrl(url ?? (typeof window !== "undefined" ? window.location.href : "/"));
  const targets = getShareTargets(resolvedUrl, title);

  async function handleTrigger() {
    // On devices with a native share sheet (mostly mobile), prefer it.
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      const result = await nativeShareOrCopy(resolvedUrl, title);
      if (result === "shared" || result === "dismissed") return;
    }
    setOpen((prev) => !prev);
  }

  async function handleCopy() {
    const result = await copyToClipboard(resolvedUrl);
    if (result === "copied") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const menuPosition =
    align === "right"
      ? "right-0"
      : align === "left"
        ? "left-0"
        : "left-1/2 -translate-x-1/2";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleTrigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Share"
        className={
          triggerClassName ??
          "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        }
      >
        <Share2 className="h-4 w-4" />
        {showLabel && <span>Share</span>}
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg ${menuPosition}`}
        >
          {targets.map((target) => {
            const Icon = ICONS[target.name] ?? Share2;
            const isMail = target.href.startsWith("mailto:");
            return (
              <a
                key={target.name}
                href={target.href}
                {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
                {target.name}
              </a>
            );
          })}

          <button
            type="button"
            onClick={handleCopy}
            role="menuitem"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            {copied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}
            {copied ? "Link copied" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
}
