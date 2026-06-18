export const ctaBoxBlock = {
  name: 'ctaBox',
  title: 'CTA Box',
  type: 'object',
  fields: [
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Get Started' },
    { name: 'buttonLink', title: 'Button Link', type: 'url' },
  ],
  preview: {
    select: { title: 'title', enabled: 'enabled' },
    prepare({ title, enabled }: { title?: string; enabled?: boolean }) {
      return {
        title: title ? `CTA Box — ${title}` : 'CTA Box',
        subtitle: enabled === false ? 'Disabled' : 'Enabled',
      }
    },
  },
}
