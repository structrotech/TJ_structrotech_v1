export const authorSchema = {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'name' }
      },
      {
        name: 'avatar',
        title: 'Profile Picture',
        type: 'image',
        options: { hotspot: true }
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'text',
      }
    ]
  }