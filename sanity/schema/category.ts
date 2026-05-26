export const categorySchema = {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Category Name',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'title' }
      },
      {
        name: 'image',
        title: 'Cover Image',
        type: 'image',
        options: { hotspot: true }
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'articleCount',
        title: 'Article Count',
        type: 'number',
      },
      {
        name: 'tag',
        title: 'Tag',
        type: 'string',
        options: {
          list: ['Tech','AI','Cybersecurity','Cloud','DevOps','Web']
        }
      }
    ]
  }