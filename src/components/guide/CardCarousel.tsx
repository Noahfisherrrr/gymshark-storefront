import { useCarouselPaging } from '../../hooks/useCarouselPaging'
import CarouselHeader from './CarouselHeader'
import MediaCard, { type GuideCard } from './MediaCard'
import '../home/home.css'

interface CardCarouselProps {
  title?: string
  cards: GuideCard[]
}

// gymshark.com's tabbed content carousel (single tab): a 2-column grid on
// mobile, a swipeable 60vw row on tablet, and four-up with arrows on desktop.
export default function CardCarousel({ title, cards }: CardCarouselProps) {
  const { trackRef, edges, update, page } = useCarouselPaging<HTMLUListElement>(cards)

  return (
    <section className="mx-auto w-full max-w-[3000px] lg:px-10" aria-label={title}>
      <CarouselHeader title={title} edges={edges} onPage={page} />
      <ul
        ref={trackRef}
        onScroll={update}
        className="gs-carousel grid grid-cols-2 gap-x-1 gap-y-4 px-4 md:flex md:items-start md:gap-1 md:overflow-x-auto md:overflow-y-hidden md:pr-0 lg:px-0"
      >
        {cards.map((card) => (
          <li key={card.id} className="min-w-0 md:shrink-0 md:basis-[60vw] lg:basis-[calc(25%-3px)]">
            <MediaCard card={card} />
          </li>
        ))}
        <li aria-hidden="true" className="hidden min-h-px min-w-3 shrink-0 md:block lg:hidden" />
      </ul>
    </section>
  )
}
