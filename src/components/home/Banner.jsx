import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PauseIcon, PlayIcon } from '../header/icons'
import './home.css'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// gymshark.com's "Standard" banner: full-bleed media (2:3 on mobile, 8:3
// from tablet up), a bottom gradient, copy + underline CTAs bottom-left,
// and a pause control when the media is a video.
//
// `priority` marks the above-the-fold hero: its video is allowed to start
// loading immediately. Every other instance waits until it's actually
// near the viewport before fetching any video bytes, so off-screen banners
// don't compete with the initial page load (a top Lighthouse TBT offender
// here was both homepage videos downloading on mount regardless of
// scroll position).
export default function Banner({
  title,
  copy,
  ctas = [],
  video,
  poster,
  image,
  headingLevel = 'h2',
  priority = false,
}) {
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const [paused, setPaused] = useState(prefersReducedMotion)
  const [nearViewport, setNearViewport] = useState(priority)
  const Heading = headingLevel

  useEffect(() => {
    if (nearViewport || !video) return
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNearViewport(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearViewport(true)
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [nearViewport, video])

  useEffect(() => {
    const el = videoRef.current
    if (!el || !nearViewport) return
    if (paused) el.pause()
    else el.play().catch(() => setPaused(true))
  }, [paused, nearViewport])

  return (
    <section
      ref={sectionRef}
      className="relative flex aspect-[2/3] w-full items-end overflow-hidden bg-ink md:aspect-[8/3]"
    >
      <div className="absolute inset-0">
        {video ? (
          <video
            ref={videoRef}
            src={nearViewport ? video : undefined}
            poster={poster}
            muted
            loop
            playsInline
            preload={priority ? 'metadata' : 'none'}
            fetchPriority={priority ? 'high' : 'low'}
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          image && (
            <img
              src={image}
              alt=""
              aria-hidden="true"
              fetchPriority={priority ? 'high' : undefined}
              loading={priority ? 'eager' : 'lazy'}
              className="h-full w-full object-cover"
            />
          )
        )}
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-ink opacity-80" />
      </div>

      <div className="relative z-[1] mx-auto flex w-full max-w-[3080px] flex-col gap-4 px-4 pb-4 lg:p-10">
        <div className="flex max-w-[400px] flex-col text-white">
          <Heading className="font-display text-[clamp(32px,26.4px+1.5vw,48px)] font-extrabold uppercase leading-[0.9] tracking-[-0.01em]">
            {title}
          </Heading>
          {copy && <p className="mt-2 text-[14px] leading-[1.4]">{copy}</p>}
        </div>
        {ctas.length > 0 && (
          <div className="flex gap-4">
            {ctas.map((cta) => (
              <Link
                key={cta.href}
                to={cta.href}
                className="gs-underline-cta flex min-h-8 items-center whitespace-nowrap text-[14px] leading-[1.4] capitalize text-white"
              >
                {cta.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {video && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={`${paused ? 'Play' : 'Pause'} ${title} video`}
          className="absolute bottom-2.5 right-2.5 z-[5] flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20 md:bottom-4 md:right-4"
        >
          {paused ? <PlayIcon size={20} /> : <PauseIcon size={20} />}
        </button>
      )}
    </section>
  )
}
