import { client } from "@/sanity/client";
import { RESOURCES_QUERY } from "@/sanity/queries";
import { mapSanityResource } from "@/lib/sanity-mappers";
import ResourcesPageClient from "./ResourcesPageClient";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Download roadmaps, cheatsheets, notes, guides, and tools to accelerate your technology learning journey.",
};

export default async function ResourcesPage() {
  let initialResources = [];
  try {
    const fetched = await client.fetch(RESOURCES_QUERY);
    initialResources = fetched
      .filter((r: { slug?: { current?: string } }) => r.slug?.current)
      .map(mapSanityResource);
  } catch (err) {
    console.error("Sanity fetch error on resources page:", err);
  }

  return <ResourcesPageClient initialResources={initialResources} />;
}
