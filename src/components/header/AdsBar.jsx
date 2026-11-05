import { useEffect, useState } from 'react'
import { PauseIcon, PlayIcon } from './icons'

const SLIDE_HEIGHT = 48
const INTERVAL_MS = 6000
const TRANSITION_MS = 500

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Ads bar over the header: revolving promo messages (gymshark.com's USP
// banner). Currently switched off via SHOW_ADS_BAR in config/navigation.js.
export default function AdsBar({ messages }) {
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(prefersReducedMotion)

  useEffect(() => {
    if (paused || messages.length < 2) return
    const id = setInterval(() => {
      setAnimate(true)
      setIndex((i) => i + 1)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused, messages.length])

  // The track ends with a clone of the first message; once we land on it,
  // jump back to the real first slide without a transition so the loop is seamless.
  function handleTransitionEnd() {
    if (index === messages.length) {
      setAnimate(false)
      setIndex(0)
    }
  }

  const slides = [...messages, messages[0]]

  return (
    <div
      className="relative flex h-12 w-full items-center justify-center bg-surface-subtle"
      aria-label="Unique selling points carousel"
      role="region"
    >
      <div className="h-12 w-full overflow-hidden lg:mx-auto lg:w-3/5" aria-live="off">
        <ul
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateY(-${index * SLIDE_HEIGHT}px)`,
            transition: animate ? `transform ${TRANSITION_MS}ms ease-out` : 'none',
          }}
        >
          {slides.map((message, i) => (
            <li
              key={i}
              aria-hidden={i !== index % messages.length || i === messages.length}
              className="flex h-12 items-center justify-center px-10 text-center text-[12px] leading-[1.3] text-ink"
            >
              <span className="truncate">{message}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute right-0 mr-2 flex h-8 w-8 items-center justify-center text-ink lg:mr-4 min-[1223px]:mr-[47px]"
      >
        {paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
        <span className="sr-only">{paused ? 'Play slide rotation' : 'Pause slide rotation'}</span>
      </button>
    </div>
  )
}
