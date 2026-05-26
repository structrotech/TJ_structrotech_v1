"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Lightbulb } from "lucide-react";
import { fadeUpInViewProps } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface InterestingTrickCardProps {
  question: string;
  blogSlug: string;
  category: string;
  animationDelay?: number;
  className?: string;
}

export function InterestingTrickCard({
  question,
  blogSlug,
  category,
  animationDelay = 0,
  className,
}: InterestingTrickCardProps) {
  return (
    <motion.div {...fadeUpInViewProps(animationDelay)} className={cn("h-full", className)}>
      <Link
        href={`/blogs/${blogSlug}`}
        className="group flex h-full min-h-[120px] flex-col justify-between rounded-2xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary/45 hover:bg-card hover:shadow-md hover:ring-2 hover:ring-primary/15"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lightbulb className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {category}
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <p className="text-left text-[15px] font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
            {question}
          </p>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.div>
  );
}
