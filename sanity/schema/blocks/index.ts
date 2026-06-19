import { affiliateBoxBlock } from './affiliateBox'
import { sponsorBannerBlock } from './sponsorBanner'
import { downloadBoxBlock } from './downloadBox'

/**
 * In-body blocks an editor can insert anywhere in the article.
 * Scope is intentionally limited to Affiliate Box, Sponsor Banner and Download Box.
 * Ad placeholders are controlled per-article via the document-level `monetization` field.
 */
export const pageBuilderBlockSchemas = [
  affiliateBoxBlock,
  sponsorBannerBlock,
  downloadBoxBlock,
]

/** References spread into a Portable Text array's `of` to allow inserting blocks anywhere. */
export const pageBuilderBlockRefs = pageBuilderBlockSchemas.map((block) => ({
  type: block.name,
}))
