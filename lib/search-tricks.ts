import Fuse from "fuse.js";
import { interestingTricks } from "@/lib/interesting-tricks";
import type { InterestingTrick } from "@/types/interesting-trick";

const fuse = new Fuse(interestingTricks, {
  keys: ["question", "category"],
  threshold: 0.35,
});

export function searchInterestingTricks(query: string): InterestingTrick[] {
  if (!query.trim()) return interestingTricks;
  return fuse.search(query).map((result) => result.item);
}

export function filterTricksByCategory(tricks: InterestingTrick[], category: string): InterestingTrick[] {
  if (category === "All") return tricks;
  return tricks.filter((t) => t.category === category);
}
