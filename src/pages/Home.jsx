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

const stats = [
  { value: '50+',  label: 'Projects Delivered' },
  { value: '100%', label: 'Kenyan-Owned' },
  { value: '3 Day', label: 'Avg. Turnaround' },
  { value: '5★',   label: 'Client Satisfaction' },
]

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
    features: ['Up to 5 pages', 'SEO setup', 'Google Maps', 'Social links', '3 revisions'],
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
    quote: 'Got my business website live in 4 days. Clean, fast, and exactly what I needed. Highly recommend.',
    name: 'James M.',
    detail: 'Nairobi · Retail Business Owner',
  },
  {
    quote: 'KRA PIN sorted in hours. Simple process, very professional.',
    name: 'Amina K.',
    detail: 'Mombasa · Freelancer',
  },
  {
    quote: 'The car sale agreement was ready same day. Saved me a lot of stress.',
    name: 'Brian O.',
    detail: 'Nakuru · Private Seller',
  },
]

const faqs = [
  {
    q: 'How long does it take to build my website?',
    a: 'Most websites are delivered within 3–7 business days depending on the package and how quickly you provide content and feedback.',
  },
  {
    q: 'Do I need to provide content for my website?',
    a: "Yes, you'll need to provide your text, logo, and any images. We can guide you on what's needed — we also offer basic copywriting assistance at no extra charge.",
  },
  {
    q: 'How do I pay?',
    a: 'We accept M-Pesa, bank transfer, and cash. A 50% deposit is required to start, with the balance due on delivery.',
  },
  {
    q: 'Can I update my website after it\'s delivered?',
    a: 'Yes. We offer ongoing maintenance packages, or we can train you to manage content yourself if a CMS is included in your package.',
  },
  {
    q: 'How does KRA PIN registration work?',
    a: 'You send us your ID details, we handle the iTax portal registration and send you the PIN certificate — usually same day.',
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

      {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
      <section className="min-h-[90vh] flex items-center bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — text */}
            <div>
              <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
                🇰🇪 Built for Kenya
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
                Affordable Websites &amp; Digital Services for Kenyan Businesses
              </h1>
              <p className="text-lg text-zinc-500 mt-4 max-w-lg">
                From professional websites to KRA registration and contracts — get it done fast, at a price that makes sense.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium h-auto">
                  <Link to="/packages">See Website Packages</Link>
                </Button>
                <Button asChild variant="outline" className="border border-zinc-300 text-zinc-700 hover:bg-zinc-50 px-6 py-3 rounded-lg font-medium h-auto">
                  <Link to="/services">View Other Services</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 mt-5">
                {['Fast delivery', 'Transparent pricing', 'Kenyan-owned'].map(item => (
                  <span key={item} className="text-sm text-zinc-400">✓ {item}</span>
                ))}
              </div>
            </div>

            {/* Right — terminal card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-zinc-900 rounded-2xl p-6 w-full max-w-sm font-mono text-sm shadow-xl ring-1 ring-white/10">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-zinc-500 text-xs">dealke ~ project-status</span>
                </div>
                <div className="space-y-2.5 text-zinc-300">
                  <div className="text-emerald-400 font-semibold">$ project status --latest</div>
                  <div className="h-px bg-zinc-700" />
                  <div className="flex justify-between">
                    <span className="text-zinc-500">client</span>
                    <span>Nairobi Bakery Co.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">package</span>
                    <span>Business Website</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">turnaround</span>
                    <span>5 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">status</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
                      Live
                    </span>
                  </div>
                  <div className="h-px bg-zinc-700" />
                  <div className="text-emerald-400">✓ Project delivered successfully</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 2: Stats bar ─────────────────────────────────────────── */}
      <section className="bg-zinc-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center md:border-r md:border-zinc-700 last:border-0">
                <div className="text-3xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-sm text-zinc-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Services overview ────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">What We Do</span>
            <h2 className="text-3xl font-bold text-zinc-900 mt-2">Everything your business needs online</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Website packages */}
            <div className="bg-zinc-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Website Packages</h3>
              <p className="text-zinc-500 text-sm mb-5">
                Professional websites designed for Kenyan businesses — built fast, priced fairly.
              </p>
              <ul className="space-y-2 mb-6">
                {['Delivered in 3–7 business days', 'Affordable fixed pricing', 'Fully mobile-first design'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                    <span className="text-emerald-500 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link to="/packages" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700 transition-colors">
                See Packages →
              </Link>
            </div>

            {/* Other digital services */}
            <div className="bg-zinc-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Other Digital Services</h3>
              <p className="text-zinc-500 text-sm mb-5">
                Quick, reliable help with the paperwork and registrations every business needs.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {servicePills.map(pill => (
                  <span key={pill} className="bg-zinc-100 text-zinc-700 text-sm px-3 py-1 rounded-full">
                    {pill}
                  </span>
                ))}
              </div>
              <Link to="/services" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700 transition-colors">
                View All Services →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 4: Packages preview ──────────────────────────────────── */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Simple Pricing</span>
            <h2 className="text-3xl font-bold text-zinc-900 mt-2">Website Packages</h2>
            <p className="text-zinc-500 mt-2">No hidden costs. No surprises. Just clean, fast websites.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <Card
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl shadow-sm ${
                  pkg.popular
                    ? 'border-2 border-emerald-500'
                    : 'border border-zinc-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="flex flex-col flex-1 p-6 pt-8">
                  <h3 className="text-lg font-bold text-zinc-900">{pkg.name}</h3>
                  <div className="mt-2 mb-6">
                    <span className="text-sm text-zinc-500">KES </span>
                    <span className="text-3xl font-bold text-zinc-900">{pkg.price}</span>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-zinc-600">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`mt-8 w-full h-auto py-2.5 rounded-lg font-medium text-sm ${
                      pkg.popular
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
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

      {/* ── Section 5: Testimonials ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Testimonials</span>
            <h2 className="text-3xl font-bold text-zinc-900 mt-2">What Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="border border-zinc-100 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="text-amber-400 text-base mb-3">★★★★★</div>
                  <p className="text-zinc-600 italic text-sm leading-relaxed">"{t.quote}"</p>
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

      {/* ── Section 6: FAQ ───────────────────────────────────────────────── */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">FAQ</span>
            <h2 className="text-3xl font-bold text-zinc-900 mt-2">Frequently Asked Questions</h2>
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

      {/* ── Section 7: CTA strip ─────────────────────────────────────────── */}
      <section className="bg-emerald-600 py-20">
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
