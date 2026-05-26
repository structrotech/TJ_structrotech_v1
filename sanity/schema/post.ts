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
        of: [{ type: 'block' }, { type: 'image' }]
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }]
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
      }
    ]
  }