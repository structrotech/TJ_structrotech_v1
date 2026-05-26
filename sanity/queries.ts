import { groq } from 'next-sanity'

// Fetch all categories
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

// Fetch all posts
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
    }
  }
`

// Fetch single post by slug
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
    category-> {
      title,
      slug
    }
  }
`

// Fetch single category by slug
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

// Fetch posts by category
export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && category->slug.current == $slug] | order(publishedAt desc) {
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
    }
  }
`