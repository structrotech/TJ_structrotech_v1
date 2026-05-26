export interface InterestingTrick {
  id: string;
  question: string;
  blogSlug: string;
  category: string;
  featuredOnHome: boolean;
  homeOrder: number;
  publishedAt: string;
  popular?: boolean;
}
