"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ResourceCard } from "@/components/ResourceCard";
import { SearchField } from "@/components/SearchField";
import { FilterTabs } from "@/components/FilterTabs";
import { SortSelect } from "@/components/SortSelect";
import { resources } from "@/lib/data";
import { sortResources } from "@/lib/search";
import Fuse from "fuse.js";
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
import { fadeUpMountProps, listStaggerDelay } from "@/lib/motion";

const resourceTabs = ["All", "Roadmaps", "Cheatsheets", "Notes", "Guides", "Tools"];
const resourceSortOptions = ["A-Z", "Z-A", "By Type", "Downloads First"];
const MOBILE_CARD_LIMIT = 5;

const fuse = new Fuse(resources, {
  keys: ["title", "description", "type"],
  threshold: 0.3,
});

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("A-Z");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredResources = useMemo(() => {
    let result = resources;

    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery);
      result = searchResults.map((r) => r.item);
    }

    if (activeTab !== "All") {
      result = result.filter((resource) => resource.type === activeTab);
    }

    return sortResources(result, sortBy);
  }, [searchQuery, activeTab, sortBy]);

  const handleSortChange = (nextSort: string) => {
    setSortBy(nextSort);
    setVisibleCount(6);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setVisibleCount(6);
  };

  const visibleResources = filteredResources.slice(0, visibleCount);
  const hasMore = visibleCount < filteredResources.length;

  return (
    <div className={pageShell}>
      <div className={pageContainer}>
        <motion.div {...fadeUpMountProps(0)} className={pageHeaderBlock}>
          <h1 className={pageTitle}>Resources</h1>
          <p className={pageSubtitle}>Cheatsheets, Roadmaps, Guides and more</p>
        </motion.div>

        <motion.div {...fadeUpMountProps(0.1)} className={pageSearchRow}>
          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search resources..."
          />
        </motion.div>

        <motion.div {...fadeUpMountProps(0.2)} className={pageFiltersRow}>
          <FilterTabs
            tabs={resourceTabs}
            active={activeTab}
            onChange={handleTabChange}
          />
          <SortSelect
            value={sortBy}
            options={resourceSortOptions}
            onChange={handleSortChange}
            label="Sort resources"
          />
        </motion.div>

        {visibleResources.length > 0 ? (
          <div
            key={`${activeTab}-${sortBy}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleResources.map((resource, index) => (
              <div
                key={resource.slug}
                className={cn(index >= MOBILE_CARD_LIMIT && "hidden md:block")}
              >
                <ResourceCard
                  title={resource.title}
                  slug={resource.slug}
                  type={resource.type}
                  image={resource.image}
                  description={resource.description}
                  downloadUrl={resource.downloadUrl}
                  animationDelay={listStaggerDelay(index)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No resources found matching your criteria.
            </p>
          </div>
        )}

        {hasMore && (
          <motion.div className="mt-10 text-center">
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
