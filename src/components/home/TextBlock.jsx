// gymshark.com's centered "Text" block: a heading, optionally followed by a
// short paragraph, capped and centered. Used standalone between carousels
// (e.g. "Get to know our families", "The perfect fit").
export default function TextBlock({ title, copy }) {
  return (
    <section className="flex w-full items-center justify-center px-6 py-10 text-center lg:py-16">
      <div className="flex max-w-[680px] flex-col gap-2">
        <h2 className="font-display text-[clamp(24px,20.8px+0.8vw,32px)] font-bold uppercase leading-[1] tracking-[-0.01em] text-ink">
          {title}
        </h2>
        {copy && <p className="text-[14px] leading-[1.5] text-muted">{copy}</p>}
      </div>
    </section>
  )
}
