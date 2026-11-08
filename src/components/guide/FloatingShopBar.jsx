// gymshark.com's "floating action area": a frosted bar that slides up once
// the hero is scrolled past and jumps down to the page's product catalogue.
// Full-width on mobile, a 375px centred pill from tablet up.
export default function FloatingShopBar({ label, count, visible, onShop }) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[100] grid grid-cols-[1fr_auto] items-center gap-6 border-t border-line bg-white/80 p-4 backdrop-blur-[10px] transition-[translate,visibility] duration-300 md:bottom-6 md:left-1/2 md:right-auto md:w-[375px] md:-translate-x-1/2 md:border md:p-2 md:pl-4 ${
        visible ? 'visible translate-y-0' : 'invisible translate-y-full md:translate-y-[calc(100%+24px)]'
      }`}
    >
      <div className="flex min-w-0 flex-col text-[14px] leading-[1.4]">
        <span className="truncate text-ink">{label}</span>
        <span className="text-muted">
          {count} {count === 1 ? 'Product' : 'Products'}
        </span>
      </div>
      <button
        type="button"
        onClick={onShop}
        className="inline-flex h-11 items-center justify-center bg-ink px-7 text-[12px] leading-[1.3] text-white transition-colors duration-200 hover:bg-ink-hover"
      >
        Shop
      </button>
    </div>
  )
}
