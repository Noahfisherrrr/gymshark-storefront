import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDownIcon, ChevronRightIcon } from './icons'

function FeaturedTile({ tile, onNavigate }) {
  return (
    <Link
      to={tile.href}
      onClick={onNavigate}
      className="relative block aspect-[3/2] overflow-hidden bg-neutral-300"
    >
      <span className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <span className="absolute bottom-3 left-3 text-[14px] font-bold uppercase text-white">
        {tile.title}
      </span>
    </Link>
  )
}

function MegaMenu({ category, onNavigate, sidebarWidth }) {
  const [activeGroup, setActiveGroup] = useState(null)

  return (
    <div className="absolute left-0 top-[76px] z-[250] flex h-[calc(100vh-76px)] text-ink">
      <div
        className="relative flex shrink-0 flex-col border-r border-t border-line bg-white"
        style={{ width: sidebarWidth }}
      >
        <ul className="flex flex-col py-6 pl-10 pr-6">
          {category.groups.map((group) => (
            <li
              key={group.label}
              data-active={activeGroup === group.label}
              tabIndex={0}
              onMouseEnter={() => setActiveGroup(group.label)}
              onFocus={() => setActiveGroup(group.label)}
              className="gs-menu-row flex cursor-pointer items-center justify-between gap-4 py-1.5"
            >
              <span className="gs-menu-text truncate py-2 text-[14px] leading-[1.4]">
                {group.label}
              </span>
              <ChevronRightIcon size={16} />

              {activeGroup === group.label && (
                <ul className="absolute -right-px -top-px z-[102] flex h-[calc(100%+1px)] w-[300px] translate-x-full flex-col overflow-y-auto border-r border-t border-line bg-white p-6 pb-[152px]">
                  {group.links.map((link) => (
                    <li key={link.label} className="gs-menu-row flex py-1.5">
                      <Link
                        to={link.href}
                        onClick={onNavigate}
                        className="gs-menu-text truncate py-2 text-[14px] leading-[1.4]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {category.featured.length > 0 && (
          <div className="mt-auto flex max-w-[300px] flex-col gap-2 overflow-y-auto px-2 pb-[56px] pt-2">
            {category.featured.map((tile) => (
              <FeaturedTile key={tile.title} tile={tile} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function DesktopNav({ categories, openId, setOpenId, onNavigate }) {
  // The left sidebar pane widens to meet the right edge of the "Explore" nav
  // item, so it's measured live rather than hard-coded (the nav's width
  // depends on the viewport and the category labels rendered into it).
  const exploreItemRef = useRef(null)
  const [sidebarWidth, setSidebarWidth] = useState(300)

  useEffect(() => {
    function measure() {
      if (exploreItemRef.current) {
        setSidebarWidth(Math.round(exploreItemRef.current.getBoundingClientRect().right))
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <nav className="-ml-4 hidden h-full lg:flex" aria-label="Main">
      {categories.map((category) => {
        const open = openId === category.id
        return (
          <div
            key={category.id}
            ref={category.id === 'explore' ? exploreItemRef : undefined}
            className="flex h-full"
            onMouseEnter={() => setOpenId(category.id)}
            onMouseLeave={() => setOpenId(null)}
          >
            <Link
              to={category.href}
              onClick={onNavigate}
              data-open={open}
              className="gs-nav-link mx-4 flex h-full items-center py-[15px] text-[14px] capitalize leading-[1.4]"
            >
              {category.label.toLowerCase()}
            </Link>

            <div className="relative -left-2.5">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`menu-${category.id}`}
                onClick={() => setOpenId(open ? null : category.id)}
                className="absolute top-[37.5%] opacity-0 focus:opacity-100"
              >
                <ChevronDownIcon size={16} className={open ? 'rotate-180' : ''} />
                <span className="sr-only">Expand {category.label}</span>
              </button>
            </div>

            {open && (
              <div id={`menu-${category.id}`}>
                <MegaMenu
                  key={category.id}
                  category={category}
                  onNavigate={onNavigate}
                  sidebarWidth={sidebarWidth}
                />
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
