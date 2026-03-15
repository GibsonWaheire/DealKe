// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

const WA_NUMBER = '254726899113'
const WA_BASE   = `https://wa.me/${WA_NUMBER}`
const WA_PHONE  = '+254 726 899 113'

const waLink = (msg) => `${WA_BASE}?text=${encodeURIComponent(msg)}`

// All images: abstract / no visible people
const heroSlides = [
  {
    headline: 'Websites built properly.',
    sub: 'Landing pages, business sites, e-commerce — from KES 12,000.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    alt: 'Laptop with analytics dashboard',
  },
  {
    headline: 'KRA sorted same day.',
    sub: 'PIN registration, returns filing, eTIMS — done fast.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
    alt: 'Pen on documents',
  },
  {
    headline: 'Networks, POS & IT setup.',
    sub: 'Home networking, office IT, POS systems, TV installation — all in one place.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
    alt: 'Network equipment',
  },
  {
    headline: 'Documents without the queue.',
    sub: 'Contracts, affidavits, Good Conduct — handled from Nairobi.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Modern office interior',
  },
  {
    headline: 'Odoo ERP for your business.',
    sub: 'CRM, accounting, inventory, POS — set up and running fast.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    alt: 'Business dashboard',
  },
  {
    headline: 'One person. Direct answers.',
    sub: 'Talk to me directly on WhatsApp — not a call centre.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    alt: 'Smartphone on desk',
  },
]

const featuredServices = [
  { name: 'KRA PIN Registration',     price: 'KES 500',   turnaround: 'Same day',       note: 'Most requested' },
  { name: 'KRA PIN Retrieval',         price: 'KES 300',   turnaround: 'Same day' },
  { name: 'Car Sale Agreement',        price: 'KES 800',   turnaround: 'Same day' },
  { name: 'POS System Setup (retail)', price: 'KES 5,000', turnaround: '1 business day' },
  { name: 'Home Wi-Fi Setup',          price: 'KES 2,000', turnaround: 'Same day' },
  { name: 'Logo Design',               price: 'KES 2,500', turnaround: '2 business days' },
]

