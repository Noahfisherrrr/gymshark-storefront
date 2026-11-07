import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router doesn't reset scroll position on navigation, so clicking a
// link while scrolled down (e.g. the footer's FAQ CTA) would otherwise land
// on the new page at the old scroll offset instead of the top. Skipped when
// a hash is present so in-page anchor links (e.g. /help#returns) can still
// scroll to their target instead of the top.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
