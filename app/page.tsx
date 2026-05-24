"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { FilterTabs } from "@/components/FilterTabs";
import { categories } from "@/lib/data";

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
      <section className="relative pt-32 pb-20 overflow-hidden w-full">
        {/* Dot Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[clamp(36px,5vw,64px)] font-extrabold leading-tight mb-4">
              <span className="text-foreground">Welcome to </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                StructroTech
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground font-normal mb-2"
          >
            Simple, Structured learning.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Learn AI, Cybersecurity, Linux, Networking, Web Development and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
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

      {/* Section Divider */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12" aria-hidden="true">
        <hr
          className="border-0 h-px w-full"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        />
      </div>

      {/* Categories Section */}
      <section className="py-16 w-full">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-[28px] font-bold text-foreground">Categories</h2>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <div className="mb-8">
            <FilterTabs
              tabs={categoryTabs}
              active={activeTab}
              onChange={setActiveTab}
            />
          </div>

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

          {/* Explore All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-10 text-center"
          >
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
