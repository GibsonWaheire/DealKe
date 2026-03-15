// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

const whatsappUrl = 'https://wa.me/254700000000'

const heroSlides = [
  {
    headline: 'Websites built properly.',
    sub: 'Live in 5–10 days. Visible pricing. No surprises.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Website design workspace',
  },
  {
    headline: 'KRA sorted same day.',
    sub: 'PIN registration, returns filing, eTIMS — done fast.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    alt: 'Business admin work',
  },
  {
    headline: 'Documents without the queue.',
    sub: 'Contracts, affidavits, Good Conduct — handled from Nairobi.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    alt: 'Document processing',
  },
  {
    headline: 'One person. Direct answers.',
    sub: 'You talk to me — not a call centre. WhatsApp me now.',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Personal service',
  },
]

const featuredServices = [
  { name: 'KRA PIN Registration', price: 'KES 500', turnaround: 'Same day', note: 'Most requested' },
  { name: 'KRA PIN Retrieval', price: 'KES 300', turnaround: 'Same day' },
  { name: 'Car Sale Agreement', price: 'KES 800', turnaround: 'Same day' },
  { name: 'eCitizen Account Setup', price: 'KES 300', turnaround: 'Same day' },
  { name: 'Business Name Search', price: 'KES 400', turnaround: 'Same day' },
  { name: 'Passport Application', price: 'KES 600', turnaround: '1 business day' },
]

const websitePackages = [
  {
    name: 'Starter',
    price: 'KES 15,000',
    turnaround: '5–7 days',
    items: ['1 page', 'Mobile ready', 'Contact form', '1 revision'],
  },
  {
    name: 'Business',
    price: 'KES 35,000',
    turnaround: '7–10 days',
    items: ['5 pages', 'SEO setup', 'Google Maps', '3 revisions'],
    popular: true,
  },
  {
    name: 'Premium',
    price: 'KES 65,000',
    turnaround: '10–14 days',
    items: ['10 pages', 'CMS + Blog', 'Analytics', 'Priority support'],
  },
]

const testimonials = [
  { quote: 'My KRA PIN was sorted within hours. Direct communication, no delays.', name: 'James M.', location: 'Thika · Small Business Owner' },
  { quote: 'Website was live in 5 days. Clear process, proper delivery.', name: 'Grace W.', location: 'Nairobi · Salon Owner' },
  { quote: 'Car sale agreement was ready in 2 hours. Saved me a full day.', name: 'Brian O.', location: 'Kisumu · Private Seller' },
]

const faqs = [
  { q: 'How long does it take to build my website?', a: 'Most go live in 3 to 7 days. Depends on how fast you send content and feedback.' },
  { q: 'Do I need to provide content?', a: "Yes — text, logo, images. I'll tell you exactly what before we start." },
  { q: 'How do I pay?', a: 'M-Pesa, bank transfer, or cash. 50% upfront, balance on delivery.' },
  { q: 'Can I update the website after delivery?', a: 'Yes. Maintenance packages available, or I train you if CMS is included.' },
  { q: 'How does KRA PIN registration work?', a: 'Send your ID details on WhatsApp. I handle iTax and send the certificate — usually same day.' },
]

