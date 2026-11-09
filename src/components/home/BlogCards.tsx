import { Link } from 'react-router-dom'
import { productThumb } from '../../lib/images'
import { SECTION_HEADING } from './ProductCarousel'
import type { BlogTeaser } from '../../config/blog'

interface BlogCardsProps {
  title: string
  href: string
  posts: BlogTeaser[]
}

// Editorial cards block (gymshark.com's "Conditioning" blog teaser): title +
// "View all" link, then a row of posts with image, heading and excerpt.
export default function BlogCards({ title, href, posts }: BlogCardsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="mx-auto w-full max-w-[3000px] py-8 lg:px-10 lg:py-16" aria-label={title}>
      <div className="mb-6 flex items-end justify-between gap-4 px-4 md:px-[30px] lg:px-0">
        <h2 className={SECTION_HEADING}>{title}</h2>
        <Link
          to={href}
          className="-mb-0.5 shrink-0 text-[14px] leading-[1.4] capitalize text-muted underline hover:text-ink"
        >
          View all
        </Link>
      </div>

      <ul className="grid grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-[30px] lg:gap-8 lg:px-0">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.href} className="group block">
              <div className="aspect-[4/3] w-full overflow-hidden bg-surface-subtle">
                <img
                  src={productThumb(post.image)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-[16px] font-medium leading-[1.3] text-ink">{post.title}</h3>
              <p className="mt-1 text-[14px] leading-[1.4] text-muted">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
