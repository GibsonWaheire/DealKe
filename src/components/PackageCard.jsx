// src/components/PackageCard.jsx
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

export default function PackageCard({
  name,
  price,
  currency = 'KES',
  description,
  features = [],
  popular = false,
  cta = 'Get Started',
}) {
  return (
    <Card
      className={`relative flex flex-col rounded-2xl shadow-sm transition-shadow hover:shadow-md bg-zinc-900 ${
        popular ? 'border-2 border-white' : 'border border-zinc-700'
      }`}
    >
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-white text-zinc-900 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}
      <CardContent className="flex flex-col flex-1 p-6 pt-8">
        <h3 className="text-lg font-bold text-white">{name}</h3>
        {description && (
          <p className="text-zinc-300 text-sm mt-1 mb-3">{description}</p>
        )}
        <div className="mb-6">
          <span className="text-sm text-zinc-400">{currency} </span>
          <span className="text-3xl font-bold text-white">
            {typeof price === 'number' ? price.toLocaleString() : price}
          </span>
        </div>
        <ul className="space-y-2 flex-1">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
              <span className="text-zinc-300 font-bold shrink-0 mt-px">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <Button
          asChild
          className={`mt-8 w-full h-auto py-2.5 rounded-lg font-medium text-sm ${
            popular
              ? 'bg-white hover:bg-zinc-100 text-zinc-900'
              : 'bg-zinc-800 border border-zinc-700 text-zinc-100 hover:bg-zinc-700 shadow-none'
          }`}
        >
          <Link to="/contact">{cta}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
