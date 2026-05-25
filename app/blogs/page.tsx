"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/BlogCard";
import { SearchField } from "@/components/SearchField";
import { FilterTabs } from "@/components/FilterTabs";
import { SortSelect } from "@/components/SortSelect";
import { posts, categories } from "@/lib/data";
import { searchPosts, filterPostsByCategory, sortPosts } from "@/lib/search";
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

const categoryTabs = ["All", ...categories.slice(0, 5).map((c) => c.title)];
const sortOptions = ["Latest", "Oldest", "Most Popular", "Beginner Friendly", "A-Z"];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPosts = useMemo(() => {
    let result = searchPosts(searchQuery);
    result = filterPostsByCategory(result, activeCategory);
    result = sortPosts(result, sortBy);
    return result;
  }, [searchQuery, activeCategory, sortBy]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleSortChange = (nextSort: string) => {
    setSortBy(nextSort);
    setVisibleCount(6);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(6);
  };

  return (
    <div className={pageShell}>
      <div className={pageContainer}>
        <motion.div {...fadeUpMountProps(0)} className={pageHeaderBlock}>
          <h1 className={pageTitle}>Blogs & Articles</h1>
          <p className={pageSubtitle}>
            Discover tutorials, guides, and insights from our experts
          </p>
        </motion.div>

        <motion.div {...fadeUpMountProps(0.1)} className={pageSearchRow}>
          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search articles..."
          />
        </motion.div>

        <motion.div {...fadeUpMountProps(0.2)} className={pageFiltersRow}>
          <FilterTabs
            tabs={categoryTabs}
            active={activeCategory}
            onChange={handleCategoryChange}
          />
          <SortSelect
            value={sortBy}
            options={sortOptions}
            onChange={handleSortChange}
            label="Sort articles"
          />
        </motion.div>

        {visiblePosts.length > 0 ? (
          <div
            key={`${activeCategory}-${sortBy}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visiblePosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                slug={post.slug}
                coverImage={post.coverImage}
                author={post.author}
                publishedAt={post.publishedAt}
                readTime={post.readTime}
                excerpt={post.excerpt}
                category={post.category}
                animationDelay={listStaggerDelay(index)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No articles found matching your criteria.
            </p>
          </div>
        )}

        {hasMore && (
          <motion.div {...fadeUpInViewProps(0)} className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-3 bg-card border border-border text-foreground font-medium rounded-full hover:border-primary/50 transition-colors min-h-[44px]"
            >
              Load More
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
