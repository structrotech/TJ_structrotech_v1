import { adPlaceholderBlock } from './adPlaceholder'
import { affiliateBoxBlock } from './affiliateBox'
import { sponsorBannerBlock } from './sponsorBanner'
import { downloadBoxBlock } from './downloadBox'
import { newsletterBoxBlock } from './newsletterBox'
import { ctaBoxBlock } from './ctaBox'

/** Object schemas registered as Studio types so they can be inserted into Portable Text. */
export const pageBuilderBlockSchemas = [
  adPlaceholderBlock,
  affiliateBoxBlock,
  sponsorBannerBlock,
  downloadBoxBlock,
  newsletterBoxBlock,
  ctaBoxBlock,
]

/** References spread into a Portable Text array's `of` to allow inserting blocks anywhere. */
export const pageBuilderBlockRefs = pageBuilderBlockSchemas.map((block) => ({
  type: block.name,
}))
