import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { categories, posts } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryPosts = posts.filter((post) => post.categorySlug === slug);

  return (
    <div className="min-h-screen py-12 w-full">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/categories" className="hover:text-foreground transition-colors">
            Categories
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{category.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded-full">
              {category.badge}
            </span>
            <span className="text-sm text-muted-foreground">
              {category.articleCount} articles
            </span>
          </div>
          <h1 className="text-[clamp(28px,4vw,42px)] font-extrabold text-foreground mb-2">
            {category.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {category.description}
          </p>
        </div>

        {/* Posts Grid */}
        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                slug={post.slug}
                coverImage={post.coverImage}
                author={post.author}
                publishedAt={post.publishedAt}
                readTime={post.readTime}
                excerpt={post.excerpt}
                category={post.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No articles in this category yet.
            </p>
            <Link
              href="/blogs"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
            >
              Browse All Blogs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
