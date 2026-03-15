// src/pages/Packages.jsx
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PackageCard from '../components/PackageCard'
import { Button } from '../ui/button'

const packages = [
  {
    name: 'Starter',
    price: 15000,
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

export default function Packages() {
  return (
    <div>
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

      {/* Reassurance strip */}
      <section className="bg-zinc-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-zinc-500 text-sm max-w-2xl mx-auto">
            Every package includes free domain advice, mobile-first design, and{' '}
            <span className="text-zinc-700 font-medium">30 days of support after launch</span>.
            You won't be left figuring it out alone.
          </p>
        </div>
      </section>

      {/* CTA row */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-zinc-600 text-sm">Not sure which one fits? Message on WhatsApp — we'll help you choose.</p>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium h-auto py-2.5 px-6 rounded-lg">
            <Link to="/contact">Chat with Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
