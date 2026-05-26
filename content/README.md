# Content (CMS)

Edit these JSON files to update site content without changing React code.

## Interesting Tricks — `interesting-tricks.json`

Each entry:

| Field | Description |
|-------|-------------|
| `id` | Unique ID (kebab-case) |
| `question` | Card title shown on the site |
| `blogSlug` | Slug of the linked blog post under `/blogs/[slug]` |
| `category` | Filter pill category (e.g. Productivity, Mobile, PC) |
| `featuredOnHome` | `true` to show on homepage (max 8 recommended) |
| `homeOrder` | Sort order on homepage (lower = first) |
| `publishedAt` | ISO date for sorting |
| `popular` | Optional; used by "Most Popular" sort |

After adding a trick, create a matching blog post in `lib/data.ts` with the same `slug` as `blogSlug`.

When you connect Sanity or another CMS later, replace `lib/interesting-tricks.ts` fetch logic with your API client; keep the same `InterestingTrick` type.
