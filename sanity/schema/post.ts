import { pageBuilderBlockRefs } from './blocks'

export const postSchema = {
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'title' }
      },
      {
        name: 'coverImage',
        title: 'Cover Image',
        type: 'image',
        options: { hotspot: true }
      },
      {
        name: 'excerpt',
        title: 'Short Description',
        type: 'text',
      },
      {
        name: 'body',
        title: 'Blog Content',
        type: 'array',
        of: [{ type: 'block' }, { type: 'image' }, ...pageBuilderBlockRefs]
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }]
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'author' }]
      },
      {
        name: 'publishedAt',
        title: 'Published Date',
        type: 'datetime',
      },
      {
        name: 'readTime',
        title: 'Read Time (mins)',
        type: 'number',
      },
      {
        name: 'featured',
        title: 'Featured Post',
        type: 'boolean',
      },
      {
        name: 'seoTitle',
        title: 'SEO Title',
        type: 'string',
      },
      {
        name: 'seoDescription',
        title: 'SEO Description',
        type: 'text',
      },
      {
        name: 'resources',
        title: 'Resources (download cards)',
        type: 'array',
        of: [{ type: 'downloadCard' }],
      },
      {
        name: 'relatedTricks',
        title: 'Interesting Tricks (pick up to 3)',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'interestingTrick' }] }],
        validation: (Rule: any) => Rule.max(3),
      },
      {
        name: 'relatedBlogs',
        title: 'Related Blogs (pick up to 3)',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'post' }] }],
        validation: (Rule: any) => Rule.max(3),
      }
    ]
  }