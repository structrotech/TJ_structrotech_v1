"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Heart, Bookmark, MessageSquare } from "lucide-react";
import { ShareMenu } from "@/components/ShareMenu";

const ICON =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary";

export function ArticleActions({ title }: { title: string }) {
  const pathname = usePathname();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(`liked:${pathname}`) === "1");
      setSaved(localStorage.getItem(`saved:${pathname}`) === "1");
    } catch {
      // localStorage may be unavailable; ignore.
    }
  }, [pathname]);

  function toggleLike() {
    setLiked((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(`liked:${pathname}`, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }

  function toggleSave() {
    setSaved((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(`saved:${pathname}`, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }

  return (
    <div className="my-12 rounded-2xl border border-border bg-card/50 p-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleLike}
            aria-pressed={liked}
            aria-label={liked ? "Unlike this article" : "Like this article"}
            title={liked ? "Liked" : "Like"}
            className={`${ICON} ${liked ? "border-primary/50 text-primary" : ""}`}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-primary text-primary" : ""}`} />
          </button>

          <button
            type="button"
            aria-label="Comment"
            title="Comment"
            className={ICON}
          >
            <MessageSquare className="h-4 w-4" />
          </button>

          <ShareMenu title={title} showLabel={false} align="left" triggerClassName={ICON} />
        </div>

        <button
          type="button"
          onClick={toggleSave}
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved" : "Save this article"}
          title={saved ? "Saved" : "Save"}
          className={`${ICON} ${saved ? "border-primary/50 text-primary" : ""}`}
        >
          <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>
    </div>
  );
}
