// src/pages/About.jsx
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const differentiators = [
  {
    icon: '🤝',
    title: 'You talk to the person building it',
    description:
      "No account manager relaying your feedback to a junior. I'm the one on WhatsApp and I'm the one writing the code.",
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
      "Most agencies go quiet after the initial contact. I'm on WhatsApp before, during, and after every project.",
  },
]

export default function About() {
  return (
    <div className="bg-white">
      <PageHeader
        label="About"
        title="I built DealFlow because I was tired of watching small businesses get ripped off."
        subtitle="Good digital work doesn't have to cost a fortune."
        images={[
          { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80', alt: 'Modern office' },
          { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80', alt: 'Laptop workspace' },
        ]}
      />

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
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
                DealFlow started as a side project to fix both of those things. Now it's my full-time
                work. I build every website personally — no subcontracting, no templates, no agency
                overhead. For KRA and document work, I've done it enough times that I handle it in hours.
              </p>
              <p className="text-slate-900 font-semibold">
                If you have a question, just message me directly on WhatsApp. You'll get a straight answer.
              </p>
            </div>

            {/* Profile card */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6 w-full max-w-sm shadow-sm">
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
                    G
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Gibson Waheire</p>
                    <p className="text-slate-400 text-xs">Founder, DealFlow</p>
                  </div>
                  <span className="ml-auto bg-emerald-50 text-emerald-600 text-xs px-2 py-0.5 rounded-full border border-emerald-100 font-medium">
                    Available
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location</span>
                    <span className="text-slate-800 font-medium">Nairobi, Kenya 🇰🇪</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Building since</span>
                    <span className="text-slate-800 font-medium">2019</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stack</span>
                    <span className="text-slate-800 font-medium">React · Node · Tailwind</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Projects delivered</span>
                    <span className="text-slate-800 font-medium">47+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last delivery</span>
                    <span className="text-slate-800 font-medium">12 March 2026</span>
                  </div>
                </div>
                <a
                  href="https://wa.me/254726899113"
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-5 text-center bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 bg-slate-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-2">Why us</p>
            <h2 className="text-2xl font-bold text-slate-900">What makes DealFlow different</h2>
            <p className="text-slate-500 text-sm mt-1">Compared to a random freelancer on Facebook or a Nairobi agency.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((d) => (
              <div key={d.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-2xl mb-3">{d.icon}</div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{d.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            If you have a question, just ask.
          </h2>
          <p className="text-slate-500 text-sm mb-7">
            No sales pitch. Send a message and you'll get a straight answer and a price.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Send a Message
          </Link>
        </div>
      </section>
    </div>
  )
}
