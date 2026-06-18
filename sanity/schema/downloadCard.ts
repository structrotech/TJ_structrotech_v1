export const downloadCardSchema = {
  name: 'downloadCard',
  title: 'Download Card',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    {
      name: 'file',
      title: 'File (PDF / document)',
      type: 'file',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'file.asset.originalFilename' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title ?? 'Download Card',
        subtitle: subtitle ?? 'No file uploaded',
      }
    },
  },
}
