export const downloadBoxBlock = {
  name: 'downloadBox',
  title: 'Download Box',
  type: 'object',
  fields: [
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'fileUrl', title: 'File URL', type: 'url' },
    { name: 'fileType', title: 'File Type', type: 'string' },
  ],
  preview: {
    select: { title: 'title', enabled: 'enabled' },
    prepare({ title, enabled }: { title?: string; enabled?: boolean }) {
      return {
        title: title ? `Download Box — ${title}` : 'Download Box',
        subtitle: enabled === false ? 'Disabled' : 'Enabled',
      }
    },
  },
}
