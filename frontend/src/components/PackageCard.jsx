// src/components/PackageCard.jsx
import { Link } from 'react-router-dom'

export default function PackageCard({
  name,
  price,
  currency = 'KES',
  turnaround,
  description,
  features = [],
  popular = false,
  cta = 'Get Started',
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl transition-shadow hover:shadow-md ${
        popular
          ? 'bg-emerald-500 ring-2 ring-emerald-400 shadow-lg'
          : 'bg-white border border-gray-200 shadow-sm'
      }`}
    >
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-white text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6 pt-8">
        <h3 className={`text-lg font-bold ${popular ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
        {description && (
          <p className={`text-sm mt-1 mb-4 ${popular ? 'text-emerald-100' : 'text-slate-500'}`}>{description}</p>
        )}

        <div className="mb-1">
          <span className={`text-sm ${popular ? 'text-emerald-200' : 'text-slate-400'}`}>{currency} </span>
          <span className={`text-3xl font-bold ${popular ? 'text-white' : 'text-slate-900'}`}>
            {typeof price === 'number' ? price.toLocaleString() : price}
          </span>
        </div>
        {turnaround && (
          <p className={`text-xs mb-5 ${popular ? 'text-emerald-100' : 'text-slate-400'}`}>{turnaround}</p>
        )}

        <ul className="space-y-2.5 flex-1">
          {features.map((f) => (
            <li key={f} className={`flex items-start gap-2 text-sm ${popular ? 'text-emerald-50' : 'text-slate-600'}`}>
              <span className={`shrink-0 mt-px w-4 h-4 rounded-full flex items-center justify-center text-xs ${popular ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className={`mt-8 block text-center py-2.5 rounded-xl font-medium text-sm transition-colors ${
            popular
              ? 'bg-white text-emerald-600 hover:bg-emerald-50'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {cta}
        </Link>
      </div>
    </div>
  )
}
