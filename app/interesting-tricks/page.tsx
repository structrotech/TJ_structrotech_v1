import { client } from "@/sanity/client";
import { TRICKS_QUERY } from "@/sanity/queries";
import { mapSanityTrick } from "@/lib/sanity-mappers";
import InterestingTricksPageClient from "./InterestingTricksPageClient";

export const revalidate = 60;

export default async function InterestingTricksPage() {
  let initialTricks = [];
  try {
    const fetched = await client.fetch(TRICKS_QUERY);
    initialTricks = fetched.map(mapSanityTrick);
  } catch (err) {
    console.error("Sanity fetch error on interesting-tricks page:", err);
  }

  return <InterestingTricksPageClient initialTricks={initialTricks} />;
}
