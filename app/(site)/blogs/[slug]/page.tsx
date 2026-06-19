import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client, resolveSanityImageUrl } from "@/sanity/client";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/queries";
import { mapSanityAuthor } from "@/lib/sanity-mappers";
import { resolveBlogRelations } from "@/lib/related-content";
import { ArticleDetail } from "@/components/ArticleDetail";
import { InterestingTrickCard } from "@/components/InterestingTrickCard";
import { BlogCard } from "@/components/BlogCard";
import { DownloadCard } from "@/components/DownloadCard";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await client.fetch<{ slug?: string }[]>(POST_SLUGS_QUERY);
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: any = null;
  try {
    post = await client.fetch(POST_QUERY, { slug });
  } catch (err) {
    console.error("Sanity metadata fetch error on blog detail:", err);
  }
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.coverImage ? [resolveSanityImageUrl(post.coverImage)] : undefined,
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;

  let post: any = null;
  try {
    post = await client.fetch(POST_QUERY, { slug });
  } catch (err) {
    console.error("Sanity fetch error on blog detail:", err);
  }

  if (!post) {
    notFound();
  }

  const author = mapSanityAuthor(post.author ?? null);
  const coverImage = resolveSanityImageUrl(post.coverImage);
  const categoryTitle = post.category?.title ?? "";
  const categorySlug = post.category?.slug?.current ?? "";

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const { tricks, blogs: relatedBlogs } = await resolveBlogRelations(post, slug);

  const hasResources = Array.isArray(post.resources) && post.resources.length > 0;
  const resources: any[] = hasResources
    ? post.resources
    : [{ title: "Download this blog as PDF" }, { title: "Related download" }];

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
        {tricks.map((trick: any, index: number) => (
          <InterestingTrickCard
            key={trick.id}
            index={index + 1}
            question={trick.question}
            slug={trick.slug}
            blogSlug={trick.blogSlug}
            category={trick.category}
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
      title={post.title}
      category={
        categoryTitle
          ? { label: categoryTitle, href: categorySlug ? `/categories/${categorySlug}` : undefined }
          : null
      }
      author={author}
      formattedDate={formattedDate}
      readTime={post.readTime ?? 5}
      excerpt={post.excerpt}
      body={post.body}
      breadcrumb={{
        items: [
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
        ],
        current: post.title,
      }}
      resourcesContent={resourcesContent}
      tricksContent={tricksContent}
      relatedBlogsContent={relatedBlogsContent}
    />
  );
}
