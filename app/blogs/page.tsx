"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { FilterTabs } from "@/components/FilterTabs";
import { posts, categories } from "@/lib/data";
import { searchPosts, filterPostsByCategory, sortPosts } from "@/lib/search";

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

  return (
    <div className="min-h-screen py-12 w-full">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-[clamp(28px,4vw,42px)] font-extrabold text-foreground mb-2">
            Blogs & Articles
          </h1>
          <p className="text-muted-foreground">
            Discover tutorials, guides, and insights from our experts
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <FilterTabs
            tabs={categoryTabs}
            active={activeCategory}
            onChange={setActiveCategory}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Blog Grid */}
        {visiblePosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePosts.map((post) => (
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 text-center"
          >
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
