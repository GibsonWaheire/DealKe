import { useState, useEffect } from 'react'

const PROJECTS = [
  'Website — Landing Page',
  'Website — Business Site',
  'Website — E-Commerce',
  'KRA PIN Registration',
  'eTIMS Registration',
  'Business Registration',
  'NTSA Services',
  'eCitizen Services',
  'IT Support',
  'CCTV Installation',
  'POS System Setup',
  'Odoo ERP',
  'Document Drafting',
  'Custom Project',
]

export default function ClientPayPage() {
  const [project, setProject] = useState('')
  const [inputCurrency, setInputCurrency] = useState('KES')
  const [inputAmount, setInputAmount] = useState('')
  const [paymentType, setPaymentType] = useState('full')
  const [partialAmount, setPartialAmount] = useState('')
  const [email, setEmail] = useState('')
  const [rate, setRate] = useState(null) // 1 KES = ? AED
  const [rateLoading, setRateLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/KES')
      .then(r => r.json())
      .then(data => {
        setRate(data.rates?.AED ?? 0.027)
        setRateLoading(false)
      })
      .catch(() => {
        setRate(0.027)
        setRateLoading(false)
      })
  }, [])

  const parsedInput = parseFloat(inputAmount) || 0
  const amountKES = inputCurrency === 'KES' ? parsedInput : rate ? parsedInput / rate : 0
  const amountAED = inputCurrency === 'AED' ? parsedInput : rate ? parsedInput * rate : 0
  const parsedPartial = parseFloat(partialAmount) || 0
  const chargeKES = paymentType === 'full' ? amountKES : parsedPartial

  const handlePay = async () => {
    if (!project || !email || chargeKES <= 0) return
    if (!window.PaystackPop) {
      setMessage('Payment provider failed to load. Please refresh the page.')
      return
    }
    setLoading(true)
    setMessage('')
    const paystackPop = new window.PaystackPop()
    await paystackPop.checkout({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round(chargeKES * 100),
      currency: 'KES',
      label: project,
      metadata: {
        project,
        total_kes: Math.round(amountKES),
        total_aed: amountAED.toFixed(2),
        payment_type: paymentType,
      },
      onSuccess: (transaction) => {
        setLoading(false)
        setMessage(`Payment successful! Reference: ${transaction.reference}`)
      },
      onCancel: () => {
        setLoading(false)
        setMessage('Payment cancelled.')
      },
    })
    setLoading(false)
  }

  const fmt = (n, currency) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(n)

  const isValid = project && email && chargeKES > 0

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-lg mx-auto px-4 sm:px-6">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900">Pay for your project</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Select your project, enter an amount, and pay securely with Apple Pay or card.
          </p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-6">

          {/* Project selector */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">Project type</label>
            <select
              value={project}
              onChange={e => setProject(e.target.value)}
              className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-500"
            >
              <option value="">Select a project…</option>
              {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Amount + currency toggle */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">Amount</label>
            <div className="flex gap-2 mb-3">
              {['KES', 'AED'].map(c => (
                <button
                  key={c}
                  onClick={() => { setInputCurrency(c); setInputAmount('') }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                    inputCurrency === c
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">
                {inputCurrency}
              </span>
              <input
                type="number"
                min="0"
                value={inputAmount}
                onChange={e => setInputAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white border border-zinc-300 rounded-lg pl-16 pr-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-500"
              />
            </div>

            {/* Live conversion */}
            {parsedInput > 0 && rate && (
              <div className="mt-2 flex items-center justify-between bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3">
                <div>
                  <p className="text-zinc-900 font-semibold text-sm">{fmt(amountKES, 'KES')}</p>
                  <p className="text-zinc-500 text-xs">≈ {fmt(amountAED, 'AED')}</p>
                </div>
                <p className="text-zinc-400 text-xs text-right">
                  {rateLoading ? 'Loading rate…' : `1 KES = ${rate.toFixed(4)} AED`}
                  <br />
                  <span className="text-zinc-300">live rate</span>
                </p>
              </div>
            )}
          </div>

          {/* Full / partial payment */}
          {parsedInput > 0 && (
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Payment type</label>
              <div className="flex gap-2 mb-3">
                {[['full', 'Full payment'], ['partial', 'Partial / Deposit']].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setPaymentType(val)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                      paymentType === val
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {paymentType === 'partial' && (
                <div>
                  <p className="text-zinc-500 text-xs mb-2">
                    Enter the amount you want to pay now (KES) — max {fmt(amountKES, 'KES')}
                  </p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">KES</span>
                    <input
                      type="number"
                      min="0"
                      max={amountKES}
                      value={partialAmount}
                      onChange={e => setPartialAmount(e.target.value)}
                      placeholder={`e.g. ${Math.round(amountKES * 0.5).toLocaleString()}`}
                      className="w-full bg-white border border-zinc-300 rounded-lg pl-16 pr-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-500"
            />
          </div>

          {/* Order summary */}
          {isValid && (
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Project</span>
                <span className="font-medium text-zinc-900 text-right max-w-[60%]">{project}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Total</span>
                <span className="text-zinc-700">{fmt(amountKES, 'KES')} <span className="text-zinc-400 text-xs">(≈ {fmt(amountAED, 'AED')})</span></span>
              </div>
              <div className="flex justify-between text-zinc-900 font-bold pt-1 border-t border-zinc-200">
                <span>Paying now</span>
                <span>{fmt(chargeKES, 'KES')}</span>
              </div>
              {paymentType === 'partial' && amountKES - chargeKES > 0 && (
                <div className="flex justify-between text-zinc-400 text-xs">
                  <span>Balance remaining</span>
                  <span>{fmt(amountKES - chargeKES, 'KES')}</span>
                </div>
              )}
            </div>
          )}

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={!isValid || loading}
            className="w-full bg-zinc-900 hover:bg-zinc-700 disabled:opacity-40 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
          >
            {loading ? 'Opening checkout…' : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                {isValid ? `Pay ${fmt(chargeKES, 'KES')}` : 'Pay with Apple Pay / Card'}
              </>
            )}
          </button>

          {message && (
            <p className={`text-sm rounded-lg px-3 py-2.5 ${
              message.startsWith('Payment successful')
                ? 'text-green-700 bg-green-50 border border-green-200'
                : 'text-red-700 bg-red-50 border border-red-200'
            }`}>
              {message}
            </p>
          )}

          <p className="text-zinc-400 text-xs text-center">
            Secured by Paystack · Apple Pay available on Safari · All amounts charged in KES
          </p>

        </div>
      </div>
    </div>
  )
}
