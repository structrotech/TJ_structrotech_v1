import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'structrotech',
  title: 'StructroTech',
  projectId: 'q4xdedds',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
})