"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { FilterTabs } from "@/components/FilterTabs";
import { categories } from "@/lib/data";
import { pageContainer } from "@/lib/layout";
import {
  fadeUpInViewProps,
  fadeUpMountProps,
  listStaggerDelay,
} from "@/lib/motion";

const categoryTabs = ["All", "Tech", "AI", "Cybersecurity", "Cloud", "DevOps"];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredCategories = categories.filter((cat) => {
    if (activeTab === "All") return true;
    return cat.tag === activeTab || cat.badge === activeTab;
  });

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative pt-44 pb-20 overflow-hidden w-full">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div
          className={`relative ${pageContainer} flex flex-col items-center justify-center text-center`}
        >
          <motion.div {...fadeUpMountProps(0)} className="w-full">
            <h1 className="font-serif w-full text-center text-[clamp(40px,5vw,72px)] font-semibold leading-[1.1] tracking-normal text-foreground mb-5">
              Welcome to{" "}
              <span className="text-primary">StructroTech</span>
            </h1>
          </motion.div>

          <motion.p
            {...fadeUpMountProps(0.1)}
            className="w-full text-center text-[17px] md:text-[18px] font-light text-muted-foreground mb-3 max-w-[500px] mx-auto leading-relaxed"
          >
            Simple, structured learning.
          </motion.p>

          <motion.p
            {...fadeUpMountProps(0.2)}
            className="w-full text-center text-[17px] md:text-[18px] font-light text-muted-foreground mb-8 max-w-[500px] mx-auto leading-relaxed"
          >
            Learn AI, Cybersecurity, Linux, Networking, Web Development and more.
          </motion.p>

          <motion.div
            {...fadeUpMountProps(0.3)}
            className="w-full flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/categories"
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors min-h-[44px] flex items-center"
            >
              Explore Categories
            </Link>
            <Link
              href="/blogs"
              className="px-6 py-3 border border-border text-foreground font-medium rounded-full hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
            >
              Browse Blogs
            </Link>
          </motion.div>
        </div>
      </section>

      <div className={pageContainer} aria-hidden="true">
        <hr
          className="border-0 h-px w-full"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        />
      </div>

      {/* Categories Section */}
      <section className="py-16 w-full">
        <div className={pageContainer}>
          <motion.div {...fadeUpInViewProps(0)} className="mb-8 w-full">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary rounded-full shrink-0" />
              <h2 className="text-[28px] font-bold text-foreground">Categories</h2>
            </div>
          </motion.div>

          <div className="mb-8 w-full">
            <FilterTabs
              tabs={categoryTabs}
              active={activeTab}
              onChange={setActiveTab}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 w-full">
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

          <motion.div {...fadeUpInViewProps(0)} className="mt-10 w-full text-center">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-colors min-h-[44px]"
            >
              Explore All Categories
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
