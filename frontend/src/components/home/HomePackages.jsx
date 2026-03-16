import { Link } from 'react-router-dom'
import PackageCard from '../PackageCard'
import { homePackages } from '../../data/homeData'
import { waLink } from './homeUtils'

export default function HomePackages() {
  return (
    <section className="py-24 bg-gradient-to-b from-zinc-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-700 text-xs font-bold px-3 py-1 rounded-full border border-zinc-200 mb-4">
            Website Packages
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 leading-tight">Fixed scope. Visible pricing.</h2>
          <p className="text-zinc-600 mt-3 text-base">You know the exact price before we start. No hidden charges, no surprises.</p>
          <Link to="/packages" className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-900 text-sm font-semibold mt-3 underline underline-offset-2">
            Compare all package details →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {homePackages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-zinc-500 text-xs">All packages include: mobile-first design · 30-day support · SSL advice · domain guidance</p>
          <a href={waLink('Hi, I need a custom website quote — can you help?')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-800 text-sm mt-2 underline underline-offset-2">
            Need something custom? Chat on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  )
}
