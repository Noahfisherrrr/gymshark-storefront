import { Link } from 'react-router-dom'
import { productThumb } from '../../lib/images'

// gymshark.com's "media card": 4:5 image, then title and muted copy below.
export default function MediaCard({ card }) {
  return (
    <Link to={card.href} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-line">
        <img
          src={productThumb(card.image)}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 text-[14px] leading-[1.4]">
        <h3 className="font-sans text-ink decoration-1 underline-offset-2 group-hover:underline">{card.title}</h3>
        {card.copy && <p className="text-muted">{card.copy}</p>}
      </div>
    </Link>
  )
}
