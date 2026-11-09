import { createClient, EntryFieldTypes, type Asset, type Entry, type EntrySkeletonType, type UnresolvedLink } from 'contentful'
import type { Banner } from './types'

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const deliveryToken = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN

// Pending: client-owned Contentful space (see docs/BACKEND_SUPABASE_STRATEGY.md
// §Phase 3). Banners fall back to the local config/home.js placeholders until
// a space + delivery token are supplied — see useBanner in pages/Home.jsx.
const client =
  spaceId && deliveryToken ? createClient({ space: spaceId, accessToken: deliveryToken }) : null

export const isContentfulConfigured: boolean = Boolean(client)

type AssetField = Asset | UnresolvedLink<'Asset'> | undefined

function isResolvedAsset(field: AssetField): field is Asset {
  return Boolean(field && 'fields' in field)
}

function assetUrl(field: AssetField): string | null {
  if (!isResolvedAsset(field)) return null
  const url = field.fields?.file?.url
  return url ? `https:${url}` : null
}

interface BannerFields {
  slug: EntryFieldTypes.Symbol
  title: EntryFieldTypes.Symbol
  copy?: EntryFieldTypes.Text
  image?: EntryFieldTypes.AssetLink
  video?: EntryFieldTypes.AssetLink
  mobileVideo?: EntryFieldTypes.AssetLink
  poster?: EntryFieldTypes.AssetLink
  ctas?: EntryFieldTypes.Object
  cta?: EntryFieldTypes.Object
}

type BannerEntrySkeleton = EntrySkeletonType<BannerFields, 'banner'>

// Maps a "Banner" entry onto the exact prop shape Banner.jsx/BannerSlim.jsx
// already take (see src/config/home.js) — so a fetched entry can be spread
// onto either component with no translation at the call site.
function mapBanner(entry: Entry<BannerEntrySkeleton, undefined>): Banner {
  const f = entry.fields
  return {
    slug: f.slug,
    title: f.title,
    copy: f.copy ?? null,
    image: assetUrl(f.image),
    video: assetUrl(f.video),
    mobileVideo: assetUrl(f.mobileVideo),
    poster: assetUrl(f.poster),
    ctas: Array.isArray(f.ctas) ? (f.ctas as unknown as Banner['ctas']) : [],
    cta: (f.cta as unknown as Banner['cta']) ?? null,
  }
}

export async function getBannerBySlug(slug: string): Promise<Banner | null> {
  if (!client) return null
  const res = await client.getEntries<BannerEntrySkeleton>({
    content_type: 'banner',
    'fields.slug': slug,
    limit: 1,
  })
  const entry = res.items[0]
  return entry ? mapBanner(entry) : null
}
