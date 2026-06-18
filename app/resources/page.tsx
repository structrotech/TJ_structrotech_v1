import { client } from "@/sanity/client";
import { RESOURCES_QUERY } from "@/sanity/queries";
import { mapSanityResource } from "@/lib/sanity-mappers";
import ResourcesPageClient from "./ResourcesPageClient";

export const revalidate = 60;

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
