import { createClient } from 'contentful'

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const deliveryToken = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN

// Pending: client-owned Contentful space (see docs/BACKEND_SUPABASE_STRATEGY.md
// §Phase 3). Banners fall back to the local config/home.js placeholders until
// a space + delivery token are supplied — see useBanner in pages/Home.jsx.
const client =
  spaceId && deliveryToken ? createClient({ space: spaceId, accessToken: deliveryToken }) : null

export const isContentfulConfigured = Boolean(client)

function assetUrl(field) {
  const url = field?.fields?.file?.url
  return url ? `https:${url}` : null
}

// Maps a "Banner" entry onto the exact prop shape Banner.jsx/BannerSlim.jsx
// already take (see src/config/home.js) — so a fetched entry can be spread
// onto either component with no translation at the call site.
function mapBanner(entry) {
  const f = entry.fields
  return {
    slug: f.slug,
    title: f.title,
    copy: f.copy ?? null,
    image: assetUrl(f.image),
    video: assetUrl(f.video),
    mobileVideo: assetUrl(f.mobileVideo),
    poster: assetUrl(f.poster),
    ctas: Array.isArray(f.ctas) ? f.ctas : [],
    cta: f.cta ?? null,
  }
}

export async function getBannerBySlug(slug) {
  if (!client) return null
  const res = await client.getEntries({ content_type: 'banner', 'fields.slug': slug, limit: 1 })
  const entry = res.items[0]
  return entry ? mapBanner(entry) : null
}
