import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, HeartIcon, SearchIcon } from './icons'

const TIER_EASE = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'

export default function MobileMenu({ open, onClose, categories, secondaryLinks, onOpenSearch }) {
  const [categoryId, setCategoryId] = useState(categories[0].id)
  const [group, setGroup] = useState(null)

  const category = categories.find((c) => c.id === categoryId)

  function close() {
    setGroup(null)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex h-dvh flex-col bg-white text-ink lg:hidden"
      style={{
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: TIER_EASE,
        visibility: open ? 'visible' : 'hidden',
      }}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
    >
      <div className="relative overflow-hidden" style={{ height: '100%' }}>
        <div className="flex h-full w-full">
          {/* Tier 1 */}
          <div
            className="gs-no-scrollbar flex h-full w-full min-w-full shrink-0 flex-col overflow-y-auto"
            style={{ transform: group ? 'translateX(-50%)' : 'translateX(0)', transition: TIER_EASE }}
          >
            <div className="flex items-center justify-between px-4 pt-4">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-11 w-11 items-center justify-center"
              >
                <CloseIcon size={22} />
              </button>
              <Link
                to="/wishlist"
                onClick={close}
                aria-label="View your wishlist"
                className="flex h-11 w-11 items-center justify-center"
              >
                <HeartIcon size={26} />
              </Link>
            </div>

            <div className="flex flex-col gap-4 pb-0 pt-[21px]">
              <div className="px-4">
                <button
                  type="button"
                  onClick={() => {
                    setGroup(null)
                    onOpenSearch()
                  }}
                  aria-haspopup="dialog"
                  className="flex w-full items-center border border-transparent bg-surface-subtle p-4 text-left"
                >
                  <SearchIcon size={24} />
                  <span className="truncate pl-2.5 text-[14px] text-muted">
                    What are you looking for?
                  </span>
                </button>
              </div>

              <div className="gs-no-scrollbar relative overflow-x-auto">
                <div className="relative flex w-max min-w-full items-center gap-4 px-4 after:absolute after:bottom-0 after:left-4 after:h-0.5 after:w-[calc(100%-32px)] after:bg-line">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategoryId(c.id)}
                      className={`relative z-[1] px-1 pb-2 pt-[11px] text-[14px] capitalize ${
                        c.id === categoryId ? 'border-b-2 border-ink' : 'border-b-2 border-transparent'
                      }`}
                    >
                      {c.label.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* key forces the slide-up entrance to replay when switching tabs */}
            <div key={categoryId} className="gs-slide-up">
              {category.featured.length > 0 && (
                <div className="grid grid-cols-2 gap-2 px-4 pt-6">
                  {category.featured.map((tile) => (
                    <Link
                      key={tile.title}
                      to={tile.href}
                      onClick={close}
                      className="relative block aspect-[3/2] bg-neutral-300"
                    >
                      <span className="absolute bottom-2 left-2 text-[12px] font-bold uppercase text-white">
                        {tile.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              <ul className="px-4 pb-10 pt-6">
                <li>
                  <Link
                    to={category.href}
                    onClick={close}
                    className="flex items-center justify-between py-3 text-[14px] font-bold"
                  >
                    Shop All {category.label}
                  </Link>
                </li>
                {category.groups.map((g) => (
                  <li key={g.label}>
                    <button
                      type="button"
                      onClick={() => setGroup(g)}
                      className="flex w-full items-center justify-between py-3 text-left text-[14px]"
                    >
                      {g.label}
                      <ChevronRightIcon size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="gs-slide-up-late mb-[200px] px-4">
              {secondaryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={close}
                    className="flex py-2 text-[14px] capitalize text-muted"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tier 2 */}
          <div
            className="z-[1] flex h-full w-full min-w-full shrink-0 flex-col bg-white"
            style={{ transform: group ? 'translateX(-100%)' : 'translateX(0)', transition: TIER_EASE }}
            aria-hidden={!group}
          >
            <button
              type="button"
              onClick={() => setGroup(null)}
              className="flex h-11 w-full items-center gap-2 p-2 text-left"
            >
              <span className="flex h-11 w-11 items-center justify-center">
                <ChevronLeftIcon size={20} />
              </span>
              <span className="text-[14px]">{group?.label}</span>
            </button>
            <ul className="gs-no-scrollbar h-full overflow-y-auto px-4 pb-24">
              {group?.links.map((link) => (
                <li key={link.label} className="gs-menu-row flex">
                  <Link
                    to={link.href}
                    onClick={close}
                    className="gs-menu-text py-3 text-[14px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
