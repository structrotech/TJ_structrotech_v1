import tricksData from "@/content/interesting-tricks.json";
import type { InterestingTrick } from "@/types/interesting-trick";

export const interestingTricks = tricksData as InterestingTrick[];

export const trickCategories = [
  "All",
  ...Array.from(new Set(interestingTricks.map((t) => t.category))).sort(),
];

export function getHomeInterestingTricks(limit = 8): InterestingTrick[] {
  return interestingTricks
    .filter((t) => t.featuredOnHome)
    .sort((a, b) => a.homeOrder - b.homeOrder)
    .slice(0, limit);
}

export function sortInterestingTricks(tricks: InterestingTrick[], sortBy: string): InterestingTrick[] {
  const sorted = [...tricks];

  switch (sortBy) {
    case "Oldest":
      return sorted.sort(
        (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    case "A-Z":
      return sorted.sort((a, b) => a.question.localeCompare(b.question));
    case "Most Popular":
      return sorted.sort((a, b) => {
        if (Boolean(a.popular) !== Boolean(b.popular)) {
          return a.popular ? -1 : 1;
        }
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
    case "Latest":
    default:
      return sorted.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  }
}
