import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PaymentSheet from '../components/PaymentSheet'

const PROJECTS = [
  // Web & Digital
  'Website — Landing Page',
  'Website — Business Site',
  'Website — E-Commerce',
  // Government & Compliance
  'KRA PIN Registration',
  'eTIMS Registration',
  'Business Name Registration',
  'NTSA Services',
  'eCitizen Services',
  // Writing & Content
  'Copywriting Services',
  'Business Proposal Writing',
  'Presentation Design (PPT/Slides)',
  'Technical Writing',
  'CV / Resume Writing',
  'Grant & Funding Proposal',
  // Documents & Legal
  'Contract & Agreement Drafting',
  'Affidavit Drafting',
  'Car Sale Agreement',
  // Tech & Infrastructure
  'IT Support',
  'CCTV Installation',
  'POS System Setup',
  'Odoo ERP',
  // Other
  'Custom / Other',
]

const ACADEMIC_KEYWORDS = [
  'essay', 'assignment', 'homework', 'coursework', 'dissertation',
  'thesis', 'exam', 'turnitin', 'plagiarism', 'school work',
  'university task', 'college assignment', 'class work', 'class assignment',
  'take my exam', 'do my', 'write my essay', 'write my assignment',
  'academic paper', 'term paper', 'research paper', 'school project',
  'college work', 'university work', 'exam help', 'exam prep',
]

const hasAcademicKeyword = (text) => {
  const lower = text.toLowerCase()
  return ACADEMIC_KEYWORDS.some(kw => lower.includes(kw))
}

const MIN_KES = 100

