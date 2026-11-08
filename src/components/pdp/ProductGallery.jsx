import { useState, useRef, useEffect } from 'react'
import { ZoomIcon, PlayIcon, PauseIcon, VolumeIcon, ShareIcon } from './pdpIcons'
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon, HeartFilledIcon } from '../header/icons'
import { useWishlist } from '../../context/WishlistContext'

export default function ProductGallery({ product, onShare }) {
  const { isWishlisted, toggle } = useWishlist()
  const saved = isWishlisted(product.id)

  const items = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [{ type: 'image', url: product.image, fallback: product.image, alt: product.name }]

  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxZoomed, setLightboxZoomed] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(true)
  const [videoMuted, setVideoMuted] = useState(true)
  const mobileScrollRef = useRef(null)
  const videoRef = useRef(null)

  // Track active slide on mobile scroll
  function handleMobileScroll(e) {
    const el = e.currentTarget
    const index = Math.round(el.scrollLeft / el.clientWidth)
    if (index !== activeIndex && index >= 0 && index < items.length) {
      setActiveIndex(index)
    }
  }

  function scrollMobileTo(idx) {
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTo({
        left: idx * mobileScrollRef.current.clientWidth,
        behavior: 'smooth',
      })
    }
    setActiveIndex(idx)
  }

  function toggleVideo() {
    if (!videoRef.current) return
    if (videoPlaying) {
      videoRef.current.pause()
      setVideoPlaying(false)
    } else {
      videoRef.current.play()
      setVideoPlaying(true)
    }
  }

  function toggleMute() {
    if (!videoRef.current) return
    videoRef.current.muted = !videoMuted
    setVideoMuted(!videoMuted)
  }

  // Key navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') setActiveIndex((prev) => (prev + 1) % items.length)
      if (e.key === 'ArrowLeft') setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, items.length])

  return (
    <div className="relative w-full">
      {/* ----------------- MOBILE CAROUSEL (< 1024px) ----------------- */}
      <div className="relative lg:hidden">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex w-full snap-x snap-mandatory overflow-x-auto scrollbar-none"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/5] w-full shrink-0 snap-center bg-surface-subtle"
            >
              {item.type === 'video' ? (
                <div className="relative h-full w-full bg-black">
                  <video
                    ref={videoRef}
                    src={item.src}
                    poster={item.poster}
                    autoPlay
                    loop
                    muted={videoMuted}
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleVideo}
                      aria-label={videoPlaying ? 'Pause video' : 'Play video'}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm"
                    >
                      {videoPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={videoMuted ? 'Unmute video' : 'Mute video'}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm"
                    >
                      <VolumeIcon size={16} muted={videoMuted} />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx)
                    setLightboxOpen(true)
                  }}
                  className="h-full w-full cursor-zoom-in text-left"
                >
                  <img
                    src={item.url || item.fallback}
                    alt={item.alt || product.name}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      if (item.fallback && e.currentTarget.src !== item.fallback) {
                        e.currentTarget.src = item.fallback
                      }
                    }}
                    className="h-full w-full object-cover"
                  />
                </button>
              )}

              {item.badge && (
                <span className="absolute bottom-3 left-3 bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-black backdrop-blur-xs">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile floating buttons (Wishlist & Share) */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => toggle(product.id)}
            aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-md backdrop-blur-sm transition-transform active:scale-90"
          >
            {saved ? <HeartFilledIcon size={20} /> : <HeartIcon size={20} />}
          </button>
          {onShare && (
            <button
              type="button"
              onClick={onShare}
              aria-label="Share product"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-md backdrop-blur-sm transition-transform active:scale-90"
            >
              <ShareIcon size={18} />
            </button>
          )}
        </div>

        {/* Mobile counter indicator e.g. 1 / 6 */}
        <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-xs">
          {activeIndex + 1} / {items.length}
        </div>

        {/* Mobile dot strip */}
        <div className="mt-3 flex justify-center gap-1.5 px-4">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollMobileTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-200 ${
                activeIndex === idx ? 'w-6 bg-black' : 'w-1.5 bg-black/25'
              } rounded-full`}
            />
          ))}
        </div>
      </div>

      {/* ----------------- DESKTOP GRID (>= 1024px) ----------------- */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-2">
        {items.map((item, idx) => {
          const isFullWidth = idx === 0 && items.length % 2 !== 0
          return (
            <div
              key={idx}
              className={`group/media relative aspect-[4/5] overflow-hidden bg-surface-subtle ${
                isFullWidth ? 'lg:col-span-2' : ''
              }`}
            >
              {item.type === 'video' ? (
                <div className="relative h-full w-full bg-black">
                  <video
                    src={item.src}
                    poster={item.poster}
                    autoPlay
                    loop
                    muted={videoMuted}
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={videoMuted ? 'Unmute video' : 'Mute video'}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform hover:scale-105"
                    >
                      <VolumeIcon size={16} muted={videoMuted} />
                    </button>
                    <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase text-white backdrop-blur-sm">
                      In Motion
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setActiveIndex(idx)
                    setLightboxOpen(true)
                  }}
                  className="relative h-full w-full cursor-zoom-in"
                >
                  <img
                    src={item.url || item.fallback}
                    alt={item.alt || product.name}
                    loading={idx < 2 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      if (item.fallback && e.currentTarget.src !== item.fallback) {
                        e.currentTarget.src = item.fallback
                      }
                    }}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover/media:scale-[1.02]"
                  />
                  <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover/media:opacity-100">
                    <ZoomIcon size={18} />
                  </div>
                </div>
              )}

              {item.badge && (
                <span className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black backdrop-blur-xs">
                  {item.badge}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* ----------------- LIGHTBOX MODAL ----------------- */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery fullscreen view"
          className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white animate-fade-in"
        >
          {/* Header controls */}
          <div className="flex h-14 items-center justify-between px-4 sm:px-8">
            <span className="text-xs font-medium uppercase tracking-wider text-white/70">
              {activeIndex + 1} / {items.length} — {product.name}
            </span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setLightboxZoomed(!lightboxZoomed)}
                aria-label={lightboxZoomed ? 'Zoom out' : 'Zoom in'}
                className="hidden text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white sm:block"
              >
                {lightboxZoomed ? 'Zoom Out' : 'Zoom In'}
              </button>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close fullscreen gallery"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <CloseIcon size={20} />
              </button>
            </div>
          </div>

          {/* Main viewport */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden p-2 sm:p-6">
            {/* Prev button */}
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)}
              aria-label="Previous image"
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/30 sm:left-6"
            >
              <ChevronLeftIcon size={24} />
            </button>

            {/* Active media */}
            <div
              className={`flex h-full w-full items-center justify-center overflow-auto ${
                lightboxZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setLightboxZoomed(!lightboxZoomed)}
            >
              {items[activeIndex]?.type === 'video' ? (
                <video
                  src={items[activeIndex].src}
                  poster={items[activeIndex].poster}
                  autoPlay
                  controls
                  loop
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <img
                  src={items[activeIndex]?.url || items[activeIndex]?.fallback}
                  alt={items[activeIndex]?.alt || product.name}
                  className={`max-h-full max-w-full object-contain transition-transform duration-200 ${
                    lightboxZoomed ? 'scale-150' : 'scale-100'
                  }`}
                />
              )}
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % items.length)}
              aria-label="Next image"
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/30 sm:right-6"
            >
              <ChevronRightIcon size={24} />
            </button>
          </div>

          {/* Bottom thumbnail strip */}
          <div className="flex h-20 items-center justify-center gap-2 overflow-x-auto px-4 py-2">
            {items.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveIndex(idx)
                  setLightboxZoomed(false)
                }}
                className={`relative h-14 w-11 shrink-0 overflow-hidden border-2 transition ${
                  activeIndex === idx ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                {item.type === 'video' ? (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-white">
                    <PlayIcon size={14} />
                  </div>
                ) : (
                  <img
                    src={item.url || item.fallback}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

