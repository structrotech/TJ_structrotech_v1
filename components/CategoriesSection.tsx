"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { pageContainer } from "@/lib/layout";
import {
  fadeUpInViewProps,
} from "@/lib/motion";
import { CategoriesList } from '@/components/CategoriesList'

interface CategoriesSectionProps {
  categories: any[];
  categoryTabs: string[];
}

export function CategoriesSection({ categories, categoryTabs }: CategoriesSectionProps) {
  return (
    <section className="py-16 w-full">
      <div className={pageContainer}>
        <motion.div {...fadeUpInViewProps(0)} className="mb-8 w-full">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-[28px] font-bold text-foreground">Categories</h2>
          </div>
        </motion.div>

        <CategoriesList categories={categories} categoryTabs={categoryTabs} />

        <motion.div {...fadeUpInViewProps(0)} className="mt-10 w-full text-center">
          <Link
            href="/categories"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Explore More
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
