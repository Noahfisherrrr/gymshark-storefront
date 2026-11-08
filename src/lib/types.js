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
 *
 * @typedef {Object} BannerCta
 * @property {string} label
 * @property {string} href
 *
 * @typedef {Object} Banner
 * @property {string} slug
 * @property {string} title
 * @property {string|null} copy
 * @property {string|null} image
 * @property {string|null} video
 * @property {string|null} mobileVideo
 * @property {string|null} poster
 * @property {BannerCta[]} ctas
 * @property {BannerCta|null} cta
 */

export {}
