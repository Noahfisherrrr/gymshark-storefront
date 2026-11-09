interface GuideTextBlockProps {
  title: string
  copy?: string
}

// gymshark.com's centred rich-text block: hero-size display title with
// optional muted copy, capped at 800px.
export default function GuideTextBlock({ title, copy }: GuideTextBlockProps) {
  return (
    <section className="flex justify-center px-4 py-6 text-center lg:px-10">
      <div className="flex max-w-[800px] flex-col gap-4">
        <h2 className="font-display text-[clamp(32px,26.4px+1.5vw,48px)] font-extrabold uppercase leading-[0.9] text-ink">
          {title}
        </h2>
        {copy && <p className="text-[14px] leading-[1.4] text-muted">{copy}</p>}
      </div>
    </section>
  )
}
