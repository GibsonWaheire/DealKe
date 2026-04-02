// Bottom sheet modal that wraps PaymentMethods.
// Slides up from bottom on mobile, centered modal on desktop.
import { useEffect, useState } from 'react'
import PaymentMethods from './PaymentMethods'

export default function PaymentSheet({
  open,
  onClose,
  amount,
  serviceName,
  category         = '',
  description      = '',
  customerEmail    = '',
  customerPhone    = '',
  customerName     = '',
  onPaymentSuccess = undefined,
}) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      // Double rAF ensures the element is in the DOM before the transition starts
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    } else {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 320)
      return () => clearTimeout(t)
    }
  }, [open])

  // Lock body scroll while sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">

      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Sheet */}
      <div
        className={`
          relative w-full sm:max-w-md bg-white
          rounded-t-2xl sm:rounded-2xl
          max-h-[92vh] flex flex-col shadow-2xl
          transition-all duration-300 ease-out
          ${visible
            ? 'translate-y-0 opacity-100 sm:scale-100'
            : 'translate-y-full opacity-0 sm:translate-y-4 sm:scale-95'
          }
        `}
      >
        {/* Drag handle — mobile only */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-zinc-300" />
        </div>

        {/* Header */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-5 py-4 border-b border-zinc-100">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-0.5">Paying for</p>
            <p className="font-bold text-zinc-900 text-base leading-tight truncate">{serviceName}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-zinc-900 text-lg">
              KES {Number(amount).toLocaleString()}
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-4">
          <PaymentMethods
            amount={amount}
            serviceName={serviceName}
            category={category}
            description={description}
            customerEmail={customerEmail}
            customerPhone={customerPhone}
            customerName={customerName}
            onPaymentSuccess={onPaymentSuccess}
          />
        </div>
      </div>
    </div>
  )
}
