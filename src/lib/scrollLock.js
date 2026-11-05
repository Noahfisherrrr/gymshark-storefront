import { useEffect } from 'react'

// Reference-counted so stacked overlays (mobile menu → search, search →
// mini bag) can't unlock the page out from under each other. Pads the body
// by the scrollbar width, as gymshark.com does, so content doesn't jump.
let locks = 0

function lockBodyScroll() {
  if (locks++ === 0) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbar}px`
  }
  return () => {
    if (--locks === 0) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }
}

export function useBodyScrollLock(active) {
  useEffect(() => (active ? lockBodyScroll() : undefined), [active])
}
