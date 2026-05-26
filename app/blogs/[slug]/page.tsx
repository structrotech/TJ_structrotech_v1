import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { posts } from "@/lib/data";
import { getHomeInterestingTricks } from "@/lib/interesting-tricks";
import { AdBanner } from "@/components/AdBanner";
import { AffiliateBox } from "@/components/AffiliateBox";
import { SponsorBanner } from "@/components/SponsorBanner";
import { InterestingTrickCard } from "@/components/InterestingTrickCard";
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

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const interestingQuestions = getHomeInterestingTricks(6);
  const downloadBlogUrl = post.pdfDownload ?? "/downloads/article.pdf";
  const downloadSheetsUrl =
    post.pdfDownload?.replace(/\.pdf$/i, "-sheets.pdf") ?? "/downloads/sheets.pdf";

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

        {/* Sponsor Banner */}
        <SponsorBanner />

        {/* Bottom Ad */}
        <AdBanner position="bottom" />

        {/* Comments Placeholder */}
        <div className="my-12 p-8 rounded-2xl border border-border bg-card/50 text-center">
          <p className="text-muted-foreground">Comments coming soon</p>
        </div>

        {/* Interesting Questions */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Interesting Questions
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {interestingQuestions.map((trick, index) => (
              <InterestingTrickCard
                key={trick.id}
                index={index + 1}
                question={trick.question}
                blogSlug={trick.blogSlug}
                category={trick.category}
                size="sm"
              />
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Resources</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href={downloadBlogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-card/60 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:ring-2 hover:ring-primary/15"
            >
              <p className="text-sm font-semibold text-foreground">Download Blog</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Get a PDF version of this article.
              </p>
              <p className="mt-4 text-sm font-medium text-primary">Download →</p>
            </a>

            <a
              href={downloadSheetsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-card/60 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:ring-2 hover:ring-primary/15"
            >
              <p className="text-sm font-semibold text-foreground">Download Sheets</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Cheatsheet / quick reference for this topic.
              </p>
              <p className="mt-4 text-sm font-medium text-primary">Download →</p>
            </a>
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/resources"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore all resources
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

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
