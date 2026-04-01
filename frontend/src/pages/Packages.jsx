// src/pages/Packages.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const headerImages = [
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80', alt: 'Laptop workspace' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80', alt: 'Modern office' },
]

const websiteTypes = [
  {
    id: 'landing',
    label: 'Landing Page',
    emoji: '🎯',
    tagline: 'One page. One goal. One CTA.',
    bestFor: 'Product launches, campaigns, single services, events',
    price: 'KES 6,000',
    turnaround: '3–5 days',
    features: [
      'Single scrollable page',
      '3–5 content sections',
      'Contact / WhatsApp CTA',
      'Mobile responsive',
      'Basic SEO (title + meta)',
      '2 revision rounds',
    ],
  },
  {
    id: 'simple',
    label: 'Simple Website',
    emoji: '🌐',
    tagline: 'Clean, professional, and ready to go.',
    bestFor: 'Small businesses, professionals, portfolios, churches',
    price: 'KES 22,000',
    turnaround: '5–7 days',
    features: [
      'Up to 4 pages',
      'Contact form',
      'Google Maps integration',
      'Social media links',
      'Basic SEO setup',
      'Mobile responsive',
      '2 revision rounds',
    ],
  },
  {
    id: 'business',
    label: 'Business Website',
    emoji: '🏢',
    tagline: 'Built to rank, convert, and impress.',
    bestFor: 'Growing businesses, service companies, restaurants, schools',
    price: 'KES 18,000',
    turnaround: '7–10 days',
    popular: true,
    features: [
      'Up to 8 pages',
      'SEO optimized',
      'Blog / news section',
      'Google Analytics setup',
      'WhatsApp chat button',
      'Google Maps integration',
      'Social media links',
      '3 revision rounds',
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    emoji: '🛒',
    tagline: 'Sell online. Accept M-Pesa.',
    bestFor: 'Shops, retailers, fashion, electronics, food delivery',
    price: 'KES 80,000',
    turnaround: '14–21 days',
    features: [
      'Full online store',
      'M-Pesa payment integration',
      'Product catalog (up to 50 items)',
      'Order management dashboard',
      'Customer accounts',
      'Mobile responsive',
      'Advanced SEO',
      'Priority support',
      '5 revision rounds',
    ],
  },
]

const includedInAll = [
  'Free domain advice',
  'Mobile-first design',
  '30 days post-launch support',
  'WhatsApp handover call',
  'SSL certificate advice',
]

export default function Packages() {
  const [active, setActive] = useState('business')
  const selected = websiteTypes.find((t) => t.id === active)

  return (
    <div className="bg-white">
      <PageHeader
        label="Website Packages"
        title="Websites built by a developer, not a template."
        subtitle="Fixed prices. Real turnaround times. Choose the type that fits your business."
        images={headerImages}
      />

      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Type selector */}
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-5 text-center">
            Choose your website type
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {websiteTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`relative flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all text-center ${
                  active === t.id
                    ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    Popular
                  </span>
                )}
                <span className="text-2xl">{t.emoji}</span>
                <span className={`text-sm font-semibold ${active === t.id ? 'text-emerald-700' : 'text-slate-800'}`}>
                  {t.label}
                </span>
                <span className={`text-xs font-bold ${active === t.id ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {t.price}
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className={`px-8 py-6 ${selected.popular ? 'bg-emerald-500' : 'bg-slate-900'}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                      {selected.emoji} {selected.label}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{selected.tagline}</h2>
                    <p className={`text-sm mt-1 ${selected.popular ? 'text-emerald-100' : 'text-white/60'}`}>
                      Best for: {selected.bestFor}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-3xl font-bold text-white">{selected.price}</p>
                    <p className={`text-xs mt-0.5 ${selected.popular ? 'text-emerald-100' : 'text-white/60'}`}>
                      {selected.turnaround}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white px-8 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {selected.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs shrink-0 border border-emerald-100">✓</span>
                      {f}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-5 border-t border-gray-100">
                  <Link
                    to={`/pay`}
                    state={{ serviceName: selected.label, price: parseInt(selected.price.replace(/\D/g, '')), currency: 'KES', category: 'Packages' }}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
                  >
                    Get Started — {selected.price}
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 border border-gray-200 text-slate-700 hover:border-gray-400 hover:text-slate-900 font-medium px-6 py-3 rounded-xl transition-colors"
                  >
                    Ask a question
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Compare all */}
          <div className="mt-10 border border-gray-100 rounded-2xl overflow-hidden">
            <div className="bg-slate-50 px-6 py-3 border-b border-gray-100">
              <p className="text-slate-700 font-semibold text-sm">Compare all packages</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-slate-400 font-medium text-xs uppercase tracking-wide">Feature</th>
                    {websiteTypes.map((t) => (
                      <th key={t.id} className={`px-4 py-3 text-center text-xs font-semibold ${active === t.id ? 'text-emerald-600' : 'text-slate-600'}`}>
                        {t.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    ['Price',           'KES 6,000',  'KES 22,000',  'KES 18,000',  'KES 80,000'],
                    ['Turnaround',      '3–5 days',    '5–7 days',    '7–10 days',   '14–21 days'],
                    ['Pages',           '1 page',      'Up to 4',     'Up to 8',     'Unlimited'],
                    ['SEO',             'Basic',       'Basic',       'Full',        'Advanced'],
                    ['M-Pesa payment',  '—',           '—',           '—',           '✓'],
                    ['Blog/News',       '—',           '—',           '✓',           '✓'],
                    ['Admin dashboard', '—',           '—',           '—',           '✓'],
                    ['Revisions',       '2',           '2',           '3',           '5'],
                  ].map(([feature, ...vals]) => (
                    <tr key={feature}>
                      <td className="px-6 py-3 text-slate-600 font-medium">{feature}</td>
                      {vals.map((v, i) => (
                        <td key={i} className={`px-4 py-3 text-center ${active === websiteTypes[i].id ? 'text-emerald-700 font-semibold bg-emerald-50/40' : 'text-slate-500'}`}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* Included in all */}
      <section className="bg-slate-50 border-y border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-4 text-center">Included in every package</p>
          <div className="flex flex-wrap justify-center gap-3">
            {includedInAll.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-slate-700 text-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-emerald-500">✓</span> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-slate-600 text-sm">Not sure which one fits? Send us a message — we'll help you decide.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded-xl transition-colors text-sm"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
