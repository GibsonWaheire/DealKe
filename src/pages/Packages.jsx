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
        title="Websites That Work for Your Business"
        subtitle="Clean, fast, mobile-first websites built for Kenyan businesses — at prices that make sense."
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
            All packages include free domain advice, mobile-first design, and a{' '}
            <span className="text-zinc-700 font-medium">1-month post-launch support window</span>.
          </p>
        </div>
      </section>

      {/* CTA row */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-zinc-600 text-sm">Not sure which package is right for you?</p>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium h-auto py-2.5 px-6 rounded-lg">
            <Link to="/contact">Talk to Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
