// src/pages/OrderPage.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PaymentSheet from '../components/PaymentSheet'

export default function OrderPage() {
  const navigate  = useNavigate()
  const { state } = useLocation()
  const [sheetOpen, setSheetOpen] = useState(false)

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
        <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-5">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">Your order</p>
              <h1 className="text-zinc-900 font-bold text-xl">{serviceName}</h1>
              {category && (
                <span className="inline-block bg-zinc-100 text-zinc-600 text-xs px-3 py-1 rounded-full mt-2">
                  {category}
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="text-zinc-400 text-xs mb-0.5">Total</p>
              <p className="text-3xl font-bold text-zinc-900">
                KES {typeof price === 'number' ? price.toLocaleString() : price}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-zinc-200">
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">What happens next</p>
            <ol className="space-y-2">
              {[
                'Complete your payment',
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

        {/* Single CTA */}
        <button
          onClick={() => setSheetOpen(true)}
          className="w-full bg-zinc-900 hover:bg-zinc-700 active:scale-[.98] text-white font-semibold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2.5 shadow-lg shadow-zinc-900/20"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          Pay KES {typeof price === 'number' ? price.toLocaleString() : price}
        </button>

        <p className="text-zinc-400 text-xs text-center mt-3">
          M-Pesa · Card · Apple Pay · Paybill
        </p>

      </div>

      {/* Payment sheet */}
      <PaymentSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        amount={price}
        serviceName={serviceName}
        category={category}
      />
    </div>
  )
}
