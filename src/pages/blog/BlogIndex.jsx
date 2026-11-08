import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BLOG_ARTICLES,
  BLOG_CATEGORIES,
  BLOG_EDITORS_PICKS_SLUGS,
  BLOG_FEATURED_SLUGS,
  BLOG_NAME,
  BLOG_TAGS,
  BLOG_TOPICS,
  getArticle,
} from '../../config/blog'
import ArticleCard from '../../components/blog/ArticleCard'
import { productThumb } from '../../lib/images'
import { SearchIcon } from '../../components/header/icons'

const PAGE_SIZE = 6

function CategoryTabs() {
  return (
    <nav aria-label="Blog categories" className="flex flex-wrap items-center justify-center gap-6 border-b border-line px-4 py-5 text-sm">
      <Link to="/blog" className="font-semibold text-ink">
        All
      </Link>
      {BLOG_CATEGORIES.map((cat) => (
        <Link key={cat.slug} to={`/blog/category/${cat.slug}`} className="text-muted hover:text-ink">
          {cat.label}
        </Link>
      ))}
      <SearchIcon size={18} className="text-muted" />
    </nav>
  )
}

function FeaturedList() {
  const featured = BLOG_FEATURED_SLUGS.map(getArticle).filter(Boolean)
  return (
    <div>
      <h2 className="font-display text-xl font-medium uppercase text-ink">Featured</h2>
      <ol className="mt-6 space-y-8">
        {featured.map((article, i) => (
          <li key={article.slug}>
            <Link to={`/blog/article/${article.slug}`} className="group block">
              <p className="font-display text-4xl font-extrabold text-ink">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-display text-lg font-medium uppercase leading-[1.25] text-ink group-hover:underline">
                {article.title}
              </h3>
              <p className="mt-1 text-xs capitalize text-muted">{BLOG_CATEGORIES.find((c) => c.slug === article.category)?.label}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

function EditorsPicks() {
  const picks = BLOG_EDITORS_PICKS_SLUGS.map(getArticle).filter(Boolean)
  return (
    <div>
      <h2 className="font-display text-xl font-medium uppercase text-ink">Editor's Picks</h2>
      <ul className="mt-6 space-y-6">
        {picks.map((article) => (
          <li key={article.slug}>
            <Link to={`/blog/article/${article.slug}`} className="group flex gap-4">
              <div className="aspect-square w-24 shrink-0 overflow-hidden bg-surface-subtle">
                <img
                  src={productThumb(article.image)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="text-xs capitalize text-muted">{BLOG_CATEGORIES.find((c) => c.slug === article.category)?.label}</p>
                <h3 className="mt-1 font-display text-sm font-medium uppercase leading-[1.25] text-ink group-hover:underline">
                  {article.title}
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TopicsDirectory() {
  return (
    <div className="grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-4">
      {BLOG_TOPICS.map((group) => (
        <div key={group.title}>
          <h3 className="text-sm font-semibold uppercase text-muted">{group.title}</h3>
          <ul className="mt-3 space-y-2">
            {group.tags.map((tag) => (
              <li key={tag}>
                <Link to={`/blog/tag/${tag}`} className="text-sm font-semibold text-ink underline">
                  {BLOG_TAGS[tag]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function BlogIndex() {
  const [visible, setVisible] = useState(PAGE_SIZE)
  const shown = BLOG_ARTICLES.slice(0, visible)
  const [first, ...rest] = shown

  return (
    <div>
      <section className="px-4 py-16 text-center lg:py-20">
        <h1 className="font-display text-3xl font-extrabold uppercase text-ink">{BLOG_NAME.title}</h1>
        <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted">{BLOG_NAME.subtitle}</p>
      </section>

      <CategoryTabs />

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[224px_1fr_300px] lg:gap-10">
          <FeaturedList />

          <div>
            <h2 className="font-display text-xl font-medium uppercase text-ink">The Latest</h2>
            {first && (
              <div className="mt-6">
                <ArticleCard article={first} size="lg" />
              </div>
            )}
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {rest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {visible < BLOG_ARTICLES.length && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="bg-ink px-8 py-3.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
                >
                  Load More
                </button>
              </div>
            )}
            <p className="mt-4 text-center text-sm text-muted">
              Viewing 1 - {Math.min(visible, BLOG_ARTICLES.length)} of {BLOG_ARTICLES.length} articles
            </p>
          </div>

          <EditorsPicks />
        </div>

        <div className="mt-16">
          <TopicsDirectory />
        </div>
      </div>
    </div>
  )
}
