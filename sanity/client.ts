import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  // Read from the live API (not the cached CDN edge). The CDN can serve stale
  // results for recently created/published documents, which made some published
  // blogs/tricks 404 even though they exist. Next.js ISR (`revalidate`) still
  // caches these fetches, so performance is unaffected.
  useCdn: false,
  perspective: 'published',
  token: undefined,
})

const builder = imageUrlBuilder(client)

/** Valid Sanity upload refs look like image-{hash}-{W}x{H}-{ext} */
const VALID_SANITY_IMAGE_REF = /^image-[a-f0-9]+-\d+x\d+-[a-z0-9]+$/i

export function urlFor(source: any) {
  return builder.image(source)
}

/**
 * Resolve a Sanity image field (or URL string) to a usable src URL.
 * Handles malformed refs created when mock Unsplash URLs were seeded as fake asset _refs.
 */
export function resolveSanityImageUrl(
  source: unknown,
  fallback = "/placeholder.svg"
): string {
  if (!source) return fallback

  if (typeof source === "string") {
    return source.startsWith("http") ? source : fallback
  }

  if (typeof source === "object" && source !== null && "asset" in source) {
    const ref = (source as { asset?: { _ref?: string } }).asset?._ref ?? ""

    if (VALID_SANITY_IMAGE_REF.test(ref)) {
      try {
        return urlFor(source).url()
      } catch {
        return fallback
      }
    }

    // Seeded from lib/data.ts Unsplash URLs → fake ref "image-photo-1518...?w=800..."
    if (ref.startsWith("image-photo-")) {
      return `https://images.unsplash.com/${ref.slice("image-".length)}`
    }
  }

  return fallback
}