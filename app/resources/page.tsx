"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { ResourceCard } from "@/components/ResourceCard";
import { FilterTabs } from "@/components/FilterTabs";
import { SortSelect } from "@/components/SortSelect";
import { resources } from "@/lib/data";
import { sortResources } from "@/lib/search";
import Fuse from "fuse.js";
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

const fuse = new Fuse(resources, {
  keys: ["title", "description", "type"],
  threshold: 0.3,
});

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("A-Z");

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
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={pageShell}>
      <div className={pageContainer}>
        <motion.div {...fadeUpMountProps(0)} className={pageHeaderBlock}>
          <h1 className={pageTitle}>Resources</h1>
          <p className={pageSubtitle}>Cheatsheets, Roadmaps, Guides and more</p>
        </motion.div>

        <motion.div {...fadeUpMountProps(0.1)} className={pageSearchRow}>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
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

        {filteredResources.length > 0 ? (
          <div
            key={`${activeTab}-${sortBy}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResources.map((resource, index) => (
              <ResourceCard
                key={resource.slug}
                title={resource.title}
                slug={resource.slug}
                type={resource.type}
                image={resource.image}
                description={resource.description}
                downloadUrl={resource.downloadUrl}
                animationDelay={listStaggerDelay(index)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No resources found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
