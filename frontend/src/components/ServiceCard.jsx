// src/components/ServiceCard.jsx
import { useNavigate } from 'react-router-dom'

export default function ServiceCard({
  name,
  price,
  currency = 'KES',
  description,
  turnaround,
  category,
  note,
}) {
  const navigate = useNavigate()

  const handleOrder = () => {
    navigate('/order', {
      state: {
        serviceName: name,
        price: typeof price === 'number' ? price : parseInt(String(price).replace(/[^0-9]/g, ''), 10) || 0,
        currency,
        category,
      },
    })
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-zinc-100">{name}</h3>
            {note && (
              <span className="text-xs bg-white text-zinc-900 px-2 py-0.5 rounded-full font-medium shrink-0">
                {note}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
          )}
        </div>
        {category && (
          <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full shrink-0 font-medium">
            {category}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div>
          <span className="text-xs text-zinc-400">{currency} </span>
          <span className="text-xl font-bold text-white">
            {typeof price === 'number' ? price.toLocaleString() : price}
          </span>
        </div>
        {turnaround && (
          <span className="text-xs text-zinc-400 border-l border-zinc-700 pl-4">
            ⏱ {turnaround}
          </span>
        )}
      </div>
      <button
        onClick={handleOrder}
        className="mt-1 inline-flex items-center justify-center w-full bg-white hover:bg-zinc-100 text-zinc-900 text-sm font-medium py-2 rounded-lg transition-colors"
      >
        Order Now
      </button>
    </div>
  )
}
