import { ChevronLeftIcon, ChevronRightIcon } from '../header/icons'
import { SECTION_HEADING } from '../home/ProductCarousel'

const ARROW =
  'flex h-11 w-11 items-center justify-center text-ink transition-colors duration-200 hover:bg-surface-subtle disabled:cursor-auto disabled:bg-transparent disabled:text-[#bec2c6]'

// Heading row shared by the guide carousels: title left, desktop-only
// prev/next arrows right (only when the row actually overflows).
export default function CarouselHeader({ title, edges, onPage }) {
  const overflows = !(edges.start && edges.end)

  return (
    <div
      className={`mb-4 flex items-center justify-between gap-6 px-4 md:mb-6 lg:px-0 ${overflows ? 'lg:mb-4 lg:min-h-11' : ''}`}
    >
      <h2 className={SECTION_HEADING}>{title}</h2>
      {overflows && (
        <div className="hidden shrink-0 lg:flex">
          <button type="button" onClick={() => onPage(-1)} disabled={edges.start} aria-label={`Previous ${title}`} className={ARROW}>
            <ChevronLeftIcon size={20} />
          </button>
          <button type="button" onClick={() => onPage(1)} disabled={edges.end} aria-label={`Next ${title}`} className={ARROW}>
            <ChevronRightIcon size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
