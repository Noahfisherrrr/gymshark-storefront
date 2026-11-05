import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { NAV_CATEGORIES, SECONDARY_LINKS, USP_MESSAGES } from '../../config/navigation'
import { useBodyScrollLock } from '../../lib/scrollLock'
import UspBar from './UspBar'
import DesktopNav from './DesktopNav'
import MobileMenu from './MobileMenu'
import SearchModal, { SEARCH_PLACEHOLDER } from '../search/SearchModal'
import MiniBag from '../minibag/MiniBag'
import { BagIcon, HeartIcon, MenuIcon, ProfileIcon, SearchIcon } from './icons'
import './header.css'

const SCROLL_THRESHOLD = 200
const HEADER_HEIGHT = 76

// Mirrors gymshark.com's scroll model:
// - scrollingDown: true only while scrolling down AND past the threshold
// - transparent pages (home): header slides fully out while scrolling down,
//   returns as a solid white bar on scroll-up, goes transparent again at the top
// - solid pages: only the USP bar tucks away while scrolling down
//
// Hover is read via :hover (browser hit-testing) rather than mouseenter/leave
// state: React misses mouseleave when a hovered child (the menu backdrop) is
// removed from under the cursor, which left the header stuck in hover mode.
function useScrollState(wrapperRef) {
  const [state, setState] = useState(() => ({
    scrollingDown: false,
    pastThreshold: window.scrollY > SCROLL_THRESHOLD,
    pointerInside: false,
  }))
  const lastY = useRef(window.scrollY)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      const next = {
        scrollingDown: lastY.current > y ? false : y > SCROLL_THRESHOLD,
        pastThreshold: y > SCROLL_THRESHOLD,
        pointerInside: wrapperRef.current?.matches(':hover') ?? false,
      }
      lastY.current = y
      setState((prev) =>
        prev.scrollingDown === next.scrollingDown &&
        prev.pastThreshold === next.pastThreshold &&
        prev.pointerInside === next.pointerInside
          ? prev
          : next,
      )
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [wrapperRef])

  return state
}

function Logo({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Home"
      className="absolute left-[calc(50%-22px)] top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[18px] font-extrabold uppercase leading-none tracking-tight whitespace-nowrap lg:static lg:translate-x-0 lg:translate-y-0"
    >
      {/* Client logo pending (Brief.md #3) — swap this wordmark for their SVG. */}
      Brand Name
    </Link>
  )
}

function ActionIcon({ to, label, children, className = '' }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={`flex h-11 w-11 items-center justify-center ${className}`}
    >
      {children}
    </Link>
  )
}

