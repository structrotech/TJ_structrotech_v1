import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client, resolveSanityImageUrl } from "@/sanity/client";
import { TRICK_QUERY, TRICK_SLUGS_QUERY } from "@/sanity/queries";
import { mapSanityAuthor } from "@/lib/sanity-mappers";
import { resolveTrickRelations } from "@/lib/related-content";
import { ArticleDetail } from "@/components/ArticleDetail";
import { InterestingTrickCard } from "@/components/InterestingTrickCard";
import { BlogCard } from "@/components/BlogCard";
import { DownloadCard } from "@/components/DownloadCard";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tricks = await client.fetch<{ slug?: string }[]>(TRICK_SLUGS_QUERY);
  return tricks.filter((t) => t.slug).map((t) => ({ slug: t.slug! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let trick: any = null;
  try {
    trick = await client.fetch(TRICK_QUERY, { slug });
  } catch (err) {
    console.error("Sanity metadata fetch error on trick detail:", err);
  }
  if (!trick) return {};

  const title = trick.seoTitle || trick.question;
  const description = trick.seoDescription || trick.excerpt || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: trick.coverImage ? [resolveSanityImageUrl(trick.coverImage)] : undefined,
    },
  };
}

export default async function SingleTrickPage({ params }: PageProps) {
  const { slug } = await params;

  let trick: any = null;
  try {
    trick = await client.fetch(TRICK_QUERY, { slug });
  } catch (err) {
    console.error("Sanity fetch error on trick detail:", err);
  }

  if (!trick) {
    notFound();
  }

  const author = mapSanityAuthor(trick.author ?? null);
  const coverImage = resolveSanityImageUrl(trick.coverImage);
  const category = trick.category ?? "";

  const formattedDate = trick.publishedAt
    ? new Date(trick.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const { tricks, blogs: relatedBlogs } = await resolveTrickRelations(trick, slug);

  const hasResources = Array.isArray(trick.resources) && trick.resources.length > 0;
  const resources: any[] = hasResources
    ? trick.resources
    : [{ title: "Download this trick as PDF" }, { title: "Related download" }];

  const resourcesContent =
    resources.length > 0 ? (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {resources.map((r, i) => (
          <DownloadCard
            key={i}
            title={r.title ?? "Download"}
            description={r.description}
            fileUrl={r.fileUrl}
            fileExt={r.fileExt}
          />
        ))}
      </div>
    ) : null;

  const tricksContent =
    tricks.length > 0 ? (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tricks.map((t: any, index: number) => (
          <InterestingTrickCard
            key={t.id}
            index={index + 1}
            question={t.question}
            slug={t.slug}
            blogSlug={t.blogSlug}
            category={t.category}
            size="sm"
          />
        ))}
      </div>
    ) : null;

  const relatedBlogsContent =
    relatedBlogs.length > 0 ? (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatedBlogs.map((blog: any) => (
          <BlogCard
            key={blog.slug}
            title={blog.title}
            slug={blog.slug}
            coverImage={blog.coverImage}
            author={blog.author}
            publishedAt={blog.publishedAt}
            readTime={blog.readTime}
            excerpt={blog.excerpt}
            category={blog.category}
          />
        ))}
      </div>
    ) : null;

  return (
    <ArticleDetail
      coverImage={coverImage}
      title={trick.question}
      category={category ? { label: category } : null}
      author={author}
      formattedDate={formattedDate}
      readTime={trick.readTime ?? 5}
      excerpt={trick.excerpt}
      body={trick.body}
      breadcrumb={{
        items: [
          { label: "Home", href: "/" },
          { label: "Interesting Tricks", href: "/interesting-tricks" },
        ],
        current: trick.question,
      }}
      resourcesContent={resourcesContent}
      tricksContent={tricksContent}
      relatedBlogsContent={relatedBlogsContent}
    />
  );
}
