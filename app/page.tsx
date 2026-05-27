import { InterestingTricksSection } from "@/components/InterestingTricksSection";
import { pageContainer } from "@/lib/layout";
import { client } from '@/sanity/client'
import { CATEGORIES_QUERY } from '@/sanity/queries'
import { HeroSection } from '@/components/HeroSection'
import { CategoriesSection } from '@/components/CategoriesSection'

const categoryTabs = ["All", "Tech", "AI", "Cybersecurity", "Cloud", "DevOps"];

export default async function Home() {
  const categories = await client.fetch(CATEGORIES_QUERY);

  return (
    <div className="min-h-screen w-full">
      <HeroSection />

      <div className={pageContainer} aria-hidden="true">
        <hr
          className="border-0 h-px w-full"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        />
      </div>

      <CategoriesSection categories={categories} categoryTabs={categoryTabs} />

      <InterestingTricksSection />
    </div>
  );
}
