// public/media and public/fonts aren't content-hashed by Vite (they're
// served as-is from /public), so a long Cache-Control (see vercel.json)
// would make an updated file stick around under its old bytes. The `?v=`
// query string busts that cache on deploy without renaming every file.
//
// Bump this whenever a file under public/media or public/fonts changes,
// and bump the matching hardcoded version in index.html and
// src/assets/fonts/fonts.css (those can't import this constant).
export const ASSET_VERSION = 'v1'

export const asset = (path) => `${path}?v=${ASSET_VERSION}`
