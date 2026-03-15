// src/pages/About.jsx
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { Button } from '../ui/button'

const values = [
  {
    icon: '💡',
    title: 'Transparency',
    description: 'Fixed, published prices. No hidden charges, no surprise invoices.',
  },
  {
    icon: '⚡',
    title: 'Speed',
    description: 'Fast delivery is a commitment, not a bonus. We respect your time.',
  },
  {
    icon: '🛠',
    title: 'Quality',
    description: 'Developer-grade work — custom built, not drag-and-drop templates.',
  },
]

export default function About() {
  return (
    <div>
      <PageHeader
        label="About DealKe"
        title="Built by a Developer, for Kenyan Businesses"
        subtitle="Making quality digital services accessible and affordable — no middlemen, no inflated agency rates."
      />

      {/* Section 1 — Story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div>
              <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Our Story</span>
              <h2 className="text-2xl font-bold text-zinc-900 mt-2 mb-4">
                Started to solve a real problem
              </h2>
              <div className="space-y-4 text-zinc-500 text-sm leading-relaxed">
                <p>
                  DealKe was started by a solo developer based in Kenya who kept seeing the same
                  problem: small businesses needed websites and basic digital services, but the
                  quotes they got were either too expensive or the process was unnecessarily
                  complicated.
                </p>
                <p>
                  A basic business website shouldn't cost KES 150,000. KRA registration shouldn't
                  require three trips to a cyber café. That's what DealKe fixes.
                </p>
                <p>
                  We deliver professional, custom-built websites and handle the digital paperwork
                  that businesses need — fast, at fair prices, with real support on WhatsApp.
                </p>
              </div>
            </div>

            {/* Founder card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-zinc-900 rounded-2xl p-6 w-full max-w-sm font-mono text-sm shadow-xl ring-1 ring-white/10">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-zinc-500 text-xs">dealke ~ founder</span>
                </div>
                <div className="space-y-2.5 text-zinc-300">
                  <div className="text-emerald-400 font-semibold">$ whoami</div>
                  <div className="h-px bg-zinc-700" />
                  <div className="flex justify-between">
                    <span className="text-zinc-500">name</span>
                    <span>DealKe Founder</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">location</span>
                    <span>Nairobi, Kenya 🇰🇪</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">stack</span>
                    <span>React · Node · Tailwind</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">projects</span>
                    <span className="text-emerald-400">50+ delivered</span>
                  </div>
                  <div className="h-px bg-zinc-700" />
                  <div className="text-emerald-400">✓ Open for new clients</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2 — Values */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">What We Stand For</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-2">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm text-center">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-base font-bold text-zinc-900 mb-2">{v.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — CTA strip */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ready to get your business online?
          </h2>
          <p className="text-white/80 mt-2">
            Let's build something great together. Get a free quote today.
          </p>
          <Button asChild className="bg-white text-emerald-700 hover:bg-zinc-100 font-semibold px-8 py-3 rounded-lg mt-6 h-auto">
            <Link to="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
