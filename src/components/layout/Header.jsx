import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const NAV_LINKS = [
  { label: 'Shop All', to: '/shop' },
  { label: 'Men', to: '/shop?category=men' },
  { label: 'Women', to: '/shop?category=women' },
  { label: 'New Arrivals', to: '/shop?category=new' },
  { label: 'Sale', to: '/shop?category=sale' },
]

export default function Header() {
  const { itemCount } = useCart()
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-brand-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link to="/" className="text-xl font-extrabold uppercase tracking-tight">
          Brand Name
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className="hover:text-brand-accent transition-colors"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm font-semibold uppercase">
          <Link to="/account">{user ? user.name || 'Account' : 'Sign In'}</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart ({itemCount})</Link>
        </div>
      </div>
    </header>
  )
}
