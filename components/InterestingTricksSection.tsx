"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { InterestingTrickCard } from "@/components/InterestingTrickCard";
import { getHomeInterestingTricks } from "@/lib/interesting-tricks";
import { pageContainer } from "@/lib/layout";
import { fadeUpInViewProps, listStaggerDelay } from "@/lib/motion";

export function InterestingTricksSection() {
  const tricks = getHomeInterestingTricks(8);

  return (
    <section className="w-full border-t border-border/60 py-16">
      <div className={pageContainer}>
        <motion.div {...fadeUpInViewProps(0)} className="mb-8 w-full">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 shrink-0 rounded-full bg-primary" />
            <h2 className="text-[28px] font-bold text-foreground">Interesting Tricks</h2>
          </div>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Quick, practical answers to everyday tech problems — each trick links to a full guide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tricks.map((trick, index) => (
            <InterestingTrickCard
              key={trick.id}
              question={trick.question}
              blogSlug={trick.blogSlug}
              category={trick.category}
              animationDelay={listStaggerDelay(index)}
            />
          ))}
        </div>

        <motion.div {...fadeUpInViewProps(0)} className="mt-10 w-full text-center">
          <Link
            href="/interesting-tricks"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Explore Interesting Tricks
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
