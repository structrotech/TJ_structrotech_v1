import { client } from "@/sanity/client";
import { CATEGORIES_QUERY } from "@/sanity/queries";
import { mapSanityCategory } from "@/lib/sanity-mappers";
import CategoriesPageClient from "./CategoriesPageClient";

export const revalidate = 60;

export default async function CategoriesPage() {
  let categories = [];
  try {
    const fetched = await client.fetch(CATEGORIES_QUERY);
    categories = fetched.map(mapSanityCategory);
  } catch (err) {
    console.error("Sanity fetch error on categories page:", err);
  }

  return <CategoriesPageClient categories={categories} />;
}
