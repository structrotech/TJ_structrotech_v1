import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { posts } from "@/lib/data";
import { AdBanner } from "@/components/AdBanner";
import { AffiliateBox } from "@/components/AffiliateBox";
import { SponsorBanner } from "@/components/SponsorBanner";
import { DownloadSection } from "@/components/DownloadSection";
import { BlogCard } from "@/components/BlogCard";
import { pageContainer } from "@/lib/layout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts
    .filter((p) => p.categorySlug === post.categorySlug && p.slug !== post.slug)
    .slice(0, 3);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen py-12 w-full">
      <div className={pageContainer}>
        <div className="max-w-4xl mx-auto w-full">
        {/* Top Ad */}
        <AdBanner position="top" />

        {/* Cover Image */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`/categories/${post.categorySlug}`}
              className="px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded-full hover:bg-primary/30 transition-colors"
            >
              {post.category}
            </Link>
          </div>
          <h1 className="text-[clamp(24px,4vw,36px)] font-extrabold text-foreground mb-4 text-balance">
            {post.title}
          </h1>
          <div className="flex items-center gap-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-foreground">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {formattedDate} · {post.readTime} min read
              </p>
            </div>
          </div>
        </header>

        {/* Blog Content */}
        <article className="prose prose-invert max-w-none mb-8">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <p className="text-foreground leading-relaxed mb-6">
            {post.body}
          </p>
          <p className="text-foreground leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Getting Started</h2>
          <p className="text-foreground leading-relaxed mb-6">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </article>

        {/* Affiliate Box */}
        <AffiliateBox
          title="Master This Topic with Our Course"
          description="Get hands-on experience with our comprehensive video course covering all the concepts discussed in this article."
          link="https://example.com/course"
        />

        {/* Middle Ad */}
        <AdBanner position="middle" />

        {/* Download Section */}
        <DownloadSection
          pdfUrl="/downloads/article.pdf"
          title="Download This Article"
        />

        {/* Sponsor Banner */}
        <SponsorBanner />

        {/* Bottom Ad */}
        <AdBanner position="bottom" />

        {/* Comments Placeholder */}
        <div className="my-12 p-8 rounded-2xl border border-border bg-card/50 text-center">
          <p className="text-muted-foreground">Comments coming soon</p>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.slug}
                  title={relatedPost.title}
                  slug={relatedPost.slug}
                  coverImage={relatedPost.coverImage}
                  author={relatedPost.author}
                  publishedAt={relatedPost.publishedAt}
                  readTime={relatedPost.readTime}
                  excerpt={relatedPost.excerpt}
                  category={relatedPost.category}
                />
              ))}
            </div>
          </section>
        )}

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mt-12 pt-8 border-t border-border">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/blogs" className="hover:text-foreground transition-colors">
            Blogs
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
        </nav>
        </div>
      </div>
    </div>
  );
}
