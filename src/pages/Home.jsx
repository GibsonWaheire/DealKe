// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

// ─── Data ────────────────────────────────────────────────────────────────────

const packages = [
  {
    name: 'Starter',
    price: '15,000',
    popular: false,
    features: ['1-page site', 'Mobile responsive', 'Contact form', '1 revision'],
  },
  {
    name: 'Business',
    price: '35,000',
    popular: true,
    features: ['Up to 5 pages', 'SEO setup', 'Google Maps', 'WhatsApp button', '3 revisions'],
  },
  {
    name: 'Premium',
    price: '65,000',
    popular: false,
    features: ['Up to 10 pages', 'CMS', 'Blog', 'Advanced SEO', 'Analytics', '5 revisions'],
  },
]

const testimonials = [
  {
    quote: 'Nilichukua website yangu live ndani ya siku 5. Exactly what I needed — clean, fast, works on phone.',
    name: 'Kamau W.',
    detail: 'Nairobi · Spare Parts Dealer',
  },
  {
    quote: 'KRA PIN ilihudumiwa same day. Nilikuwa nadhani itachukua wiki mzima.',
    name: 'Amina K.',
    detail: 'Mombasa · Graphic Designer',
  },
  {
    quote: 'Car sale agreement ilikuwa ready kabla ya lunch. No stress.',
    name: 'Brian O.',
    detail: 'Nakuru · Private Car Seller',
  },
]

const faqs = [
  {
    q: 'How long does it take to build my website?',
    a: 'Most websites are ready in 3–5 days. The longer packages take up to 7 days. It also depends on how quickly you send your content — the faster you respond, the faster we deliver.',
  },
  {
    q: 'Do I need to provide content?',
    a: "Yes — your text, logo, and photos. We'll tell you exactly what we need, and we can help with basic copy at no extra charge if you're stuck.",
  },
  {
    q: 'How do I pay?',
    a: 'M-Pesa, bank transfer, or cash. 50% upfront to start, balance on delivery. Simple.',
  },
  {
    q: 'Can I update the website myself after launch?',
    a: "Yes, if your package includes a CMS. If not, we offer a maintenance add-on, or we can train you to handle basic updates — usually takes under an hour.",
  },
  {
    q: 'How does KRA PIN registration work?',
    a: "Send us your ID details via WhatsApp. We log into iTax, complete the registration, and send you the certificate. Usually done the same day — no queues, no cyber café.",
  },
]