const websitePackages = [
  {
    name: 'Landing Page',
    price: 'KES 12,000',
    turnaround: '3–5 days',
    bestFor: 'Campaigns, single products, events',
    items: ['1 scrollable page', 'WhatsApp / CTA button', 'Mobile responsive', '2 revision rounds'],
  },
  {
    name: 'Business Website',
    price: 'KES 40,000',
    turnaround: '7–10 days',
    bestFor: 'Growing businesses, services, restaurants',
    items: ['Up to 8 pages', 'Full SEO + Analytics', 'WhatsApp chat integration', '3 revision rounds'],
    popular: true,
  },
  {
    name: 'E-commerce',
    price: 'KES 80,000',
    turnaround: '14–21 days',
    bestFor: 'Shops, retailers, online stores',
    items: ['Full online store', 'M-Pesa STK push', 'Admin dashboard', 'Priority support'],
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
  { value: '47+',      label: 'Projects delivered' },
  { value: '6',        label: 'Counties served' },
  { value: '4.2 days', label: 'Avg website delivery' },
  { value: 'Same day', label: 'Most document services' },
]

const TILL = '4703506'

const templateCategories = [
  {
    id: 'mpesa', label: 'M-Pesa Business',
    templates: [
      { name: 'Buy Goods Till Number Template', price: 50 },
      { name: 'Lipa Na M-Pesa Pay Bill Number Template', price: 50 },
      { name: 'Lipa Na Pochi La Biashara Template', price: 50 },
      { name: 'M-Pesa Agent Number Sticker', price: 50 },
    ],
  },
  {
    id: 'financial', label: 'Financial',
    templates: [
      { name: 'Delivery Note Template', price: 0 },
      { name: 'Invoice Template', price: 0 },
      { name: 'Cash Sale Receipt Template', price: 50 },
      { name: 'Petty Cash Voucher Template', price: 50 },
      { name: 'Payroll Deduction Authorization Form', price: 50 },
      { name: 'Salary Advance Request Template', price: 50 },
      { name: 'Fixed Asset Register Template', price: 50 },
    ],
  },
  {
    id: 'legal', label: 'Legal & Agreements',
    templates: [
      { name: 'Business Shop Lease Agreement', price: 50 },
      { name: 'Land Lease Agreement', price: 50 },
      { name: 'Land Sale Agreement', price: 50 },
      { name: 'Car Lease Agreement', price: 50 },
      { name: 'Car Sale Agreement', price: 50 },
      { name: 'Motorbike Lease Agreement', price: 50 },
      { name: 'Motorbike Sales Agreement', price: 50 },
      { name: 'Business Partnership Agreement', price: 50 },
      { name: 'Managed IT Services Agreement', price: 50 },
      { name: 'Independent Contractor Agreement', price: 50 },
      { name: 'Shareholder Loan Agreement', price: 50 },
      { name: 'Freelance Graphic Design Contract', price: 50 },
      { name: 'Contractor Non-Disclosure Agreement', price: 50 },
    ],
  },
  {
    id: 'hr', label: 'HR & Employment',
    templates: [
      { name: 'Employment Agreement Form', price: 50 },
      { name: 'Employment Verification Letter', price: 0 },
      { name: 'Job Confirmation Letter', price: 0 },
      { name: 'Employee Suspension Letter', price: 50 },
      { name: 'Termination Letter', price: 50 },
      { name: 'Workplace Incident Report Form', price: 50 },
      { name: 'Company Policy Acknowledgement Form', price: 50 },
    ],
  },
  {
    id: 'academic', label: 'Academic',
    templates: [
      { name: 'Scholarship CV Template', price: 0 },
      { name: 'Scholarship Motivation Letter', price: 0 },
      { name: 'Scholarship Thank You Letter', price: 0 },
      { name: 'School Infrastructure Development Plan', price: 50 },
      { name: 'BOM Minutes Template', price: 50 },
    ],
  },
  {
    id: 'career', label: 'Career & CV',
    templates: [
      { name: 'Simple Cover Letter Template', price: 0 },
      { name: 'General Cover Letter Template', price: 0 },
      { name: 'Application Letter for Attachment', price: 0 },
      { name: 'Simple CV Template', price: 0 },
      { name: 'General CV Template', price: 0 },
      { name: 'Letter of Intent for Job Promotion', price: 50 },
      { name: 'Thank You Letter Template', price: 0 },
    ],
  },
  {
    id: 'medical', label: 'Medical & Legal',
    templates: [
      { name: 'Medical Form Template (PDF)', price: 50 },
      { name: 'Last Will Template', price: 50 },
    ],
  },
]

const WaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [visible, setVisible] = useState(true)

  // Templates
  const [tmplTab, setTmplTab] = useState('mpesa')

  // Calculators
  const [calcTab, setCalcTab] = useState('VAT')
  const [vatAmount, setVatAmount] = useState('')
  const [vatMode, setVatMode] = useState('excl')
  const [levySalary, setLevySalary] = useState('')
  const [shifSalary, setShifSalary] = useState('')
  const [loanP, setLoanP] = useState('')
  const [loanR, setLoanR] = useState('')
  const [loanN, setLoanN] = useState('')
  const [qrText, setQrText] = useState('')
  const [qrSrc, setQrSrc] = useState('')

  // Calc helpers
  const vatNum = parseFloat(vatAmount) || 0
  const vatExcl = vatMode === 'excl' ? vatNum : vatNum / 1.16
  const vatAmt  = vatExcl * 0.16
  const vatIncl = vatExcl + vatAmt

  const levy = (parseFloat(levySalary) || 0) * 0.015

  const shif = Math.max((parseFloat(shifSalary) || 0) * 0.0275, shifSalary ? 300 : 0)

  const loanMonthly = (() => {
    const p = parseFloat(loanP) || 0
    const r = (parseFloat(loanR) || 0) / 12 / 100
    const n = parseInt(loanN) || 0
    if (!p || !r || !n) return null
    const m = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    return { monthly: m, total: m * n, interest: m * n - p }
  })()

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setSlide((prev) => (prev + 1) % heroSlides.length)
        setVisible(true)
      }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const current = heroSlides[slide]

  return (
    <div className="bg-white">

      {/* ── Hero ─ full-bleed background slider ───────────── */}
      <section className="relative h-[88vh] min-h-[560px] max-h-[820px] overflow-hidden">

        {/* Background layers with Ken Burns */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 overflow-hidden transition-opacity duration-700"
            style={{ opacity: i === slide ? 1 : 0, pointerEvents: 'none' }}
          >
            <img
              src={s.image}
              alt={s.alt}
              className={`w-full h-full object-cover ${i % 2 === 0 ? 'animate-kb-a' : 'animate-kb-b'}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/45 to-transparent" />

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30 w-fit animate-fade-in">
            🇰🇪 Nairobi, Kenya
          </span>

          <div className="mt-5 min-h-[110px]">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {current.headline}
            </h1>
            <p
              className={`text-white/80 text-lg mt-3 max-w-lg transition-all duration-500 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            >
              {current.sub}
            </p>
          </div>

          <p className="text-white/55 text-sm mt-2 max-w-sm">
            Send your request on WhatsApp. Direct answer, clear price, paid via M-Pesa.
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <a
              href={waLink('Hi, I have an enquiry')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg"
            >
              <WaIcon />
              Chat on WhatsApp
            </a>
            <Link
              to="/services"
              className="border border-white/40 text-white hover:bg-white/10 font-medium px-6 py-3 rounded-xl transition-colors backdrop-blur-sm"
            >
              See all services
            </Link>
          </div>

          {/* Dots */}
          <div className="flex gap-1.5 mt-10">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setSlide(i); setVisible(true) }}
                className={`h-1 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-emerald-400' : 'w-2 bg-white/35 hover:bg-white/55'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom frosted bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md border-t border-white/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 grid grid-cols-3 gap-4">
            <div><p className="text-white font-semibold text-sm">KRA PIN</p><p className="text-white/55 text-xs">2 hrs</p></div>
            <div><p className="text-white font-semibold text-sm">Business Website</p><p className="text-white/55 text-xs">4 days</p></div>
            <div><p className="text-white font-semibold text-sm">Car Agreement</p><p className="text-white/55 text-xs">Same day</p></div>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-10">
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

      {/* ── How it works ───────────────────────────────────── */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <span className="text-slate-300">WhatsApp your request</span>
            </div>
            <span className="hidden sm:block text-slate-600 mx-4">→</span>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <span className="text-slate-300">Confirm price · Pay via M-Pesa</span>
            </div>
            <span className="hidden sm:block text-slate-600 mx-4">→</span>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <span className="text-slate-300">Service delivered — usually same day</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured services ──────────────────────────────── */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
            <div>
              <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3">Popular services</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Most requested, fastest turnaround</h2>
              <p className="text-slate-500 text-sm mb-8">Full catalog with 70+ services is on the Services page.</p>

              <div className="border border-gray-100 rounded-xl overflow-hidden">
                {/* Header row */}
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-5 py-2.5 bg-slate-50 border-b border-gray-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Service</span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide text-right">Price</span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide text-right hidden sm:block">Time</span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide text-right">Order</span>
                </div>
                {featuredServices.map((svc, i) => (
                  <div
                    key={svc.name}
                    className={`grid grid-cols-[1fr_auto_auto_auto] gap-3 px-5 py-3.5 items-center hover:bg-slate-50 transition-colors ${i > 0 ? 'border-t border-gray-100' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className="text-slate-800 font-medium text-sm truncate">{svc.name}</span>
                      {svc.note && (
                        <span className="hidden sm:inline bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">
                          {svc.note}
                        </span>
                      )}
                    </div>
                    <span className="text-slate-900 font-bold text-sm text-right whitespace-nowrap">{svc.price}</span>
                    <span className="text-slate-400 text-xs text-right whitespace-nowrap hidden sm:block">{svc.turnaround}</span>
                    <a
                      href={waLink(`Hi, I'd like to order ${svc.name}. Please confirm the price and M-Pesa payment details.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <WaIcon /> Order
                    </a>
                  </div>
                ))}
              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 text-sm font-medium mt-5 underline underline-offset-2"
              >
                View all 70+ services →
              </Link>
            </div>

            <div className="space-y-4 lg:pt-14">
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80"
                alt="Documents and pen"
                className="w-full h-52 object-cover rounded-2xl"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                alt="Laptop workspace"
                className="w-full h-52 object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Website packages ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-2">Website packages</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Fixed scope. Visible pricing.</h2>
              <p className="text-slate-500 text-sm mt-1">You know the exact price before we start. No hidden charges.</p>
            </div>
            <Link
              to="/packages"
              className="text-sm text-slate-600 hover:text-slate-900 font-medium underline underline-offset-2 whitespace-nowrap"
            >
              Compare all details →
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {websitePackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl bg-white transition-shadow ${
                  pkg.popular
                    ? 'border-2 border-emerald-500 shadow-xl shadow-emerald-100'
                    : 'border border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular ribbon */}
                {pkg.popular && (
                  <div className="absolute -top-px left-0 right-0 h-1 rounded-t-2xl bg-emerald-500" />
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* Badge */}
                  {pkg.popular && (
                    <span className="self-start bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200 mb-4">
                      Most Popular
                    </span>
                  )}

                  {/* Name + best for */}
                  <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{pkg.bestFor}</p>

                  {/* Price */}
                  <div className="mt-5 pb-5 border-b border-gray-100">
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{pkg.price}</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg className="text-emerald-500 shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span className="text-slate-400 text-xs">{pkg.turnaround}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="mt-5 space-y-3 flex-1">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={waLink(`Hi, I'm interested in the ${pkg.name} (${pkg.price}). Please confirm and share M-Pesa payment details.`)}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-7 flex items-center justify-center gap-2 font-semibold text-sm px-4 py-3 rounded-xl transition-colors ${
                      pkg.popular
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <WaIcon /> Get started
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
            <p className="text-slate-400 text-xs">All packages include: mobile-first design · 30-day support · SSL advice · domain guidance</p>
            <a
              href={waLink('Hi, I need a custom website quote')}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-slate-800 text-xs underline underline-offset-2 whitespace-nowrap"
            >
              Need something custom? WhatsApp →
            </a>
          </div>

        </div>
      </section>

      {/* ── Templates ──────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-2">Templates</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Ready-made Kenyan templates</h2>
              <p className="text-slate-500 text-sm mt-1">
                Free or KES 50 · Pay via M-Pesa Till <span className="font-semibold text-slate-700">{TILL}</span> · Sent on WhatsApp
              </p>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {templateCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setTmplTab(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tmplTab === cat.id
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Templates grid */}
          {templateCategories.filter(c => c.id === tmplTab).map((cat) => (
            <div key={cat.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.templates.map((t) => (
                <div key={t.name} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${
                      t.price === 0
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {t.price === 0 ? 'Free' : `KES ${t.price}`}
                    </span>
                  </div>
                  <p className="text-slate-800 font-medium text-sm leading-snug flex-1">{t.name}</p>
                  <a
                    href={t.price === 0
                      ? waLink(`Hi, please send me the "${t.name}" (free template).`)
                      : waLink(`Hi, I'd like the "${t.name}" template. Please share M-Pesa Till details for KES ${t.price}.`)
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    <WaIcon /> {t.price === 0 ? 'Get Free' : `Order · KES ${t.price}`}
                  </a>
                </div>
              ))}
            </div>
          ))}

          <p className="text-slate-400 text-xs mt-8">
            All templates are fully editable in Word, PDF or Excel. Sent via WhatsApp within minutes of payment confirmation.
          </p>
        </div>
      </section>

      {/* ── Free Tools & Calculators ───────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-2">Free tools</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Kenya calculators & generators</h2>
            <p className="text-slate-500 text-sm mt-1">100% free. No sign-up required.</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['VAT', 'Housing Levy', 'SHIF', 'Loan Repayment', 'QR Code'].map((tab) => (
              <button
                key={tab}
                onClick={() => setCalcTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  calcTab === tab
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-gray-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6">

              {/* VAT Calculator */}
              {calcTab === 'VAT' && (
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900">VAT Calculator <span className="text-slate-400 font-normal text-sm">(Kenya 16%)</span></h3>
                  <div className="flex rounded-lg overflow-hidden border border-gray-200 w-fit">
                    {[['excl', 'Add VAT'], ['incl', 'Extract VAT']].map(([m, l]) => (
                      <button key={m} onClick={() => { setVatMode(m); setVatAmount('') }}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${vatMode === m ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Amount {vatMode === 'excl' ? '(excl. VAT)' : '(incl. VAT)'} — KES
                    </label>
                    <input
                      type="number"
                      value={vatAmount}
                      onChange={e => setVatAmount(e.target.value)}
                      placeholder="e.g. 10000"
                      className="mt-1.5 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-emerald-400 bg-white"
                    />
                  </div>
                  {vatNum > 0 && (
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      {[
                        ['Amount (excl. VAT)', `KES ${vatExcl.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                        ['VAT (16%)',           `KES ${vatAmt.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                        ['Total (incl. VAT)',   `KES ${vatIncl.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ].map(([label, value], i) => (
                        <div key={label} className={`flex justify-between items-center px-4 py-3 ${i > 0 ? 'border-t border-gray-100' : ''} ${i === 2 ? 'bg-emerald-50' : 'bg-white'}`}>
                          <span className={`text-sm ${i === 2 ? 'font-bold text-emerald-800' : 'text-slate-600'}`}>{label}</span>
                          <span className={`text-sm font-bold ${i === 2 ? 'text-emerald-700' : 'text-slate-900'}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Housing Levy */}
              {calcTab === 'Housing Levy' && (
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900">Affordable Housing Levy <span className="text-slate-400 font-normal text-sm">(1.5% employee + 1.5% employer)</span></h3>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Gross Monthly Salary — KES</label>
                    <input
                      type="number"
                      value={levySalary}
                      onChange={e => setLevySalary(e.target.value)}
                      placeholder="e.g. 50000"
                      className="mt-1.5 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-emerald-400 bg-white"
                    />
                  </div>
                  {levySalary && (
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      {[
                        ['Gross Salary',           `KES ${(parseFloat(levySalary)).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                        ['Employee Deduction (1.5%)', `KES ${levy.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                        ['Employer Contribution (1.5%)', `KES ${levy.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                        ['Net Pay (after deduction)', `KES ${((parseFloat(levySalary) || 0) - levy).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ].map(([label, value], i) => (
                        <div key={label} className={`flex justify-between items-center px-4 py-3 ${i > 0 ? 'border-t border-gray-100' : ''} ${i === 3 ? 'bg-emerald-50' : 'bg-white'}`}>
                          <span className={`text-sm ${i === 3 ? 'font-bold text-emerald-800' : 'text-slate-600'}`}>{label}</span>
                          <span className={`text-sm font-bold ${i === 3 ? 'text-emerald-700' : 'text-slate-900'}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SHIF */}
              {calcTab === 'SHIF' && (
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900">SHIF Deduction <span className="text-slate-400 font-normal text-sm">(2.75% · min KES 300)</span></h3>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Gross Monthly Salary — KES</label>
                    <input
                      type="number"
                      value={shifSalary}
                      onChange={e => setShifSalary(e.target.value)}
                      placeholder="e.g. 50000"
                      className="mt-1.5 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-emerald-400 bg-white"
                    />
                  </div>
                  {shifSalary && (
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      {[
                        ['Gross Salary',   `KES ${(parseFloat(shifSalary) || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                        ['SHIF Contribution (2.75%)', `KES ${shif.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                        ['Net Pay',        `KES ${((parseFloat(shifSalary) || 0) - shif).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ].map(([label, value], i) => (
                        <div key={label} className={`flex justify-between items-center px-4 py-3 ${i > 0 ? 'border-t border-gray-100' : ''} ${i === 2 ? 'bg-emerald-50' : 'bg-white'}`}>
                          <span className={`text-sm ${i === 2 ? 'font-bold text-emerald-800' : 'text-slate-600'}`}>{label}</span>
                          <span className={`text-sm font-bold ${i === 2 ? 'text-emerald-700' : 'text-slate-900'}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Loan Repayment */}
              {calcTab === 'Loan Repayment' && (
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900">Loan Repayment Calculator</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Principal (KES)', val: loanP, set: setLoanP, ph: '100000' },
                      { label: 'Annual Rate (%)', val: loanR, set: setLoanR, ph: '14' },
                      { label: 'Term (months)',   val: loanN, set: setLoanN, ph: '24' },
                    ].map(({ label, val, set, ph }) => (
                      <div key={label}>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
                        <input
                          type="number"
                          value={val}
                          onChange={e => set(e.target.value)}
                          placeholder={ph}
                          className="mt-1.5 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-emerald-400 bg-white"
                        />
                      </div>
                    ))}
                  </div>
                  {loanMonthly && (
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      {[
                        ['Monthly Payment',  `KES ${loanMonthly.monthly.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                        ['Total Payment',    `KES ${loanMonthly.total.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                        ['Total Interest',   `KES ${loanMonthly.interest.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ].map(([label, value], i) => (
                        <div key={label} className={`flex justify-between items-center px-4 py-3 ${i > 0 ? 'border-t border-gray-100' : ''} ${i === 0 ? 'bg-emerald-50' : 'bg-white'}`}>
                          <span className={`text-sm ${i === 0 ? 'font-bold text-emerald-800' : 'text-slate-600'}`}>{label}</span>
                          <span className={`text-sm font-bold ${i === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* QR Code Generator */}
              {calcTab === 'QR Code' && (
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900">QR Code Generator</h3>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">URL or Text</label>
                    <input
                      type="text"
                      value={qrText}
                      onChange={e => setQrText(e.target.value)}
                      placeholder="https://yoursite.co.ke or any text"
                      className="mt-1.5 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-emerald-400 bg-white"
                    />
                  </div>
                  <button
                    onClick={() => qrText.trim() && setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrText.trim())}`)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Generate QR Code
                  </button>
                  {qrSrc && (
                    <div className="flex flex-col items-center gap-3 pt-2">
                      <img src={qrSrc} alt="QR Code" className="w-48 h-48 border border-gray-200 rounded-xl p-2 bg-white" />
                      <a
                        href={qrSrc}
                        download="qrcode.png"
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium underline underline-offset-2"
                      >
                        Download QR Code →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: what the tools are for */}
            <div className="space-y-4">
              <p className="text-slate-500 text-sm">All tools run directly in your browser — nothing is stored or tracked.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: '🧾', title: 'VAT Calculator', desc: 'Add or extract 16% VAT instantly' },
                  { icon: '🏠', title: 'Housing Levy', desc: 'Employee & employer deductions' },
                  { icon: '🏥', title: 'SHIF', desc: '2.75% health fund deduction' },
                  { icon: '💳', title: 'Loan Repayment', desc: 'Monthly payments & total interest' },
                  { icon: '📷', title: 'QR Code', desc: 'Generate & download free QR codes' },
                  { icon: '📄', title: '50+ Templates', desc: 'Legal, HR, finance & more — KES 50' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-slate-50 border border-gray-100 rounded-xl">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-slate-800 font-semibold text-sm">{item.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────── */}
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

      {/* ── FAQ ────────────────────────────────────────────── */}
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

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3">Get started</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Stop putting it off.</h2>
          <p className="text-slate-500 text-base mb-8">
            Send a message now. You&apos;ll get a straight answer and a clear next step — today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={waLink('Hi, I have an enquiry')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-sm"
            >
              <WaIcon /> Chat on WhatsApp
            </a>
            <Link
              to="/contact"
              className="border border-slate-300 text-slate-700 hover:border-slate-500 hover:text-slate-900 font-medium px-7 py-3.5 rounded-xl transition-colors"
            >
              Send a quote request
            </Link>
          </div>
          <p className="text-slate-400 text-xs mt-4">{WA_PHONE} · Mon–Sat, 8am–8pm</p>
        </div>
      </section>

    </div>
  )
}
