import { BENEFITS, CAREERS_FAQ, VACANCIES } from '../config/careers'
import { ChevronDownIcon } from '../components/header/icons'
import { asset } from '../config/assetVersion'

// gymshark.com's /pages/careers. Vacancies, benefits and FAQ copy are
// placeholders until the client wires up a real ATS (Brief.md #4) —
// "Apply now" opens a mailto so the flow is usable in the meantime.
export default function Careers() {
  return (
    <div>
      <section className="relative flex min-h-[420px] items-end bg-brand-black text-brand-white">
        <img src={asset('/media/hero-training-poster.webp')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="relative px-4 py-10 lg:px-8 lg:py-14">
          <h1 className="font-display text-3xl font-extrabold uppercase lg:text-4xl">Careers</h1>
          <p className="mt-2 max-w-md text-sm text-white/80">Discover our live work experience and career opportunities.</p>
          <a
            href="#vacancies"
            className="mt-6 inline-flex items-center bg-white px-6 py-3.5 text-sm font-semibold uppercase text-brand-black transition-opacity duration-200 hover:opacity-85"
          >
            See Vacancies
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <h2 className="text-lg font-bold uppercase">Who We Are</h2>
        <p className="mt-3 text-sm leading-[1.6] text-black/70">
          We're a training brand at our core. We design apparel, create content that inspires the next session, and build a community
          that pushes each other to be their best — and we need people who want to build that with us.
        </p>
        <p className="mt-3 text-sm leading-[1.6] text-black/70">
          What matters most is your attitude, mindset and the impact you make. You don't need to be a gym regular to build a career
          here — we're looking for people who are curious, collaborative and genuinely care about the work.
        </p>
      </div>

      <div className="border-y border-line bg-surface-subtle px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-lg font-bold uppercase">Benefits & Perks</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title}>
                <h3 className="text-sm font-bold uppercase">{b.title}</h3>
                <p className="mt-1 text-sm text-black/60">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="vacancies" className="mx-auto max-w-4xl scroll-mt-28 px-4 py-16 lg:px-8">
        <h2 className="text-lg font-bold uppercase">Vacancies</h2>
        <p className="mt-1 text-sm text-muted">
          {VACANCIES.reduce((n, dept) => n + dept.roles.length, 0)} open roles
        </p>

        <div className="mt-6 space-y-10">
          {VACANCIES.map((dept) => (
            <div key={dept.department}>
              <h3 className="text-sm font-bold uppercase text-muted">{dept.department}</h3>
              <div className="mt-3 divide-y divide-line border-y border-line">
                {dept.roles.map((role) => (
                  <div key={role.title} className="flex flex-wrap items-center justify-between gap-2 py-4">
                    <div>
                      <p className="text-sm font-semibold">{role.title}</p>
                      <p className="text-xs text-muted">
                        {role.location} · {role.type}
                      </p>
                    </div>
                    <a
                      href={`mailto:careers@example.com?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
                      className="text-sm font-semibold underline"
                    >
                      Apply Now
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-16 lg:px-8">
        <h2 className="text-lg font-bold uppercase">FAQs</h2>
        <div className="mt-4 divide-y divide-line border-y border-line">
          {CAREERS_FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex items-center justify-between gap-4 text-sm font-semibold">
                {item.q}
                <ChevronDownIcon size={18} className="shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-3 pr-8 text-sm text-black/60">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
