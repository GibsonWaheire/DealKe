import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

const MIN_KES = 100

function generateRef() {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `DI-${ts}-${rand}`
}

export default function ClientPayPage() {
  const [project, setProject]           = useState('')
  const [notes, setNotes]               = useState('')
  const [inputCurrency, setInputCurrency] = useState('KES')
  const [inputAmount, setInputAmount]   = useState('')
  const [paymentType, setPaymentType]   = useState('full')
  const [partialAmount, setPartialAmount] = useState('')
  const [name, setName]                 = useState('')
  const [email, setEmail]               = useState('')
  const [phone, setPhone]               = useState('')
  const [agreed, setAgreed]             = useState(false)
  const [rate, setRate]                 = useState(null)
  const [rateLoading, setRateLoading]   = useState(true)
  const [loading, setLoading]           = useState(false)
  const [success, setSuccess]           = useState(null) // { reference, amount }
  const [error, setError]               = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/KES')
      .then(r => r.json())
      .then(data => { setRate(data.rates?.AED ?? 0.027); setRateLoading(false) })
      .catch(() => { setRate(0.027); setRateLoading(false) })
  }, [])

  const parsedInput  = parseFloat(inputAmount) || 0
  const amountKES    = inputCurrency === 'KES' ? parsedInput : rate ? parsedInput / rate : 0
  const amountAED    = inputCurrency === 'AED' ? parsedInput : rate ? parsedInput * rate : 0
  const parsedPartial = parseFloat(partialAmount) || 0
  const chargeKES    = paymentType === 'full' ? amountKES : parsedPartial

  const fmt = (n, currency) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency, maximumFractionDigits: 2 }).format(n)

  const validate = () => {
    const errs = {}
    if (!project)                          errs.project = 'Select a project type'
    if (!name.trim())                      errs.name    = 'Enter your full name'
    if (!email.trim())                     errs.email   = 'Enter your email address'
    if (chargeKES < MIN_KES)               errs.amount  = `Minimum payment is ${fmt(MIN_KES, 'KES')}`
    if (paymentType === 'partial') {
      if (parsedPartial <= 0)              errs.partial = 'Enter a deposit amount'
      if (parsedPartial > amountKES)       errs.partial = `Deposit cannot exceed ${fmt(amountKES, 'KES')}`
    }
    if (!agreed)                           errs.agreed  = 'Please accept the terms to continue'
    return errs
  }

  const handlePay = async () => {
    setError('')
    const errs = validate()
    setValidationErrors(errs)
    if (Object.keys(errs).length > 0) return
    if (!window.PaystackPop) {
      setError('Payment provider failed to load. Please refresh the page.')
      return
    }
    setLoading(true)
    const ref = generateRef()
    const paystackPop = new window.PaystackPop()
    await paystackPop.checkout({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round(chargeKES * 100),
      currency: 'KES',
      ref,
      label: project,
      firstname: name.split(' ')[0],
      lastname: name.split(' ').slice(1).join(' ') || '',
      phone: phone || undefined,
      metadata: {
        custom_fields: [
          { display_name: 'Project',      variable_name: 'project',      value: project },
          { display_name: 'Notes',        variable_name: 'notes',        value: notes || '—' },
          { display_name: 'Total (KES)',  variable_name: 'total_kes',    value: fmt(amountKES, 'KES') },
          { display_name: 'Total (AED)',  variable_name: 'total_aed',    value: fmt(amountAED, 'AED') },
          { display_name: 'Payment type', variable_name: 'payment_type', value: paymentType },
          { display_name: 'Customer',     variable_name: 'customer_name', value: name },
        ],
      },
      onSuccess: (transaction) => {
        setLoading(false)
        setSuccess({ reference: transaction.reference, amount: chargeKES })
      },
      onCancel: () => {
        setLoading(false)
      },
    })
    setLoading(false)
  }

  const err = (field) => validationErrors[field]
    ? <p className="text-red-500 text-xs mt-1">{validationErrors[field]}</p>
    : null

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-1">Payment received</h2>
          <p className="text-zinc-500 text-sm mb-6">Thank you, {name.split(' ')[0]}. We'll be in touch shortly.</p>
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm text-left space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-zinc-500">Project</span>
              <span className="font-medium text-zinc-900">{project}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Amount paid</span>
              <span className="font-bold text-zinc-900">{fmt(success.amount, 'KES')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Reference</span>
              <span className="font-mono text-xs text-zinc-700">{success.reference}</span>
            </div>
          </div>
          <a
            href={`https://wa.me/254726899113?text=${encodeURIComponent(`Hi, I just paid for ${project}. Reference: ${success.reference}. Name: ${name}. Please confirm.`)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
          >
            Confirm on WhatsApp
          </a>
          <p className="text-zinc-400 text-xs mt-3">Save your reference number for your records.</p>
        </div>
      </div>
    )
  }

  // ── Payment form ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-lg mx-auto px-4 sm:px-6">

        {/* Merchant identity */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <div>
            <p className="font-bold text-zinc-900 leading-tight">Draft-It</p>
            <p className="text-zinc-500 text-xs">draftit.co.ke · +254 726 899 113</p>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-5">

          {/* Project */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Project type <span className="text-red-400">*</span></label>
            <select
              value={project}
              onChange={e => { setProject(e.target.value); setValidationErrors(v => ({ ...v, project: '' })) }}
              className={`w-full bg-white border rounded-lg px-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-500 ${err('project') ? 'border-red-400' : 'border-zinc-300'}`}
            >
              <option value="">Select a project…</option>
              {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {err('project')}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Project description <span className="text-zinc-400 font-normal">(optional)</span></label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Briefly describe what you need — e.g. 5-page business website with contact form"
              rows={2}
              className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-500 resize-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Amount <span className="text-red-400">*</span></label>
            <div className="flex gap-2 mb-2.5">
              {['KES', 'AED'].map(c => (
                <button
                  key={c}
                  onClick={() => { setInputCurrency(c); setInputAmount(''); setValidationErrors(v => ({ ...v, amount: '' })) }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                    inputCurrency === c ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">{inputCurrency}</span>
              <input
                type="number"
                min="0"
                value={inputAmount}
                onChange={e => { setInputAmount(e.target.value); setValidationErrors(v => ({ ...v, amount: '' })) }}
                placeholder="0.00"
                className={`w-full bg-white border rounded-lg pl-16 pr-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-500 ${err('amount') ? 'border-red-400' : 'border-zinc-300'}`}
              />
            </div>
            {err('amount')}
            {parsedInput > 0 && rate && (
              <div className="mt-2 flex items-center justify-between bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5">
                <div>
                  <p className="text-zinc-900 font-semibold text-sm">{fmt(amountKES, 'KES')}</p>
                  <p className="text-zinc-500 text-xs">≈ {fmt(amountAED, 'AED')}</p>
                </div>
                <p className="text-zinc-400 text-xs text-right">
                  {rateLoading ? 'Loading…' : `1 KES = ${rate.toFixed(4)} AED`}
                  <br /><span className="text-zinc-300">live rate</span>
                </p>
              </div>
            )}
          </div>

          {/* Full / partial */}
          {parsedInput > 0 && (
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Payment type</label>
              <div className="flex gap-2 mb-2.5">
                {[['full', 'Full payment'], ['partial', 'Partial / Deposit']].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setPaymentType(val)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                      paymentType === val ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {paymentType === 'partial' && (
                <div>
                  <p className="text-zinc-500 text-xs mb-1.5">Amount to pay now (KES) — max {fmt(amountKES, 'KES')}</p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">KES</span>
                    <input
                      type="number"
                      min={MIN_KES}
                      max={amountKES}
                      value={partialAmount}
                      onChange={e => { setPartialAmount(e.target.value); setValidationErrors(v => ({ ...v, partial: '' })) }}
                      placeholder={`e.g. ${Math.round(amountKES * 0.5).toLocaleString()}`}
                      className={`w-full bg-white border rounded-lg pl-16 pr-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-500 ${err('partial') ? 'border-red-400' : 'border-zinc-300'}`}
                    />
                  </div>
                  {err('partial')}
                </div>
              )}
            </div>
          )}

          <div className="border-t border-zinc-100 pt-1" />

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Full name <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setValidationErrors(v => ({ ...v, name: '' })) }}
              placeholder="John Doe"
              className={`w-full bg-white border rounded-lg px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-500 ${err('name') ? 'border-red-400' : 'border-zinc-300'}`}
            />
            {err('name')}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Email address <span className="text-red-400">*</span></label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setValidationErrors(v => ({ ...v, email: '' })) }}
              placeholder="your@email.com"
              className={`w-full bg-white border rounded-lg px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-500 ${err('email') ? 'border-red-400' : 'border-zinc-300'}`}
            />
            {err('email')}
          </div>

          {/* Phone (optional) */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Phone <span className="text-zinc-400 font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+971 XX XXX XXXX"
              className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-500"
            />
          </div>

          {/* Order summary */}
          {project && chargeKES >= MIN_KES && name && email && (
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Project</span>
                <span className="font-medium text-zinc-900 text-right max-w-[55%]">{project}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Total</span>
                <span>{fmt(amountKES, 'KES')} <span className="text-zinc-400 text-xs">(≈ {fmt(amountAED, 'AED')})</span></span>
              </div>
              <div className="flex justify-between text-zinc-900 font-bold border-t border-zinc-200 pt-1.5">
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

          {/* Terms agreement */}
          <div>
            <label className={`flex items-start gap-3 cursor-pointer ${err('agreed') ? 'text-red-500' : ''}`}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => { setAgreed(e.target.checked); setValidationErrors(v => ({ ...v, agreed: '' })) }}
                className="mt-0.5 w-4 h-4 accent-emerald-500 cursor-pointer shrink-0"
              />
              <span className="text-xs text-zinc-600 leading-relaxed">
                I have read and agree to Draft-It's{' '}
                <Link to="/terms" target="_blank" className="underline text-zinc-900">Terms of Service</Link>,{' '}
                <Link to="/refund" target="_blank" className="underline text-zinc-900">Refund Policy</Link>, and{' '}
                <Link to="/privacy" target="_blank" className="underline text-zinc-900">Privacy Policy</Link>.
                I understand that all charges are in KES via Paystack.
              </span>
            </label>
            {err('agreed')}
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-zinc-700 disabled:opacity-40 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
          >
            {loading ? 'Opening checkout…' : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                {chargeKES >= MIN_KES ? `Pay ${fmt(chargeKES, 'KES')}` : 'Pay with Apple Pay / Card'}
              </>
            )}
          </button>

          <p className="text-zinc-400 text-xs text-center">
            Secured by Paystack · Apple Pay on Safari · Charges in KES
          </p>

        </div>
      </div>
    </div>
  )
}
