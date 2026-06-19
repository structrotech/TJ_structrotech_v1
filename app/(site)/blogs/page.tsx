import { client } from "@/sanity/client";
import { POSTS_QUERY } from "@/sanity/queries";
import { mapSanityPostForCard } from "@/lib/sanity-mappers";
import BlogsPageClient from "./BlogsPageClient";

export const revalidate = 60;

export default async function BlogsPage() {
  let initialPosts = [];
  try {
    const fetched = await client.fetch(POSTS_QUERY);
    initialPosts = fetched
      .filter((post: { slug?: { current?: string } }) => post.slug?.current)
      .map(mapSanityPostForCard);
  } catch (err) {
    console.error("Sanity fetch error on blogs page:", err);
  }

  return <BlogsPageClient initialPosts={initialPosts} />;
}
