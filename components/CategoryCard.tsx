"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  slug: string;
  image: string;
  badge: string;
  articleCount: number;
  description: string;
}

export function CategoryCard({
  title,
  slug,
  image,
  badge,
  articleCount,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/categories/${slug}`}>
        <div className="group relative h-[220px] rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          {/* Background Image */}
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,8,22,0.95) 0%, rgba(5,8,22,0.4) 50%, transparent 100%)",
            }}
          />

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-black/60 text-white rounded-full backdrop-blur-sm">
              {badge}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-base font-bold text-white mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground">
              {articleCount} articles
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
