import { useCallback, useEffect, useRef, useState } from 'react'

// Edge tracking + one-viewport paging for a horizontally scrolling track.
export function useCarouselPaging(items) {
  const trackRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setEdges({
      start: el.scrollLeft <= 1,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update, items])

  const page = useCallback((direction) => {
    const el = trackRef.current
    el.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' })
  }, [])

  return { trackRef, edges, update, page }
}
