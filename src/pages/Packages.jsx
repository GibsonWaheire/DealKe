// src/pages/Packages.jsx
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PackageCard from '../components/PackageCard'

const packages = [
  {
    name: 'Starter',
    price: 15000,
    turnaround: '5–7 days',
    popular: false,
    description: 'Everything you need to get online fast.',
    features: [
      '1-page website',
      'Mobile responsive',
      'Contact form',
      'Basic SEO setup',
      '1 revision round',
    ],
  },
  {
    name: 'Business',
    price: 35000,
    turnaround: '7–10 days',
    popular: true,
    description: 'The most popular choice for growing businesses.',
    features: [
      'Up to 5 pages',
      'SEO setup',
      'Google Maps integration',
      'Social media links',
      'WhatsApp chat button',
      '3 revision rounds',
    ],
  },
  {
    name: 'Premium',
    price: 65000,
    turnaround: '10–14 days',
    popular: false,
    description: 'Full-featured website with content management.',
    features: [
      'Up to 10 pages',
      'CMS (manage content yourself)',
      'Blog / news section',
      'Advanced SEO',
      'Google Analytics setup',
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
]

export default function Packages() {
  return (
    <div className="bg-white">
      <PageHeader
        label="Website Packages"
        title="Websites built by a developer, not a template."
        subtitle="Fixed prices. Real turnaround times. No agency markup, no hidden fees."
      />

      {/* Package cards */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Included in all */}
      <section className="bg-slate-50 border-y border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* CTA row */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-slate-600 text-sm">Not sure which one fits? Message on WhatsApp — I'll help you choose.</p>
          <Link
            to="/contact"
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded-xl transition-colors text-sm"
          >
            Chat with Us
          </Link>
        </div>
      </section>
    </div>
  )
}
