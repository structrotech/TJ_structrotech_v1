"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryCard } from "@/components/CategoryCard";
import { FilterTabs } from "@/components/FilterTabs";
import { categories } from "@/lib/data";

const categoryTabs = ["All", "Tech", "AI", "Cybersecurity", "Cloud", "DevOps"];

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredCategories = categories.filter((cat) => {
    if (activeTab === "All") return true;
    return cat.tag === activeTab || cat.badge === activeTab;
  });

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
            All Categories
          </h1>
          <p className="text-muted-foreground">
            Explore our comprehensive collection of learning resources
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <FilterTabs
            tabs={categoryTabs}
            active={activeTab}
            onChange={setActiveTab}
          />
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <CategoryCard
                title={category.title}
                slug={category.slug}
                image={category.image}
                badge={category.badge}
                articleCount={category.articleCount}
                description={category.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
