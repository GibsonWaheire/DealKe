// src/components/MpesaModal.jsx
// Usage:
//   <MpesaModal
//     open={open}
//     onClose={() => setOpen(false)}
//     serviceLabel="KRA PIN Registration"
//     amount={500}
//   />

import { useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

export default function MpesaModal({ open, onClose, serviceLabel = 'DealFlow Service', amount }) {
  const [phone,   setPhone]   = useState('')
  const [status,  setStatus]  = useState('idle')  // idle | loading | success | error
  const [message, setMessage] = useState('')

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch(`${BACKEND}/api/mpesa/stk-push`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          amount,
          serviceLabel,
          accountRef: 'DealFlow',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Payment request failed')
      }

      setStatus('success')
      setMessage(`STK push sent to ${phone}. Check your phone and enter your M-Pesa PIN.`)
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Try again or pay via WhatsApp.')
    }
  }

  const handleClose = () => {
    setStatus('idle')
    setPhone('')
    setMessage('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-widest">Pay via M-Pesa</p>
            <h2 className="text-slate-900 font-bold text-lg mt-0.5">{serviceLabel}</h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Amount */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mb-5 text-center">
          <p className="text-slate-500 text-xs">Amount to pay</p>
          <p className="text-emerald-700 text-3xl font-bold">KES {Number(amount).toLocaleString()}</p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-2xl mx-auto mb-3">✓</div>
            <p className="text-slate-700 text-sm leading-relaxed">{message}</p>
            <button
              onClick={handleClose}
              className="mt-5 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Your M-Pesa phone number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07XX XXX XXX"
              required
              className="w-full h-11 px-4 border border-gray-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-sm"
            />
            <p className="text-slate-400 text-xs mt-1.5">
              Enter the number registered with M-Pesa. You will receive a PIN prompt.
            </p>

            {status === 'error' && (
              <p className="mt-3 text-red-600 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-5 w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {status === 'loading' ? 'Sending STK push…' : `Pay KES ${Number(amount).toLocaleString()}`}
            </button>

            <p className="text-slate-400 text-xs text-center mt-3">
              Secured by Safaricom Daraja · No card required
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
