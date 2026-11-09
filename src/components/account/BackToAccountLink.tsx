import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '../header/icons'

export default function BackToAccountLink() {
  return (
    <Link
      to="/account"
      className="mb-4 inline-flex items-center gap-1 text-sm uppercase text-black/60 hover:text-brand-black"
    >
      <ChevronLeftIcon size={16} />
      Account
    </Link>
  )
}
