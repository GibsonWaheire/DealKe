// src/pages/OrderPage.jsx
import { useNavigate, useLocation } from 'react-router-dom'
import PaymentMethods from '../components/PaymentMethods'

export default function OrderPage() {
  const navigate    = useNavigate()
  const { state }   = useLocation()

  if (!state) {
    navigate('/services')
    return null
  }

  const { serviceName, price, currency = 'KES', category } = state

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 py-10">
      <div className="max-w-lg mx-auto px-4 sm:px-6">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-zinc-500 hover:text-zinc-900 text-sm mb-8 flex items-center gap-1 transition-colors"
        >
          ← Back
        </button>

        {/* Order summary */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-zinc-900 font-bold text-xl">{serviceName}</h1>
              {category && (
                <span className="inline-block bg-zinc-100 text-zinc-600 text-xs px-3 py-1 rounded-full mt-2">
                  {category}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="text-zinc-500 text-lg font-medium">KES </span>
              <span className="text-3xl font-bold text-zinc-900">
                {typeof price === 'number' ? price.toLocaleString() : price}
              </span>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-zinc-200">
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">What happens next</p>
            <ol className="space-y-2">
              {[
                'Complete your payment below',
                'Send us your confirmation on WhatsApp',
                'We start and deliver to your WhatsApp',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* All payment methods */}
        <PaymentMethods
          amount={price}
          serviceName={serviceName}
          category={category}
        />

      </div>
    </div>
  )
}
