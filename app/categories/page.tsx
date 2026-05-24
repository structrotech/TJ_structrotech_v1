"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryCard } from "@/components/CategoryCard";
import { FilterTabs } from "@/components/FilterTabs";
import { categories } from "@/lib/data";
import { pageContainer } from "@/lib/layout";
import { fadeUpMountProps, listStaggerDelay } from "@/lib/motion";

const categoryTabs = ["All", "Tech", "AI", "Cybersecurity", "Cloud", "DevOps"];

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredCategories = categories.filter((cat) => {
    if (activeTab === "All") return true;
    return cat.tag === activeTab || cat.badge === activeTab;
  });

  return (
    <div className="min-h-screen py-12 w-full">
      <div className={pageContainer}>
        <motion.div {...fadeUpMountProps(0)} className="mb-8">
          <h1 className="text-[clamp(28px,4vw,42px)] font-extrabold text-foreground mb-2">
            All Categories
          </h1>
          <p className="text-muted-foreground">
            Explore our comprehensive collection of learning resources
          </p>
        </motion.div>

        <motion.div {...fadeUpMountProps(0.1)} className="mb-8 w-full">
          <FilterTabs
            tabs={categoryTabs}
            active={activeTab}
            onChange={setActiveTab}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
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
