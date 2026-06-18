"use client";

import { useState } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { FilterTabs } from "@/components/FilterTabs";
import { cn } from "@/lib/utils";
import { listStaggerDelay } from "@/lib/motion";
import { resolveSanityImageUrl } from "@/sanity/client";

interface CategoriesListProps {
  categories: any[];
  categoryTabs: string[];
  maxItems?: number;
}

export function CategoriesList({ categories, categoryTabs, maxItems }: CategoriesListProps) {
  const [activeTab, setActiveTab] = useState("All");

  const filteredCategories = categories.filter((cat) => {
    if (activeTab === "All") return true;
    return cat.tag === activeTab;
  });

  const visibleCategories =
    typeof maxItems === "number" ? filteredCategories.slice(0, maxItems) : filteredCategories;

  return (
    <>
      <div className="mb-8 w-full">
        <FilterTabs
          tabs={categoryTabs}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="mt-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibleCategories.map((category: any, index: number) => (
          <div
            key={category._id}
            className={cn(index >= 4 && "hidden sm:block")}
          >
            <CategoryCard
              title={category.title}
              slug={category.slug.current}
              image={resolveSanityImageUrl(category.image)}
              badge={category.tag}
              articleCount={category.articleCount}
              description={category.description}
              animationDelay={listStaggerDelay(index)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
