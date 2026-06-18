export const adPlaceholderBlock = {
  name: 'adPlaceholder',
  title: 'Ad Placeholder',
  type: 'object',
  fields: [
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Middle', value: 'middle' },
          { title: 'Bottom', value: 'bottom' },
          { title: 'Custom', value: 'custom' },
        ],
        layout: 'radio',
      },
      initialValue: 'custom',
    },
  ],
  preview: {
    select: { position: 'position', enabled: 'enabled' },
    prepare({ position, enabled }: { position?: string; enabled?: boolean }) {
      return {
        title: `Ad Placeholder (${position ?? 'custom'})`,
        subtitle: enabled === false ? 'Disabled' : 'Enabled',
      }
    },
  },
}
