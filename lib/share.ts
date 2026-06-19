/**
 * Client-side share helpers. URLs are resolved against the current origin so
 * sharing works in any environment without relying on a build-time domain.
 */

export type ShareTarget = {
  name: string;
  href: string;
};

export function getAbsoluteUrl(pathOrUrl: string): string {
  if (typeof window === "undefined") return pathOrUrl;
  try {
    return new URL(pathOrUrl, window.location.origin).href;
  } catch {
    return pathOrUrl;
  }
}

export function getShareTargets(url: string, title: string): ShareTarget[] {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return [
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}` },
    { name: "Email", href: `mailto:?subject=${t}&body=${u}` },
  ];
}

/**
 * Try the native share sheet (mobile/PWA); fall back to copying the link.
 * Returns the outcome so callers can show feedback.
 */
export async function nativeShareOrCopy(
  pathOrUrl: string,
  title: string
): Promise<"shared" | "copied" | "dismissed" | "error"> {
  const url = getAbsoluteUrl(pathOrUrl);

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title, url });
      return "shared";
    } catch {
      // User cancelled or share failed; nothing else to do.
      return "dismissed";
    }
  }

  return copyToClipboard(url);
}

export async function copyToClipboard(
  text: string
): Promise<"copied" | "error"> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return "copied";
    }
  } catch {
    // fall through to legacy approach
  }

  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    return "copied";
  } catch {
    return "error";
  }
}
