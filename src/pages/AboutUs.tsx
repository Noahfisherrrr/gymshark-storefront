import { Link } from 'react-router-dom'
import { asset } from '../config/assetVersion'

const VALUES = [
  { title: 'Hard Work', text: 'That doesn’t mean working all hours, but it does mean we’re always pushing. Our work ethic got us here, and it’ll define our future.' },
  { title: 'One Team', text: 'We all play for the same team. Team priorities are everyone’s priorities. Together, we go further.' },
  { title: 'Community First', text: 'Without our community, there is no us. We listen to their needs, and learn from them. If they’re interested, we’re interested.' },
  { title: 'Stay Humble', text: 'We stay close to our roots. Never too big to learn, never too busy for the small things, and never short of a smile.' },
]

// gymshark.com's /pages/about-us. Copy is a generic placeholder brand story
// — the client's real history, leadership team and values are pending
// (Brief.md #3); swap this out once they're confirmed.
export default function AboutUs() {
  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <h1 className="font-display text-2xl font-extrabold uppercase lg:text-3xl">About Us</h1>
          <p className="mt-4 text-sm leading-[1.6] text-black/70">
            We're Brand Name. We exist to unite the training community — because although everyone's goals and training grounds are
            different, showing up is the sport we all share.
          </p>
          <p className="mt-4 text-sm leading-[1.6] text-black/70">
            What started as a small idea has grown into clothing built for how people actually train, content made to inspire the next
            session, and a community that pushes each other forward.
          </p>
          <p className="mt-4 text-sm leading-[1.6] text-black/70">
            We design for every kind of training — lifting, running, studio classes and the rest days in between — and we're only just
            getting started.
          </p>
        </div>
        <div className="aspect-[4/5] w-full overflow-hidden bg-surface-subtle">
          <img src={asset('/media/gym-training-poster.webp')} alt="" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 lg:px-8 lg:pb-24">
        <h2 className="text-lg font-bold uppercase">Our Values</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title} className="border-t border-line pt-4">
              <h3 className="text-sm font-bold uppercase">{value.title}</h3>
              <p className="mt-2 text-sm text-black/60">{value.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line bg-surface-subtle px-4 py-16 text-center lg:py-20">
        <h2 className="text-lg font-bold uppercase">Join The Team</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-black/60">
          We're always looking for people who share our values.
        </p>
        <Link
          to="/pages/careers"
          className="mt-6 inline-flex items-center bg-brand-black px-6 py-3.5 text-sm font-semibold uppercase text-brand-white transition-opacity duration-200 hover:opacity-85"
        >
          See Open Roles
        </Link>
      </div>
    </div>
  )
}
