/**
 * Inline image used inside Portable Text bodies (blogs + tricks).
 * Extends the built-in `image` type with optional size + alignment controls
 * that the PortableTextRenderer applies automatically. Existing images
 * (without these fields) keep rendering full-width as before.
 */
export const bodyImage = {
  type: 'image',
  options: { hotspot: true },
  fields: [
    { name: 'alt', title: 'Alt text', type: 'string' },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Full width', value: 'full' },
          { title: 'Large', value: 'large' },
          { title: 'Medium', value: 'medium' },
          { title: 'Small', value: 'small' },
        ],
        layout: 'radio',
      },
      initialValue: 'full',
    },
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    },
  ],
}