export default function ClientPayPage() {
  // ── Step 1 state ────────────────────────────────────────────────────────────
  const [project,       setProject]       = useState('')
  const [notes,         setNotes]         = useState('')
  const [inputCurrency, setInputCurrency] = useState('KES')
  const [inputAmount,   setInputAmount]   = useState('')
  const [paymentType,   setPaymentType]   = useState('full')
  const [partialAmount, setPartialAmount] = useState('')
  const [name,          setName]          = useState('')
  const [email,         setEmail]         = useState('')
  const [phone,         setPhone]         = useState('')
  const [agreed,        setAgreed]        = useState(false)
  const [errors,        setErrors]        = useState({})

  // ── Step tracking ────────────────────────────────────────────────────────────
  const [step,      setStep]      = useState(1) // 1 = details, 2 = payment
  const [sheetOpen, setSheetOpen] = useState(false)

  // ── Exchange rate ────────────────────────────────────────────────────────────
  const [rate,        setRate]        = useState(null)
  const [rateLoading, setRateLoading] = useState(true)

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/KES')
      .then(r => r.json())
      .then(d => { setRate(d.rates?.AED ?? 0.027); setRateLoading(false) })
      .catch(() => { setRate(0.027); setRateLoading(false) })
  }, [])

  // ── Derived amounts ──────────────────────────────────────────────────────────
  const parsedInput   = parseFloat(inputAmount) || 0
  const amountKES     = inputCurrency === 'KES' ? parsedInput : (rate ? parsedInput / rate : 0)
  const amountAED     = inputCurrency === 'AED' ? parsedInput : (rate ? parsedInput * rate : 0)
  const parsedPartial = parseFloat(partialAmount) || 0
  const chargeKES     = paymentType === 'full' ? amountKES : parsedPartial

  const fmt = (n, currency) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency, maximumFractionDigits: 2 }).format(n)

  // ── Validation ───────────────────────────────────────────────────────────────
  const notesWarning = notes.length > 3 && hasAcademicKeyword(notes)

  const validate = () => {
    const e = {}
    if (!project)                        e.project  = 'Select a project type'
    if (!name.trim())                    e.name     = 'Enter your full name'
    if (!email.trim())                   e.email    = 'Enter your email address'
    if (!phone.trim())                   e.phone    = 'Enter your phone number'
    if (chargeKES < MIN_KES)             e.amount   = `Minimum is ${fmt(MIN_KES, 'KES')}`
    if (paymentType === 'partial') {
      if (parsedPartial <= 0)            e.partial  = 'Enter a deposit amount'
      if (parsedPartial > amountKES)     e.partial  = `Cannot exceed ${fmt(amountKES, 'KES')}`
    }
    if (hasAcademicKeyword(notes))       e.notes    = 'Please use professional terms to describe your project.'
    if (!agreed)                         e.agreed   = 'Please accept the terms to continue'
    return e
  }

  const handleContinue = () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) {
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const errMsg = (field) => errors[field]
    ? <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
    : null

  const inputClass = (field) =>
    `w-full bg-white border rounded-lg px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-500 ${errors[field] ? 'border-red-400' : 'border-zinc-300'}`

  // ── Step 2: Payment ──────────────────────────────────────────────────────────
  if (step === 2) {
    return (
      <div className="min-h-screen bg-zinc-50 py-12">
        <div className="max-w-lg mx-auto px-4 sm:px-6">

          {/* Back to details */}
          <button
            onClick={() => setStep(1)}
            className="text-zinc-500 hover:text-zinc-900 text-sm mb-6 flex items-center gap-1 transition-colors"
          >
            ← Edit details
          </button>

          {/* Order summary */}
          <div className="bg-white border border-zinc-200 rounded-xl p-5 mb-4">
            <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">Paying for</p>
                <p className="font-bold text-zinc-900 text-lg">{project}</p>
                {notes && <p className="text-zinc-500 text-xs mt-1 max-w-xs">{notes}</p>}
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-bold text-zinc-900">{fmt(chargeKES, 'KES')}</p>
                <p className="text-zinc-400 text-xs mt-0.5">≈ {fmt(amountAED * (chargeKES / amountKES || 1), 'AED')}</p>
              </div>
            </div>
            <div className="border-t border-zinc-100 pt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-zinc-500">
              <span><strong className="text-zinc-700">Name:</strong> {name}</span>
              <span><strong className="text-zinc-700">Email:</strong> {email}</span>
              <span><strong className="text-zinc-700">Phone:</strong> {phone}</span>
              {paymentType === 'partial' && (
                <span><strong className="text-zinc-700">Total:</strong> {fmt(amountKES, 'KES')} · <span className="text-amber-600">Paying deposit</span></span>
              )}
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
            Pay {fmt(chargeKES, 'KES')}
          </button>

          <p className="text-zinc-400 text-xs text-center mt-3">
            M-Pesa · Card · Apple Pay · Paybill
          </p>

          <PaymentSheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            amount={chargeKES}
            serviceName={project}
            customerEmail={email}
            customerPhone={phone}
            customerName={name}
          />

        </div>
      </div>
    )
  }

  // ── Step 1: Details form ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-lg mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">DI</span>
          </div>
          <div>
            <p className="font-bold text-zinc-900 leading-tight">Draft-It</p>
            <p className="text-zinc-500 text-xs">draftit.co.ke · +254 726 899 113</p>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900">Pay for your project</h1>
          <p className="text-zinc-500 text-sm mt-1">Fill in your details and choose how to pay.</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-5">

          {/* Project */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Project type <span className="text-red-400">*</span>
            </label>
            <select
              value={project}
              onChange={e => { setProject(e.target.value); setErrors(v => ({ ...v, project: '' })) }}
              className={inputClass('project')}
            >
              <option value="">Select a project…</option>
              {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {errMsg('project')}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Description <span className="text-zinc-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={e => { setNotes(e.target.value); setErrors(v => ({ ...v, notes: '' })) }}
              placeholder="e.g. 5-page business website with contact form, or 10-slide pitch deck for a startup"
              rows={2}
              className={`w-full bg-white border rounded-lg px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-500 resize-none transition-colors ${
                notesWarning || errors.notes ? 'border-red-400' : 'border-zinc-300'
              }`}
            />
            {notesWarning && !errors.notes && (
              <div className="mt-1.5 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <span className="text-red-500 mt-0.5 shrink-0">⚠</span>
                <div>
                  <p className="text-red-700 text-xs font-semibold">We don't offer academic writing services.</p>
                  <p className="text-red-600 text-xs mt-0.5">
                    Try describing it as: <span className="font-medium">content writing, pitch deck, business document, technical write-up</span>, or similar.
                  </p>
                </div>
              </div>
            )}
            {errMsg('notes')}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Amount <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2 mb-2.5">
              {['KES', 'AED'].map(c => (
                <button
                  key={c}
                  onClick={() => { setInputCurrency(c); setInputAmount(''); setErrors(v => ({ ...v, amount: '' })) }}
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
                onChange={e => { setInputAmount(e.target.value); setErrors(v => ({ ...v, amount: '' })) }}
                placeholder="0.00"
                className={`w-full bg-white border rounded-lg pl-16 pr-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-500 ${errors.amount ? 'border-red-400' : 'border-zinc-300'}`}
              />
            </div>
            {errMsg('amount')}
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
                  <p className="text-zinc-500 text-xs mb-1.5">
                    Amount to pay now (KES) — max {fmt(amountKES, 'KES')}
                  </p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">KES</span>
                    <input
                      type="number"
                      min={MIN_KES}
                      max={amountKES}
                      value={partialAmount}
                      onChange={e => { setPartialAmount(e.target.value); setErrors(v => ({ ...v, partial: '' })) }}
                      placeholder={`e.g. ${Math.round(amountKES * 0.5).toLocaleString()}`}
                      className={`w-full bg-white border rounded-lg pl-16 pr-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-500 ${errors.partial ? 'border-red-400' : 'border-zinc-300'}`}
                    />
                  </div>
                  {errMsg('partial')}
                </div>
              )}
            </div>
          )}

          <div className="border-t border-zinc-100" />

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Full name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: '' })) }}
              placeholder="John Doe"
              className={inputClass('name')}
            />
            {errMsg('name')}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })) }}
              placeholder="your@email.com"
              className={inputClass('email')}
            />
            {errMsg('email')}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Phone <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => { setPhone(e.target.value); setErrors(v => ({ ...v, phone: '' })) }}
              placeholder="+254 7XX XXX XXX or +971 XX XXX XXXX"
              className={inputClass('phone')}
            />
            {errMsg('phone')}
          </div>

          {/* Terms */}
          <div>
            <label className={`flex items-start gap-3 cursor-pointer`}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => { setAgreed(e.target.checked); setErrors(v => ({ ...v, agreed: '' })) }}
                className="mt-0.5 w-4 h-4 accent-emerald-500 cursor-pointer shrink-0"
              />
              <span className="text-xs text-zinc-600 leading-relaxed">
                I agree to Draft-It's{' '}
                <Link to="/terms"   target="_blank" className="underline text-zinc-900">Terms of Service</Link>,{' '}
                <Link to="/refund"  target="_blank" className="underline text-zinc-900">Refund Policy</Link>, and{' '}
                <Link to="/privacy" target="_blank" className="underline text-zinc-900">Privacy Policy</Link>.
              </span>
            </label>
            {errMsg('agreed')}
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-base"
          >
            Continue to Payment →
          </button>

          <p className="text-zinc-400 text-xs text-center">
            Secured by Paystack &amp; Safaricom · Charges in KES
          </p>

        </div>
      </div>
    </div>
  )
}
