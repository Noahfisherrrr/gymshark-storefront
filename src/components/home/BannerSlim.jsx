import { Link } from 'react-router-dom'
import './home.css'

// gymshark.com's "Banner-slim" block: no image/video, solid black, centered
// copy capped at 680px, single tertiary CTA. Used for the first-order
// discount strip.
export default function BannerSlim({ title, copy, cta }) {
  return (
    <section className="flex w-full items-center justify-center bg-ink px-6 py-12 lg:px-12">
      <div className="flex max-w-[680px] flex-col items-center gap-2 text-center text-white">
        <h2 className="font-display text-[clamp(32px,26.4px+1.5vw,48px)] font-extrabold uppercase leading-[0.9] tracking-[-0.01em] whitespace-pre-line">
          {title}
        </h2>
        {copy && <p className="text-[14px] leading-[1.4]">{copy}</p>}
        {cta && (
          <Link
            to={cta.href}
            className="gs-underline-cta mt-2 flex h-8 items-center whitespace-nowrap text-[14px] uppercase leading-[1.4] text-white"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  )
}
