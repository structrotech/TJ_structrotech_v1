import Fuse from "fuse.js";
import { posts } from "@/lib/data";
import type { Post } from "@/types/sanity";

const fuse = new Fuse(posts, {
  keys: ["title", "excerpt", "category"],
  threshold: 0.3,
  includeScore: true,
});

export function searchPosts(query: string): Post[] {
  if (!query.trim()) return posts;
  const results = fuse.search(query);
  return results.map((result) => result.item);
}

export function filterPostsByCategory(posts: Post[], category: string): Post[] {
  if (category === "All") return posts;
  return posts.filter((post) => post.category === category || post.categorySlug === category.toLowerCase());
}

export function sortPosts(posts: Post[], sortBy: string): Post[] {
  const sorted = [...posts];
  
  switch (sortBy) {
    case "Latest":
      return sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    case "Oldest":
      return sorted.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    case "A-Z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "Most Popular":
      return sorted; // Would need view count data
    case "Beginner Friendly":
      return sorted.sort((a, b) => a.readTime - b.readTime);
    default:
      return sorted;
  }
}
