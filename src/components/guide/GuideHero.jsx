import { Link } from 'react-router-dom'
import { ChevronDownIcon } from '../header/icons'

const STICKY_HEADER = 76

// gymshark.com's "hero block". `center` is the page-opening variant: fills
// the viewport under the header, copy centred (bottom-left on mobile) with a
// scroll-down nudge. `left-bottom` is the in-page promo: full-height on
// mobile, 16:9 → 8:3 from tablet up, small heading + solid white CTA.
export default function GuideHero({ ref, title, copy, image, cta, variant = 'center', headingLevel = 'h2', priority = false }) {
  const Heading = headingLevel
  const centered = variant === 'center'

  function scrollPast(e) {
    const section = e.currentTarget.closest('section')
    const top = window.scrollY + section.getBoundingClientRect().bottom - STICKY_HEADER
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      className={`relative flex w-full overflow-hidden bg-ink ${
        centered
          ? 'h-[calc(100svh-117px)] min-h-[480px] items-end md:items-center md:justify-center lg:h-[calc(100svh-151px)]'
          : 'h-[calc(100svh-117px)] min-h-[480px] items-end md:aspect-video md:h-auto md:min-h-0 xl:aspect-[8/3]'
      }`}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        fetchPriority={priority ? 'high' : undefined}
        loading={priority ? 'eager' : 'lazy'}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black/50 ${centered ? 'md:hidden' : ''}`}
      />

      <div
        className={`relative z-[2] flex flex-col gap-2 text-white ${
          centered
            ? 'mb-10 ml-6 mr-4 items-start md:mx-[52px] md:mb-0 md:max-w-[1020px] md:items-center md:text-center lg:mx-auto'
            : 'mb-10 ml-6 mr-4 max-w-[550px] items-start md:m-10'
        }`}
      >
        <Heading
          className={
            centered
              ? 'font-display text-[clamp(32px,26.4px+1.5vw,48px)] font-extrabold uppercase leading-[0.9]'
              : 'font-display text-[clamp(18px,17.3px+0.19vw,20px)] font-medium uppercase leading-[0.94]'
          }
        >
          {title}
        </Heading>
        {copy && <p className="text-[14px] leading-[1.4]">{copy}</p>}
        {cta && (
          <Link
            to={cta.href}
            className="mt-2 inline-flex h-[52px] items-center border border-transparent bg-white px-6 text-[14px] leading-[1.4] capitalize text-ink transition-colors duration-200 hover:bg-surface-subtle"
          >
            {cta.label}
          </Link>
        )}
      </div>

      {centered && (
        <button
          type="button"
          onClick={scrollPast}
          aria-label="Scroll to content"
          className="absolute bottom-6 left-1/2 z-[2] hidden h-8 w-8 -translate-x-1/2 items-center justify-center bg-white/30 text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-colors duration-200 hover:bg-white/50 md:flex"
        >
          <ChevronDownIcon size={16} />
        </button>
      )}
    </section>
  )
}
