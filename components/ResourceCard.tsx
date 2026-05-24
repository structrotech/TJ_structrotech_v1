"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { fadeUpInViewProps } from "@/lib/motion";

interface ResourceCardProps {
  title: string;
  slug: string;
  type: string;
  image: string;
  description: string;
  downloadUrl?: string;
  animationDelay?: number;
}

export function ResourceCard({
  title,
  slug,
  type,
  image,
  description,
  downloadUrl,
  animationDelay = 0,
}: ResourceCardProps) {
  return (
    <motion.div {...fadeUpInViewProps(animationDelay)}>
      <Link href={`/resources/${slug}`}>
        <article className="group rounded-2xl overflow-hidden border border-border bg-card backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          {/* Cover Image */}
          <div className="relative h-[160px] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Type Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-medium bg-accent/80 text-accent-foreground rounded-full backdrop-blur-sm">
                {type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-base font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {description}
            </p>

            {/* Download Button */}
            {downloadUrl && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(downloadUrl, "_blank");
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
