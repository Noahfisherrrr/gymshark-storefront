import { Link } from 'react-router-dom'
import { productThumb } from '../../lib/images'
import { getCategory, articleHref, type BlogArticle } from '../../config/blog'
import { formatDate } from '../../lib/format'

interface ArticleCardProps {
  article: BlogArticle
  size?: 'md' | 'lg'
}

export default function ArticleCard({ article, size = 'md' }: ArticleCardProps) {
  const category = getCategory(article.category)
  const aspect = size === 'lg' ? 'aspect-square' : 'aspect-square'

  return (
    <Link to={articleHref(article)} className="group block">
      <div className={`${aspect} w-full overflow-hidden bg-surface-subtle`}>
        <img
          src={productThumb(article.image)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 text-xs capitalize text-muted">{category?.label}</p>
      <h3 className={`mt-1 font-display font-medium uppercase leading-[1.2] text-ink ${size === 'lg' ? 'text-2xl' : 'text-lg'}`}>
        {article.title}
      </h3>
      <p className="mt-1 text-xs uppercase text-muted">{formatDate(article.publishedAt)}</p>
    </Link>
  )
}
