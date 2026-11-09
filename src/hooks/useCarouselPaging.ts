import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'

export interface CarouselEdges {
  start: boolean
  end: boolean
}

export interface UseCarouselPagingResult<T extends HTMLElement = HTMLElement> {
  trackRef: RefObject<T | null>
  edges: CarouselEdges
  update: () => void
  page: (direction: number) => void
}

// Edge tracking + one-viewport paging for a horizontally scrolling track.
export function useCarouselPaging<T extends HTMLElement = HTMLElement>(items: unknown[]): UseCarouselPagingResult<T> {
  const trackRef = useRef<T | null>(null)
  const [edges, setEdges] = useState<CarouselEdges>({ start: true, end: true })

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

  const page = useCallback((direction: number) => {
    const el = trackRef.current
    el?.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' })
  }, [])

  return { trackRef, edges, update, page }
}