export default function Header() {
  const location = useLocation()
  const transparent = location.pathname === '/'
  const { user } = useAuth()
  const { itemCount, openMiniBag } = useCart()
  const { productIds } = useWishlist()
  const wrapperRef = useRef(null)
  const { scrollingDown, pastThreshold, pointerInside } = useScrollState(wrapperRef)

  const [openMenuId, setOpenMenuId] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  // Kept after closing: the trigger shows the last term, as on gymshark.com.
  const [searchTerm, setSearchTerm] = useState('')

  const menuOpen = openMenuId !== null
  // Transparent pages also turn solid on :hover, handled in CSS below.
  const solid = !transparent || menuOpen || (pastThreshold && !scrollingDown)
  const hidden = transparent && scrollingDown && !pointerInside && !mobileOpen
  const uspTucked = !transparent && scrollingDown && !mobileOpen

  // Any navigation (links, back/forward) closes the search overlay.
  const [seenLocation, setSeenLocation] = useState(location)
  if (location !== seenLocation) {
    setSeenLocation(location)
    setSearchOpen(false)
  }

  useBodyScrollLock(mobileOpen)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpenMenuId(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function closeAll() {
    setOpenMenuId(null)
    setMobileOpen(false)
  }

  function openSearch() {
    closeAll()
    setSearchOpen(true)
  }

  const showSearchPill = !transparent

  return (
    <div
      ref={wrapperRef}
      className="group/header sticky z-[201] flex flex-col"
      style={{
        top: uspTucked ? -48 : 0,
        marginBottom: transparent ? -HEADER_HEIGHT : 0,
        transform: hidden ? 'translateY(-100%)' : 'none',
        transition: 'top 0.3s ease-in-out, transform 0.3s ease-in-out',
      }}
    >
      <UspBar messages={USP_MESSAGES} />

      <header
        className={`relative z-[1] flex h-[76px] items-center p-4 antialiased lg:p-0 ${
          solid
            ? 'bg-white text-ink'
            : 'bg-[linear-gradient(180deg,rgba(0,0,0,.15)_30%,rgba(0,0,0,0))] text-white group-hover/header:bg-white group-hover/header:bg-none group-hover/header:text-ink'
        }`}
      >
        <a
          href="#MainContent"
          className="sr-only focus:not-sr-only focus:absolute focus:left-1/2 focus:top-4 focus:z-[99993] focus:bg-white focus:p-[15px] focus:text-[14px] focus:font-bold focus:text-ink focus:underline"
        >
          Skip to content
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Main menu"
          aria-expanded={mobileOpen}
          className="z-[1] flex h-11 min-w-11 items-center justify-center lg:hidden"
        >
          <MenuIcon size={24} />
        </button>

        <div className="relative flex h-full w-full items-center justify-end lg:grid lg:h-[76px] lg:grid-cols-[1fr_max-content_1fr] lg:px-10">
          <DesktopNav
            categories={NAV_CATEGORIES}
            openId={openMenuId}
            setOpenId={setOpenMenuId}
            onNavigate={closeAll}
          />

          <Logo onClick={closeAll} />

          <div className="flex w-full items-center justify-end lg:gap-3">
            <button
              type="button"
              aria-label="Search"
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
              onClick={openSearch}
              className={`group mr-auto flex h-11 items-center lg:mr-0 ${
                showSearchPill
                  ? 'w-11 justify-center min-[1440px]:mr-4 min-[1440px]:w-[250px] min-[1440px]:justify-start min-[1440px]:border min-[1440px]:border-transparent min-[1440px]:bg-surface-subtle min-[1440px]:px-4 min-[1440px]:hover:border-ink'
                  : 'w-11 justify-center'
              }`}
            >
              <SearchIcon size={22} />
              {showSearchPill && (
                <span className="hidden truncate pl-2.5 text-[14px] text-muted group-hover:text-ink min-[1440px]:inline">
                  {searchTerm || SEARCH_PLACEHOLDER}
                </span>
              )}
            </button>

            <ActionIcon to="/wishlist" label="View your wishlist" className="hidden lg:flex">
              <span className="relative block">
                <HeartIcon size={24} />
                <span
                  className={`pointer-events-none absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 translate-y-2 rounded-full bg-accent-blue transition-opacity duration-75 ${
                    productIds.length > 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </span>
            </ActionIcon>

            <ActionIcon to={user ? '/account' : '/login'} label="View your account">
              <ProfileIcon size={24} />
            </ActionIcon>

            <button
              type="button"
              onClick={() => {
                closeAll()
                openMiniBag()
              }}
              aria-haspopup="dialog"
              aria-label={`${itemCount} items in your bag`}
              className="relative flex h-11 w-11 items-center justify-center"
            >
              <BagIcon size={24} />
              {itemCount > 0 && (
                <span className="absolute right-[3px] top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white bg-accent-blue pt-px text-[9px] leading-[9px] text-white shadow-[0_0_6px_0_rgba(0,0,0,0.0983)]">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {menuOpen && (
            <div
              aria-hidden="true"
              className="absolute left-0 top-[76px] z-[200] hidden h-screen w-full bg-black/30 backdrop-blur-[16px] lg:block"
            />
          )}
        </div>
      </header>

      {createPortal(
        <MobileMenu
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          categories={NAV_CATEGORIES}
          secondaryLinks={SECONDARY_LINKS}
          onOpenSearch={openSearch}
        />,
        document.body,
      )}

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        term={searchTerm}
        onTermChange={setSearchTerm}
      />
      <MiniBag />
    </div>
  )
}
