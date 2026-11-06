// Strapi content fetch helper — see Strapi_CMS_Setup_Guide.md section 4.
// Separate from `api` (src/api/index.js): the CMS only owns editorial content
// (homepage blocks, product marketing copy/imagery); price, stock and variants
// stay authoritative in the commerce provider (mock/Supabase). Callers merge
// CMS fields over the commerce product rather than switching providers.
//
// Every function fails soft (returns null/[] and logs a warning) so a CMS
// outage or an unpublished entry never breaks the storefront — components
// keep using their existing hardcoded fallback (src/config/home.js etc).

const CMS_URL = import.meta.env.VITE_STRAPI_URL

function mediaUrl(media) {
  if (!media?.url) return null
  return media.url.startsWith('http') ? media.url : `${CMS_URL}${media.url}`
}

async function fetchCms(path) {
  if (!CMS_URL) return null
  try {
    const response = await fetch(`${CMS_URL}/api/${path}`)
    if (!response.ok) return null
    const { data } = await response.json()
    return data
  } catch (err) {
    console.warn(`CMS fetch failed for /${path}:`, err.message)
    return null
  }
}

function normalizeHero(hero) {
  if (!hero) return null
  const desktopImage = mediaUrl(hero.desktopImage)
  const isVideo = hero.desktopImage?.mime?.startsWith('video/')
  return {
    title: hero.heading,
    copy: hero.description,
    ...(isVideo
      ? { video: desktopImage, poster: mediaUrl(hero.mobileImage) }
      : { image: desktopImage }),
    ctas: hero.buttonLabel && hero.buttonUrl ? [{ label: hero.buttonLabel, href: hero.buttonUrl }] : [],
  }
}

// Returns { hero } (more blocks land here as the homepage migrates further),
// or null if the CMS has nothing published yet.
export async function getHomepage() {
  const homepage = await fetchCms('homepage?populate[hero][populate]=desktopImage,mobileImage')
  if (!homepage?.hero) return null
  return { hero: normalizeHero(homepage.hero) }
}

// Editorial content for one product, keyed by the commerce product id
// (Supabase's `productId`). Returns null if nothing is published for it.
export async function getProductContent(commerceProductId) {
  const products = await fetchCms(
    `products?filters[commerceProductId][$eq]=${encodeURIComponent(commerceProductId)}&populate=gallery`,
  )
  const entry = products?.[0]
  if (!entry) return null
  return {
    description: entry.description ?? null,
    gallery: (entry.gallery ?? []).map(mediaUrl).filter(Boolean),
  }
}
