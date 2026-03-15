// src/components/ServiceCard.jsx
import { Link } from 'react-router-dom'

export default function ServiceCard({
  name,
  price,
  currency = 'KES',
  description,
  turnaround,
  category,
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">{name}</h3>
          {description && (
            <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
          )}
        </div>
        {category && (
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full shrink-0 font-medium">
            {category}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div>
          <span className="text-xs text-zinc-400">{currency} </span>
          <span className="text-xl font-bold text-zinc-900">
            {typeof price === 'number' ? price.toLocaleString() : price}
          </span>
        </div>
        {turnaround && (
          <span className="text-xs text-zinc-400 border-l border-zinc-200 pl-4">
            ⏱ {turnaround}
          </span>
        )}
      </div>
      <Link
        to="/contact"
        className="mt-1 inline-flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2 rounded-lg transition-colors"
      >
        Order Now
      </Link>
    </div>
  )
}