const servicePills = [
  'KRA Registration',
  'KRA Retrieval',
  'Car Sale Agreement',
  'Business Contract',
  'Affidavit',
  'Business Name Search',
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="min-h-[90vh] flex items-center bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
                Good websites shouldn't cost 150k.
              </h1>
              <p className="text-lg text-zinc-500 mt-4 max-w-lg">
                We build clean, fast sites for Kenyan businesses — starting from KES 15,000.
                KRA registration and contracts too.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium h-auto">
                  <Link to="/packages">See Website Packages</Link>
                </Button>
                <Button asChild variant="outline" className="border border-zinc-300 text-zinc-700 hover:bg-zinc-50 px-6 py-3 rounded-lg font-medium h-auto">
                  <Link to="/services">Other Services</Link>
                </Button>
              </div>
              <p className="text-xs text-zinc-400 mt-5">
                Last project delivered: <span className="text-zinc-500 font-medium">12 March 2026</span>
              </p>
            </div>

            {/* Right — value card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white rounded-2xl shadow-lg border border-zinc-100 w-full max-w-sm overflow-hidden">
                <div className="bg-emerald-500 px-6 py-4">
                  <p className="text-white text-xs font-medium uppercase tracking-wide">What you get with DealKe</p>
                  <p className="text-white/80 text-xs mt-0.5">No agency markup. Built by the person you talk to.</p>
                </div>
                <div className="divide-y divide-zinc-100">
                  {[
                    { icon: '🌐', title: 'Custom-built website', detail: 'Live in 3–7 days' },
                    { icon: '📱', title: 'Works on every phone', detail: 'Mobile-first, always' },
                    { icon: '📄', title: 'KRA & legal docs', detail: 'Usually same day' },
                    { icon: '💬', title: 'Support on WhatsApp', detail: 'Direct line, not a ticket system' },
                    { icon: '💳', title: 'Pay via M-Pesa', detail: '50% to start, rest on delivery' },
                  ].map(({ icon, title, detail }) => (
                    <div key={title} className="flex items-center gap-4 px-6 py-3.5">
                      <span className="text-xl shrink-0">{icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-zinc-800 leading-tight">{title}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">{detail}</p>
                      </div>
                      <span className="ml-auto text-emerald-500 text-base shrink-0">✓</span>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 bg-zinc-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-400">Starting from</p>
                    <p className="text-lg font-bold text-zinc-900">KES 15,000</p>
                  </div>
                  <Link
                    to="/contact"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats bar — asymmetric layout ─────────────────────────────────── */}
      <section className="bg-zinc-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 items-start">

            {/* Big first stat */}
            <div className="col-span-2 lg:col-span-1 lg:border-r lg:border-zinc-700 lg:pr-8">
              <div className="text-6xl font-bold text-emerald-400 leading-none">47</div>
              <div className="text-zinc-300 font-medium mt-1">projects delivered</div>
              <div className="text-zinc-500 text-xs mt-1.5">Nairobi, Mombasa, Kisumu, Nakuru & beyond</div>
            </div>

            {/* Smaller stats */}
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-emerald-400">6</div>
              <div className="text-zinc-400 text-sm mt-1">counties served</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-emerald-400">4.2</div>
              <div className="text-zinc-400 text-sm mt-1">day avg. turnaround</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-emerald-400">5.0★</div>
              <div className="text-zinc-400 text-sm mt-1">no bad reviews yet</div>
            </div>

          </div>
        </div>
      </section>

      {/* ── What we do ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-zinc-900">Two things we're good at.</h2>
            <p className="text-zinc-400 text-sm mt-1">Everything else we refer out rather than do it badly.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-zinc-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Websites</h3>
              <p className="text-zinc-500 text-sm mb-5">
                Custom-built, mobile-first sites. Not Wix. Not a template someone bought for $29.
                You get a real developer building something specific to your business.
              </p>
              <ul className="space-y-2 mb-6">
                {['Delivered in 3–7 days', 'Fixed price, no surprises', 'Works on every phone'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                    <span className="text-emerald-500 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link to="/packages" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700 transition-colors">
                See packages →
              </Link>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Digital paperwork</h3>
              <p className="text-zinc-500 text-sm mb-5">
                KRA PIN, car sale agreements, affidavits, business name searches.
                The stuff that wastes your afternoon if you try to do it yourself.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {servicePills.map(pill => (
                  <span key={pill} className="bg-zinc-100 text-zinc-700 text-sm px-3 py-1 rounded-full">
                    {pill}
                  </span>
                ))}
              </div>
              <Link to="/services" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700 transition-colors">
                See all services →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Packages ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Pricing</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-1">Prices are fixed. No surprises.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {packages.map(pkg => (
              <Card
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl transition-shadow ${
                  pkg.popular
                    ? 'bg-zinc-900 border-2 border-zinc-900 shadow-2xl md:-mt-4 md:-mb-4'
                    : 'border border-zinc-200 shadow-sm hover:shadow-md bg-white'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="flex flex-col flex-1 p-6 pt-8">
                  <h3 className={`text-lg font-bold ${pkg.popular ? 'text-white' : 'text-zinc-900'}`}>
                    {pkg.name}
                  </h3>
                  <div className="mt-2 mb-6">
                    <span className={`text-sm ${pkg.popular ? 'text-zinc-400' : 'text-zinc-500'}`}>KES </span>
                    <span className={`text-3xl font-bold ${pkg.popular ? 'text-white' : 'text-zinc-900'}`}>
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {pkg.features.map(f => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${pkg.popular ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <span className="text-emerald-400 font-bold shrink-0 mt-px">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`mt-8 w-full h-auto py-2.5 rounded-lg font-medium text-sm ${
                      pkg.popular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-white'
                        : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 shadow-none'
                    }`}
                  >
                    <Link to="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">From clients</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-1">What people actually said.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="border border-zinc-100 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="text-amber-400 text-base mb-3">★★★★★</div>
                  <p className="text-zinc-600 text-sm leading-relaxed">"{t.quote}"</p>
                  <div className="mt-4">
                    <div className="text-zinc-900 font-medium text-sm">{t.name}</div>
                    <div className="text-zinc-400 text-xs mt-0.5">{t.detail}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">FAQ</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-1">Common questions.</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-zinc-900 font-medium text-sm text-left hover:no-underline hover:text-emerald-600 transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA strip ─────────────────────────────────────────────────────── */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Stop putting it off.
          </h2>
          <p className="text-white/80 mt-2">
            Send a message. We'll reply today with a straight answer and a price.
          </p>
          <Button asChild className="bg-white text-emerald-700 hover:bg-zinc-100 font-semibold px-8 py-3 rounded-lg mt-6 h-auto">
            <Link to="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </section>

    </div>
  )
}
