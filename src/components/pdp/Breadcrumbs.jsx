import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../header/icons'

export default function Breadcrumbs({ product }) {
  const genderLabel = product.gender === 'm' ? "Men's" : product.gender === 'f' ? "Women's" : 'All'
  const genderPath = product.gender === 'm' ? '/pages/shop-men' : '/pages/shop-women'
  const categoryLabel = product.type
    ? product.type.replace('-', ' ')
    : product.category || 'Clothing'

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-black/50">
        <li>
          <Link to="/" className="hover:text-black">Home</Link>
        </li>
        <li>
          <ChevronRightIcon size={12} className="text-black/30" />
        </li>
        <li>
          <Link to={genderPath} className="hover:text-black">{genderLabel}</Link>
        </li>
        <li>
          <ChevronRightIcon size={12} className="text-black/30" />
        </li>
        <li>
          <Link to={`/shop?type=${product.type}`} className="hover:text-black capitalize">
            {categoryLabel}
          </Link>
        </li>
        <li>
          <ChevronRightIcon size={12} className="text-black/30" />
        </li>
        <li className="truncate font-bold text-black" aria-current="page">
          {product.name}
        </li>
      </ol>
    </nav>
  )
}

