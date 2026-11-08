import { Link, useParams } from 'react-router-dom'
import { BLOG_ARTICLES, BLOG_TAGS } from '../../config/blog'
import ArticleCard from '../../components/blog/ArticleCard'
import NotFound from '../NotFound'

export default function BlogTag() {
  const { slug } = useParams()
  const label = BLOG_TAGS[slug]
  if (!label) return <NotFound />

  const articles = BLOG_ARTICLES.filter((article) => article.tags?.includes(slug))

  return (
    <div>
      <section className="px-4 py-16 text-center lg:py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Brand Name Central</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold uppercase text-ink">{label}</h1>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
        {articles.length === 0 ? (
          <p className="text-sm text-muted">
            No articles tagged “{label}” yet. Browse the full{' '}
            <Link to="/blog" className="underline">
              blog
            </Link>
            .
          </p>
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
