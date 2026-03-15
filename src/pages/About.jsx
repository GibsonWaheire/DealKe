// src/pages/About.jsx
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { Button } from '../ui/button'

const differentiators = [
  {
    icon: '🤝',
    title: 'You talk to the person building it',
    description:
      "No account manager who relays your feedback to a junior. I'm the one on WhatsApp and I'm the one writing the code.",
  },
  {
    icon: '🏷️',
    title: 'Prices are posted publicly',
    description:
      "You know what it costs before you ask. No 'send us your requirements for a custom quote' runaround.",
  },
  {
    icon: '📲',
    title: 'WhatsApp support that actually works',
    description:
      "Most agencies give you a WhatsApp number for initial contact and then disappear. I'm actually on it — before, during, and after the project.",
  },
]

export default function About() {
  return (
    <div>
      <PageHeader
        label="About"
        title="I built DealKe because I was tired of watching small businesses get ripped off."
        subtitle="Good digital work doesn't have to cost a fortune."
      />

      {/* Section 1 — Story (first person) */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Text */}
            <div>
              <div className="space-y-4 text-zinc-600 text-sm leading-relaxed">
                <p>
                  I'm a developer based in Nairobi. I've been building websites since 2019 —
                  e-commerce stores, business sites, landing pages, internal tools.
                </p>
                <p>
                  The problem I kept seeing: a small shop in Westlands needs a website. They get
                  quoted KES 80,000 from an agency. They can't afford it, so they stay on Facebook
                  with a blurry cover photo and a pinned post from 2021.
                </p>
                <p>
                  Or someone needs a KRA PIN and they spend half their day queuing at a cyber café,
                  getting the wrong advice, and leaving without it done.
                </p>
                <p>
                  DealKe started as a side project to fix both of those things. Now it's my full-time
                  thing. I build every website personally — no subcontracting, no templates, no agency
                  overhead. And for KRA and document work, I've done it enough times that I can handle
                  it in hours.
                </p>
                <p className="text-zinc-900 font-medium">
                  If you have a question, just message me directly on WhatsApp. I'll give you a
                  straight answer.
                </p>
              </div>
            </div>

            {/* Founder card */}
            <div className="flex justify-center lg:justify-start">
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
                    <span className="text-zinc-500">location</span>
                    <span>Nairobi, Kenya 🇰🇪</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">building since</span>
                    <span>2019</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">stack</span>
                    <span>React · Node · Tailwind</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">projects</span>
                    <span className="text-emerald-400">47 delivered</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">last delivery</span>
                    <span className="text-zinc-300">12 March 2026</span>
                  </div>
                  <div className="h-px bg-zinc-700" />
                  <div className="text-emerald-400">✓ Taking on new projects</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2 — What makes DealKe different */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Why us</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-1">What's different about DealKe</h2>
            <p className="text-zinc-400 text-sm mt-1">Compared to a random freelancer on Facebook or a Nairobi agency.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((d) => (
              <div key={d.title} className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                <div className="text-2xl mb-3">{d.icon}</div>
                <h3 className="text-sm font-bold text-zinc-900 mb-2 leading-snug">{d.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — CTA */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            If you have a question, just ask.
          </h2>
          <p className="text-white/80 mt-2">
            No sales pitch. Send a message, get a straight answer and a price.
          </p>
          <Button asChild className="bg-white text-emerald-700 hover:bg-zinc-100 font-semibold px-8 py-3 rounded-lg mt-6 h-auto">
            <Link to="/contact">Send a Message</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
