"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { InterestingTrickCard } from "@/components/InterestingTrickCard";
import { SearchField } from "@/components/SearchField";
import { FilterTabs } from "@/components/FilterTabs";
import { SortSelect } from "@/components/SortSelect";
import { sortInterestingTricks, trickCategories } from "@/lib/interesting-tricks";
import { filterTricksByCategory, searchInterestingTricks } from "@/lib/search-tricks";
import { cn } from "@/lib/utils";
import {
  pageContainer,
  pageShell,
  pageHeaderBlock,
  pageTitle,
  pageSubtitle,
  pageSearchRow,
  pageFiltersRow,
} from "@/lib/layout";
import { fadeUpMountProps, fadeUpInViewProps, listStaggerDelay } from "@/lib/motion";

const sortOptions = ["Latest", "Oldest", "Most Popular", "A-Z"];
const INITIAL_VISIBLE = 8;
const MOBILE_CARD_LIMIT = 5;

export default function InterestingTricksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredTricks = useMemo(() => {
    let result = searchInterestingTricks(searchQuery);
    result = filterTricksByCategory(result, activeCategory);
    result = sortInterestingTricks(result, sortBy);
    return result;
  }, [searchQuery, activeCategory, sortBy]);

  const visibleTricks = filteredTricks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTricks.length;

  const handleSortChange = (nextSort: string) => {
    setSortBy(nextSort);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  };

  return (
    <div className={pageShell}>
      <div className={pageContainer}>
        <motion.div {...fadeUpMountProps(0)} className={pageHeaderBlock}>
          <h1 className={pageTitle}>Interesting Tricks</h1>
          <p className={pageSubtitle}>
            Practical how-tos for mobile, PC, productivity, and more — each opens the full blog guide.
          </p>
        </motion.div>

        <motion.div {...fadeUpMountProps(0.1)} className={pageSearchRow}>
          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tricks..."
          />
        </motion.div>

        <motion.div {...fadeUpMountProps(0.2)} className={pageFiltersRow}>
          <FilterTabs
            tabs={trickCategories}
            active={activeCategory}
            onChange={handleCategoryChange}
          />
          <SortSelect
            value={sortBy}
            options={sortOptions}
            onChange={handleSortChange}
            label="Sort tricks"
          />
        </motion.div>

        {visibleTricks.length > 0 ? (
          <div
            key={`${activeCategory}-${sortBy}-${searchQuery}`}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visibleTricks.map((trick, index) => (
              <div
                key={trick.id}
                className={cn(index >= MOBILE_CARD_LIMIT && "hidden sm:block")}
              >
                <InterestingTrickCard
                  index={index + 1}
                  question={trick.question}
                  blogSlug={trick.blogSlug}
                  category={trick.category}
                  animationDelay={listStaggerDelay(index)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No tricks found matching your criteria.</p>
          </div>
        )}

        {hasMore && (
          <motion.div {...fadeUpInViewProps(0)} className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="min-h-[44px] rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:border-primary/50"
            >
              Explore More
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