const stats = [
  { value: '47+', label: 'Projects delivered' },
  { value: '6', label: 'Counties served' },
  { value: '4.2 days', label: 'Avg website delivery' },
  { value: 'Same day', label: 'Most document services' },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [animating, setAnimating] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(false)
      setTimeout(() => {
        setSlide((prev) => (prev + 1) % heroSlides.length)
        setAnimating(true)
      }, 200)
    }, 3800)
    return () => clearInterval(interval)
  }, [])

  const current = heroSlides[slide]

  return (
    <div className="bg-white">

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-14 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left — animated copy */}
            <div>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200 animate-fade-in">
                🇰🇪 Nairobi, Kenya
              </span>

              <div className="mt-5 min-h-[120px] md:min-h-[100px]">
                <h1
                  key={slide}
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight transition-all duration-300 ${animating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                >
                  {current.headline}
                </h1>
                <p
                  key={`sub-${slide}`}
                  className={`text-slate-600 text-lg mt-3 max-w-md transition-all duration-300 delay-100 ${animating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                >
                  {current.sub}
                </p>
              </div>

              <p className="text-slate-500 text-sm mt-2 max-w-sm animate-fade-in-up delay-200">
                Send your request on WhatsApp. You get a direct answer, a clear price, and a real delivery time — no back-and-forth.
              </p>

              <div className="flex flex-wrap gap-3 mt-7 animate-fade-in-up delay-300">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                <Link
                  to="/services"
                  className="border border-slate-300 text-slate-700 hover:border-slate-500 hover:text-slate-900 font-medium px-6 py-3 rounded-xl transition-colors"
                >
                  See all services
                </Link>
              </div>

              {/* Slide indicators */}
              <div className="flex gap-1.5 mt-8 animate-fade-in delay-400">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setSlide(i); setAnimating(true) }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'w-6 bg-emerald-500' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right — cycling image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  key={slide}
                  src={current.image}
                  alt={current.alt}
                  className={`w-full h-[400px] object-cover transition-all duration-500 ${animating ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  loading="eager"
                />
                {/* Overlay badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-white/60 rounded-lg px-3 py-1.5 shadow-sm">
                  <p className="text-slate-700 text-xs font-semibold">Last delivered: 12 Mar 2026</p>
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-5 left-4 right-4 bg-white rounded-xl border border-gray-100 shadow-lg p-4">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Recent deliveries</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div><p className="font-semibold text-slate-900 text-xs">KRA PIN</p><p className="text-slate-400 text-xs">2 hrs</p></div>
                  <div><p className="font-semibold text-slate-900 text-xs">Business Website</p><p className="text-slate-400 text-xs">4 days</p></div>
                  <div><p className="font-semibold text-slate-900 text-xs">Car Agreement</p><p className="text-slate-400 text-xs">Same day</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-10 mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-slate-900">{s.value}</p>
                <p className="text-slate-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick announcement ──────────────────────────────── */}
      <div className="bg-emerald-500 text-white py-3 text-center text-sm font-medium">
        📲 Quick order? WhatsApp{' '}
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="underline">
          +254 700 000 000
        </a>
        {' '}— get a reply today.
      </div>

      {/* ── Featured services ───────────────────────────────── */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
            <div>
              <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3">Popular services</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Most requested, fastest turnaround</h2>
              <p className="text-slate-500 text-sm mb-8">Full catalog with 70+ services is on the Services page.</p>

              <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                {featuredServices.map((svc) => (
                  <div key={svc.name} className="flex items-center justify-between gap-4 px-5 py-3.5 bg-white hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className="text-slate-800 font-medium text-sm truncate">{svc.name}</span>
                      {svc.note && (
                        <span className="hidden sm:inline bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">
                          {svc.note}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-slate-900 font-bold text-sm">{svc.price}</span>
                      <span className="text-slate-400 text-xs hidden sm:inline">{svc.turnaround}</span>
                      <a
                        href={`https://wa.me/254700000000?text=${encodeURIComponent(`Hi, I need ${svc.name}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 text-xs font-semibold group-hover:underline"
                      >
                        Order →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 text-sm font-medium mt-5 underline underline-offset-2"
              >
                View all 70+ services →
              </Link>
            </div>

            <div className="space-y-4 lg:pt-14">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                alt="Business admin support"
                className="w-full h-52 object-cover rounded-2xl"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80"
                alt="Website development workspace"
                className="w-full h-52 object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Website packages ────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3">Website packages</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Fixed scope. Visible pricing.</h2>
          <p className="text-slate-500 text-sm mb-10">No surprise costs halfway through. You know the price before we start.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {websitePackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-6 flex flex-col ${
                  pkg.popular
                    ? 'bg-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <span className="self-start bg-white text-emerald-600 text-xs font-semibold px-2 py-0.5 rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-xl font-bold ${pkg.popular ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
                <p className={`text-2xl font-bold mt-1 ${pkg.popular ? 'text-white' : 'text-slate-900'}`}>{pkg.price}</p>
                <p className={`text-xs mt-0.5 ${pkg.popular ? 'text-emerald-100' : 'text-slate-400'}`}>{pkg.turnaround}</p>

                <ul className="mt-4 space-y-2 flex-1">
                  {pkg.items.map((item) => (
                    <li key={item} className={`flex items-center gap-2 text-sm ${pkg.popular ? 'text-emerald-50' : 'text-slate-600'}`}>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${pkg.popular ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'}`}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/254700000000?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.name} website package`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-6 block text-center font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors ${
                    pkg.popular
                      ? 'bg-white text-emerald-600 hover:bg-emerald-50'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  Get started →
                </a>
              </div>
            ))}
          </div>

          <p className="text-slate-400 text-xs text-center mt-6">
            Need something custom?{' '}
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-slate-600 underline">
              WhatsApp to discuss
            </a>
          </p>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3">Client feedback</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">What people actually said.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-slate-50 border border-gray-100 rounded-2xl p-6">
                <p className="text-amber-400 text-sm tracking-widest">★★★★★</p>
                <p className="text-slate-700 text-sm leading-relaxed mt-3">"{t.quote}"</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-slate-900 font-semibold text-sm">— {t.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Common questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`} className="border-gray-200">
                <AccordionTrigger className="text-slate-900 text-sm font-medium text-left hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3">Get started</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Stop putting it off.</h2>
          <p className="text-slate-500 text-base mb-8">
            Send a message now. You&apos;ll get a straight answer and a clear next step — today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <Link
              to="/contact"
              className="border border-slate-300 text-slate-700 hover:border-slate-500 hover:text-slate-900 font-medium px-7 py-3.5 rounded-xl transition-colors"
            >
              Send a quote request
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
