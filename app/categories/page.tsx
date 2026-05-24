"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryCard } from "@/components/CategoryCard";
import { FilterTabs } from "@/components/FilterTabs";
import { categories } from "@/lib/data";
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

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredCategories = categories.filter((cat) => {
    if (activeTab === "All") return true;
    return cat.tag === activeTab || cat.badge === activeTab;
  });

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
            onChange={setActiveTab}
            align="center"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
          {filteredCategories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              title={category.title}
              slug={category.slug}
              image={category.image}
              badge={category.badge}
              articleCount={category.articleCount}
              description={category.description}
              animationDelay={listStaggerDelay(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
