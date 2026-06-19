"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryCard } from "@/components/CategoryCard";
import { FilterTabs } from "@/components/FilterTabs";
import { cn } from "@/lib/utils";
import type { CategoryListItem } from "@/lib/sanity-mappers";
import {
  pageContainer,
  pageShell,
  pageHeaderBlock,
  pageTitle,
  pageSubtitle,
  pageControlsRow,
} from "@/lib/layout";
import { fadeUpMountProps, listStaggerDelay } from "@/lib/motion";

const categoryTabs = ["All", "Tech", "AI", "Cybersecurity", "Cloud", "DevOps"];
const MOBILE_CARD_LIMIT = 5;
const INITIAL_VISIBLE = 12;

export default function CategoriesPageClient({
  categories,
}: {
  categories: CategoryListItem[];
}) {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredCategories = categories.filter((cat) => {
    if (activeTab === "All") return true;
    return cat.tag === activeTab || cat.badge === activeTab;
  });

  const visibleCategories = filteredCategories.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCategories.length;

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    setVisibleCount(INITIAL_VISIBLE);
  }

  return (
    <div className={pageShell}>
      <div className={pageContainer}>
        <motion.div {...fadeUpMountProps(0)} className={pageHeaderBlock}>
          <h1 className={pageTitle}>All Categories</h1>
          <p className={pageSubtitle}>
            Explore our comprehensive collection of learning resources
          </p>
        </motion.div>

        <motion.div {...fadeUpMountProps(0.1)} className={pageControlsRow}>
          <FilterTabs
            tabs={categoryTabs}
            active={activeTab}
            onChange={handleTabChange}
            align="center"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
          {visibleCategories.map((category, index) => (
            <div
              key={category._id}
              className={cn(index >= MOBILE_CARD_LIMIT && "hidden sm:block")}
            >
              <CategoryCard
                title={category.title}
                slug={category.slug}
                image={category.image}
                badge={category.badge}
                articleCount={category.articleCount}
                description={category.description}
                animationDelay={listStaggerDelay(index)}
              />
            </div>
          ))}
        </div>

        {hasMore && (
          <motion.div {...fadeUpMountProps(0)} className="mt-10 w-full text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore More
              <span aria-hidden="true">&rarr;</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
