"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { FilterTabs } from "@/components/FilterTabs";
import { SortSelect } from "@/components/SortSelect";
import { posts, categories } from "@/lib/data";
import { searchPosts, filterPostsByCategory, sortPosts } from "@/lib/search";
import { pageContainer } from "@/lib/layout";
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
    <div className="min-h-screen py-12 w-full">
      <div className={pageContainer}>
        {/* Header */}
        <motion.div {...fadeUpMountProps(0)} className="mb-8">
          <h1 className="text-[clamp(28px,4vw,42px)] font-extrabold text-foreground mb-2">
            Blogs & Articles
          </h1>
          <p className="text-muted-foreground">
            Discover tutorials, guides, and insights from our experts
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div {...fadeUpMountProps(0.1)} className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </motion.div>

        {/* Filters Row */}
        <motion.div
          {...fadeUpMountProps(0.2)}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
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

        {/* Blog Grid */}
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

        {/* Load More */}
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
