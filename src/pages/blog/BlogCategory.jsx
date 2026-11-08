import { Link, useParams } from 'react-router-dom'
import { BLOG_ARTICLES, BLOG_CATEGORIES, getCategory } from '../../config/blog'
import ArticleCard from '../../components/blog/ArticleCard'
import NotFound from '../NotFound'

export default function BlogCategory() {
  const { slug } = useParams()
  const category = getCategory(slug)
  if (!category) return <NotFound />

  const articles = BLOG_ARTICLES.filter((article) => article.category === slug)

  return (
    <div>
      <section className="px-4 py-16 text-center lg:py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Brand Name Central</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold uppercase text-ink">{category.label}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">{category.description}</p>
      </section>

      <nav aria-label="Blog categories" className="flex flex-wrap items-center justify-center gap-6 border-y border-line px-4 py-5 text-sm">
        <Link to="/blog" className="text-muted hover:text-ink">
          All
        </Link>
        {BLOG_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/blog/category/${cat.slug}`}
            className={cat.slug === slug ? 'font-semibold text-ink' : 'text-muted hover:text-ink'}
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
        {articles.length === 0 ? (
          <p className="text-sm text-muted">No articles in this category yet — check back soon.</p>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
