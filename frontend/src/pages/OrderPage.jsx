// src/pages/OrderPage.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { paymentConfig } from '../constants/paymentConfig'

export default function OrderPage() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const [phone, setPhone] = useState('')
  const [stkLoading, setStkLoading] = useState(false)
  const [stkMessage, setStkMessage] = useState('')
  const [copiedPaybill, setCopiedPaybill] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState(false)
  const [paid, setPaid] = useState(false)

  if (!state) {
    navigate('/services')
    return null
  }

  const { serviceName, price, currency = 'KES', category } = state

  const accountNumber = '0020195655920'

  const handleStkPush = () => {
    if (!phone) return
    setStkLoading(true)
    setStkMessage('')
    setTimeout(() => {
      setStkLoading(false)
      setStkMessage(`STK push sent to ${phone}. Check your phone and enter your M-Pesa PIN.`)
    }, 2000)
  }

  const copyToClipboard = (text, setter) => {
    navigator.clipboard.writeText(text)
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  const waMessage = encodeURIComponent(
    `Hi, I have paid for ${serviceName}. Amount: KES ${typeof price === 'number' ? price.toLocaleString() : price}. M-Pesa Paybill: ${paymentConfig.paybillNumber}. Account: ${accountNumber}. Please confirm and proceed.`
  )

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 py-10">
      <div className="max-w-lg mx-auto px-4 sm:px-6">

        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="text-zinc-500 hover:text-zinc-900 text-sm mb-8 flex items-center gap-1 transition-colors"
        >
          ← Back
        </button>

        {/* Order summary */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6">
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
                'Pay via M-Pesa below',
                'Send us your payment confirmation on WhatsApp',
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

        {/* Payment section */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-5">

          {/* STK Push */}
          <div>
            <p className="text-zinc-900 font-semibold mb-3">Pay directly from your phone</p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07XX XXX XXX"
              className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-500 mb-3"
            />
            <button
              onClick={handleStkPush}
              disabled={stkLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {stkLoading ? 'Sending…' : 'Request M-Pesa Payment'}
            </button>
            {stkMessage && (
              <p className="text-green-700 text-sm mt-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                {stkMessage}
              </p>
            )}
            <p className="text-zinc-500 text-xs mt-2">M-Pesa STK push — you'll be prompted on your phone</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-zinc-500 text-xs">or pay manually</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* Paybill */}
          <div>
            <p className="text-zinc-900 font-semibold mb-4">Pay via M-Pesa Paybill</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3">
                <div>
                  <p className="text-zinc-500 text-sm">Paybill Number</p>
                  <p className="text-zinc-900 font-mono font-bold">{paymentConfig.paybillNumber}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(paymentConfig.paybillNumber, setCopiedPaybill)}
                  className="text-xs bg-zinc-200 hover:bg-zinc-300 text-zinc-700 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                >
                  {copiedPaybill ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="flex items-center justify-between gap-3 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3">
                <div>
                  <p className="text-zinc-500 text-sm">Account Number</p>
                  <p className="text-zinc-900 font-mono font-bold">{accountNumber}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(accountNumber, setCopiedAccount)}
                  className="text-xs bg-zinc-200 hover:bg-zinc-300 text-zinc-700 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                >
                  {copiedAccount ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="pt-4 border-t border-zinc-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={paid}
                onChange={(e) => setPaid(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
              <span className="text-zinc-700 text-sm">I have completed the M-Pesa payment</span>
            </label>

            {paid && (
              <a
                href={`https://wa.me/${paymentConfig.whatsappNumber}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors text-center"
              >
                Confirm Payment on WhatsApp
              </a>
            )}

            <p className="text-zinc-500 text-xs text-center mt-3">
              We'll confirm within 5 minutes and get started immediately.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
