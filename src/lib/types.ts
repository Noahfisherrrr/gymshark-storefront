/**
 * Contentful-backed types. Proposed "Banner" content type (not yet created
 * in Contentful — see docs/BACKEND_SUPABASE_STRATEGY.md §Phase 3):
 *
 *   slug        Short text, unique  — e.g. "home-hero", "home-video-banner"
 *   title       Short text
 *   copy        Text, optional
 *   image       Media, optional
 *   video       Media, optional
 *   mobileVideo Media, optional
 *   poster      Media, optional
 *   ctas        JSON object, optional — array of { label, href }, for Banner
 *   cta         JSON object, optional — single { label, href }, for BannerSlim
 */

export interface BannerCta {
  label: string
  href: string
}

export interface Banner {
  slug: string
  title: string
  copy: string | null
  image: string | null
  video: string | null
  mobileVideo: string | null
  poster: string | null
  ctas: BannerCta[]
  cta: BannerCta | null
}
