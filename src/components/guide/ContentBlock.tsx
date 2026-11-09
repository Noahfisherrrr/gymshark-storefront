import MediaCard, { type GuideCard } from './MediaCard'
import '../home/home.css'

interface ContentBlockProps {
  cards: GuideCard[]
  label?: string
}

// gymshark.com's three-up "content block": equal-width media cards across
// the page on desktop, a swipeable 60vw row below that.
export default function ContentBlock({ cards, label }: ContentBlockProps) {
  return (
    <section className="mx-auto w-full max-w-[3000px] lg:px-10" aria-label={label}>
      <ul className="gs-carousel flex items-start gap-1 overflow-x-auto overflow-y-hidden pl-4 lg:overflow-visible lg:pl-0">
        {cards.map((card) => (
          <li key={card.id} className="shrink-0 basis-[60vw] lg:shrink lg:grow lg:basis-0">
            <MediaCard card={card} />
          </li>
        ))}
        <li aria-hidden="true" className="min-h-px min-w-3 shrink-0 lg:hidden" />
      </ul>
    </section>
  )
}
