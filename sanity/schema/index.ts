import { categorySchema } from './category'
import { postSchema } from './post'
import { authorSchema } from './author'
import { trickSchema } from './trick'
import { resourceSchema } from './resource'
import { downloadCardSchema } from './downloadCard'
import { pageBuilderBlockSchemas } from './blocks'

export const schemaTypes = [
  categorySchema,
  postSchema,
  authorSchema,
  trickSchema,
  resourceSchema,
  downloadCardSchema,
  ...pageBuilderBlockSchemas,
]