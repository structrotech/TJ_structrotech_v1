"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { ResourceCard } from "@/components/ResourceCard";
import { FilterTabs } from "@/components/FilterTabs";
import { resources } from "@/lib/data";
import Fuse from "fuse.js";

const resourceTabs = ["All", "Roadmaps", "Cheatsheets", "Notes", "Guides", "Tools"];

const fuse = new Fuse(resources, {
  keys: ["title", "description", "type"],
  threshold: 0.3,
});

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredResources = useMemo(() => {
    let result = resources;

    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery);
      result = searchResults.map((r) => r.item);
    }

    if (activeTab !== "All") {
      result = result.filter((resource) => resource.type === activeTab);
    }

    return result;
  }, [searchQuery, activeTab]);

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
            Resources
          </h1>
          <p className="text-muted-foreground">
            Cheatsheets, Roadmaps, Guides and more
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
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
        >
          <FilterTabs
            tabs={resourceTabs}
            active={activeTab}
            onChange={setActiveTab}
          />
        </motion.div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.slug}
                title={resource.title}
                slug={resource.slug}
                type={resource.type}
                image={resource.image}
                description={resource.description}
                downloadUrl={resource.downloadUrl}
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
