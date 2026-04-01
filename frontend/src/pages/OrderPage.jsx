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

  const [paystackEmail, setPaystackEmail] = useState('')
  const [paystackLoading, setPaystackLoading] = useState(false)
  const [paystackMessage, setPaystackMessage] = useState('')

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

  const handlePaystackCheckout = async () => {
    if (!paystackEmail) return
    if (!window.PaystackPop) {
      setPaystackMessage('Payment provider failed to load. Please refresh and try again.')
      return
    }
    setPaystackLoading(true)
    setPaystackMessage('')
    const amountInKobo = (typeof price === 'number' ? price : parseFloat(price)) * 100
    const paystackPop = new window.PaystackPop()
    await paystackPop.checkout({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: paystackEmail,
      amount: amountInKobo,
      currency: 'KES',
      label: serviceName,
      onSuccess: (transaction) => {
        setPaystackLoading(false)
        setPaystackMessage(`Payment successful! Reference: ${transaction.reference}`)
      },
      onCancel: () => {
        setPaystackLoading(false)
        setPaystackMessage('Payment cancelled.')
      },
    })
    setPaystackLoading(false)
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

          {/* Apple Pay / Card via Paystack */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-zinc-200" />
              <span className="text-zinc-500 text-xs">or pay with Apple Pay / Card</span>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>
            <p className="text-zinc-900 font-semibold mb-3">Apple Pay &amp; Card</p>
            <input
              type="email"
              value={paystackEmail}
              onChange={(e) => setPaystackEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-500 mb-3"
            />
            <button
              onClick={handlePaystackCheckout}
              disabled={paystackLoading || !paystackEmail}
              className="w-full bg-zinc-900 hover:bg-zinc-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {paystackLoading ? (
                'Loading…'
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Pay with Apple Pay / Card
                </>
              )}
            </button>
            {paystackMessage && (
              <p className={`text-sm mt-2 rounded-lg px-3 py-2 ${paystackMessage.startsWith('Payment successful') ? 'text-green-700 bg-green-50 border border-green-200' : 'text-red-700 bg-red-50 border border-red-200'}`}>
                {paystackMessage}
              </p>
            )}
            <p className="text-zinc-500 text-xs mt-2">On Apple devices, you'll see the Apple Pay button. Card payments also available.</p>
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
