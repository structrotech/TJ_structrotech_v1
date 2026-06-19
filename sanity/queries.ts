import { groq } from 'next-sanity'

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(_createdAt asc) {
    _id,
    title,
    slug,
    image,
    description,
    articleCount,
    tag
  }
`

export const POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    coverImage,
    excerpt,
    publishedAt,
    readTime,
    featured,
    category-> {
      title,
      slug
    },
    author-> {
      name,
      slug,
      avatar,
      bio
    }
  }
`

export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    coverImage,
    excerpt,
    body,
    publishedAt,
    readTime,
    featured,
    seoTitle,
    seoDescription,
    category-> {
      title,
      slug
    },
    author-> {
      name,
      slug,
      avatar,
      bio
    },
    resources[]{
      title,
      description,
      "fileUrl": file.asset->url,
      "fileExt": file.asset->extension
    },
    relatedTricks[]->{
      _id,
      question,
      slug,
      category,
      linkedPost->{ slug }
    },
    relatedBlogs[]->{
      _id,
      title,
      slug,
      coverImage,
      excerpt,
      publishedAt,
      readTime,
      category-> { title, slug },
      author-> { name, slug, avatar, bio }
    }
  }
`

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`

export const CATEGORY_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    image,
    description,
    articleCount,
    tag
  }
`

export const CATEGORY_SLUGS_QUERY = groq`
  *[_type == "category" && defined(slug.current)]{
    "slug": slug.current
  }
`

export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && category->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    coverImage,
    excerpt,
    publishedAt,
    readTime,
    featured,
    category-> {
      title,
      slug
    },
    author-> {
      name,
      slug,
      avatar,
      bio
    }
  }
`

export const TRICKS_QUERY = groq`
  *[_type == "interestingTrick"] | order(publishedAt desc) {
    _id,
    question,
    slug,
    category,
    featuredOnHome,
    homeOrder,
    popular,
    publishedAt,
    readTime,
    linkedPost->{
      slug
    }
  }
`

export const FEATURED_TRICKS_QUERY = groq`
  *[_type == "interestingTrick" && featuredOnHome == true] | order(homeOrder asc) {
    _id,
    question,
    slug,
    category,
    popular,
    publishedAt,
    readTime,
    linkedPost->{
      slug
    }
  }
`

export const TRICKS_BY_BLOG_QUERY = groq`
  *[_type == "interestingTrick" && linkedPost->slug.current == $slug][0...5] {
    _id,
    question,
    slug,
    category,
    linkedPost->{
      slug
    }
  }
`

export const TRICK_QUERY = groq`
  *[_type == "interestingTrick" && slug.current == $slug][0] {
    _id,
    question,
    slug,
    coverImage,
    excerpt,
    body,
    category,
    publishedAt,
    readTime,
    seoTitle,
    seoDescription,
    author-> {
      name,
      slug,
      avatar,
      bio
    },
    resources[]{
      title,
      description,
      "fileUrl": file.asset->url,
      "fileExt": file.asset->extension
    },
    relatedTricks[]->{
      _id,
      question,
      slug,
      category,
      linkedPost->{ slug }
    },
    relatedBlogs[]->{
      _id,
      title,
      slug,
      coverImage,
      excerpt,
      publishedAt,
      readTime,
      category-> { title, slug },
      author-> { name, slug, avatar, bio }
    }
  }
`

export const TRICK_SLUGS_QUERY = groq`
  *[_type == "interestingTrick" && defined(slug.current)]{
    "slug": slug.current
  }
`

export const RECENT_TRICKS_QUERY = groq`
  *[_type == "interestingTrick" && defined(slug.current) && slug.current != $excludeSlug] | order(publishedAt desc)[0...3] {
    _id,
    question,
    slug,
    category,
    linkedPost->{ slug }
  }
`

export const RECENT_BLOGS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && slug.current != $excludeSlug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    coverImage,
    excerpt,
    publishedAt,
    readTime,
    category-> { title, slug },
    author-> { name, slug, avatar, bio }
  }
`

export const RELATED_BLOGS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && category->title == $category && slug.current != $excludeSlug] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    coverImage,
    excerpt,
    publishedAt,
    readTime,
    category-> {
      title,
      slug
    },
    author-> {
      name,
      slug,
      avatar,
      bio
    }
  }
`

export const RESOURCES_QUERY = groq`
  *[_type == "resource"] | order(title asc) {
    _id,
    title,
    slug,
    type,
    image,
    description,
    downloadUrl
  }
`
