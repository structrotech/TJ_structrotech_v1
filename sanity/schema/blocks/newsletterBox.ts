export const newsletterBoxBlock = {
  name: 'newsletterBox',
  title: 'Newsletter Box',
  type: 'object',
  fields: [
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Subscribe' },
  ],
  preview: {
    select: { title: 'title', enabled: 'enabled' },
    prepare({ title, enabled }: { title?: string; enabled?: boolean }) {
      return {
        title: title ? `Newsletter Box — ${title}` : 'Newsletter Box',
        subtitle: enabled === false ? 'Disabled' : 'Enabled',
      }
    },
  },
}
