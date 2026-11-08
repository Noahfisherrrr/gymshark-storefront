import { Link, useParams } from 'react-router-dom'
import { BLOG_ARTICLES, BLOG_AUTHORS, BLOG_TAGS, getArticle, getCategory } from '../../config/blog'
import ArticleBody from '../../components/blog/ArticleBody'
import ArticleCard from '../../components/blog/ArticleCard'
import { formatDate } from '../../lib/format'
import { ChevronRightIcon } from '../../components/header/icons'
import NotFound from '../NotFound'

export default function BlogArticle() {
  const { slug } = useParams()
  const article = getArticle(slug)
  if (!article) return <NotFound />

  const category = getCategory(article.category)
  const author = BLOG_AUTHORS[article.author]
  const related = BLOG_ARTICLES.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3)

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 pt-8 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
          <Link to="/blog" className="hover:underline">
            Blog
          </Link>
          <ChevronRightIcon size={12} />
          <Link to={`/blog/category/${article.category}`} className="hover:underline">
            {category?.label}
          </Link>
        </nav>

        <p className="mt-6 text-xs font-semibold capitalize text-muted">{category?.label}</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold uppercase leading-[1.1] text-ink lg:text-4xl">{article.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          <span>{formatDate(article.publishedAt)}</span>
          {author && (
            <>
              <span aria-hidden="true">/</span>
              <span>{author.name}</span>
            </>
          )}
        </div>

        {article.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog/tag/${tag}`}
                className="rounded-full border border-line px-3 py-1 text-xs capitalize text-muted hover:border-ink hover:text-ink"
              >
                {BLOG_TAGS[tag]}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto mt-8 aspect-[16/9] w-full max-w-5xl overflow-hidden bg-surface-subtle px-4 lg:px-8">
        <img src={article.image} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
        <ArticleBody blocks={article.body} />

        {author && (
          <div className="mt-14 flex items-center gap-4 border-t border-line pt-8">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-black text-sm font-bold uppercase text-brand-white">
              {author.name
                .split(' ')
                .map((w) => w[0])
                .join('')}
            </span>
            <div>
              <h2 className="text-sm font-bold">{author.name}</h2>
              <p className="text-xs text-muted">{author.role}</p>
              <p className="mt-1 text-xs text-muted">{author.bio}</p>
            </div>
          </div>
        )}

        <p className="mt-10 text-sm text-muted">
          Can't find what you're looking for? Visit the{' '}
          <Link to="/help" className="underline">
            Help Centre
          </Link>
          .
        </p>
      </div>

      {related.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
          <h2 className="font-display text-xl font-medium uppercase text-ink">You May Like</h2>
          <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
