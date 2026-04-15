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

// ── Country phone prefixes ────────────────────────────────────────────────────
const COUNTRIES = [
  { code: '+254', flag: '🇰🇪', name: 'Kenya',        placeholder: '7XX XXX XXX',  regex: /^0?[71]\d{8}$/ },
  { code: '+971', flag: '🇦🇪', name: 'UAE',          placeholder: '5X XXX XXXX',  regex: /^0?5\d{8}$/ },
  { code: '+974', flag: '🇶🇦', name: 'Qatar',        placeholder: '5XXX XXXX',    regex: /^[3-7]\d{7}$/ },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia', placeholder: '5X XXX XXXX',  regex: /^0?5\d{8}$/ },
  { code: '+1',   flag: '🇺🇸', name: 'USA / Canada', placeholder: 'XXX XXX XXXX', regex: /^\d{10}$/ },
  { code: '+44',  flag: '🇬🇧', name: 'UK',           placeholder: '7XXX XXXXXX',  regex: /^0?7\d{9}$/ },
  { code: '+255', flag: '🇹🇿', name: 'Tanzania',     placeholder: '7XX XXX XXX',  regex: /^0?[67]\d{8}$/ },
  { code: '+256', flag: '🇺🇬', name: 'Uganda',       placeholder: '7XX XXX XXX',  regex: /^0?[37]\d{8}$/ },
  { code: '+27',  flag: '🇿🇦', name: 'South Africa', placeholder: '7X XXX XXXX',  regex: /^0?[67]\d{8}$/ },
  { code: '+91',  flag: '🇮🇳', name: 'India',        placeholder: 'XXXXX XXXXX',  regex: /^[6-9]\d{9}$/ },
  { code: '+other', flag: '🌍', name: 'Other',       placeholder: 'XXXXXXXXXX',   regex: /^\d{6,15}$/ },
]

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const MIN_KES = 100
const MAX_KES = 500_000

export default function ClientPayPage() {
  // ── Step 1 state ────────────────────────────────────────────────────────────
  const [project,       setProject]       = useState('')
  const [notes,         setNotes]         = useState('')
  const [inputCurrency, setInputCurrency] = useState('KES')
  const [inputAmount,   setInputAmount]   = useState('')
  const [paymentType,    setPaymentType]   = useState('full')
  const [partialPercent, setPartialPercent] = useState(50)
  const [name,          setName]          = useState('')
  const [email,         setEmail]         = useState('')
  const [phoneCountry,  setPhoneCountry]  = useState(COUNTRIES[0])
  const [phoneLocal,    setPhoneLocal]    = useState('')
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
  const partialKES    = amountKES * (partialPercent / 100)
  const chargeKES     = paymentType === 'full' ? amountKES : partialKES

  const fmt = (n, currency) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency, maximumFractionDigits: 2 }).format(n)

  // ── Derived phone ────────────────────────────────────────────────────────────
  const fullPhone = phoneLocal
    ? (phoneCountry.code === '+other' ? phoneLocal : phoneCountry.code + phoneLocal.replace(/^0+/, ''))
    : ''

  // ── Live validation flags ─────────────────────────────────────────────────────
  const notesWarning  = notes.length > 3 && hasAcademicKeyword(notes)
  const emailInvalid  = email.length > 5 && !EMAIL_REGEX.test(email)
  const phoneInvalid  = phoneLocal.length > 3 && !phoneCountry.regex.test(phoneLocal.replace(/\s/g, ''))

  const validate = () => {
    const e = {}
    if (!project)                                         e.project = 'Select a project type'
    if (!name.trim())                                     e.name    = 'Enter your full name'
    if (!email.trim())                                    e.email   = 'Enter your email address'
    else if (!EMAIL_REGEX.test(email))                    e.email   = 'Enter a valid email address'
    if (!phoneLocal.trim())                               e.phone   = 'Enter your phone number'
    else if (phoneInvalid)                                e.phone   = `Invalid number for ${phoneCountry.name} — expected format: ${phoneCountry.placeholder}`
    if (chargeKES < MIN_KES)                              e.amount  = `Minimum is ${fmt(MIN_KES, 'KES')}`
    if (amountKES > MAX_KES)                              e.amount  = `Maximum is ${fmt(MAX_KES, 'KES')} — contact us for larger projects`
    if (paymentType === 'partial') {
      if (partialPercent <= 0 || partialPercent >= 100)   e.partial = 'Select a valid deposit percentage'
    }
    if (hasAcademicKeyword(notes))                        e.notes   = 'Please use professional terms to describe your project.'
    if (project === 'Custom / Other' && notes.trim().length < 20)
                                                          e.notes   = 'Please describe your project in at least 20 characters so we can process it correctly.'
    else if (notes.trim().length > 0 && notes.trim().length < 5)
                                                          e.notes   = 'Add a bit more detail about your project.'
    if (!agreed)                                          e.agreed  = 'Please accept the terms to continue'
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
            className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 bg-white border border-zinc-200 hover:border-zinc-400 px-4 py-2 rounded-lg transition-colors mb-6"
          >
            ← Back &amp; edit details
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
              <span><strong className="text-zinc-700">Phone:</strong> {fullPhone}</span>
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
            customerPhone={fullPhone}
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
              Description{' '}
              {project === 'Custom / Other'
                ? <span className="text-red-400">*</span>
                : <span className="text-zinc-400 font-normal">(optional)</span>
              }
            </label>
            {project === 'Custom / Other' && (
              <p className="text-zinc-500 text-xs mb-1.5">
                Tell us exactly what you need — the more detail, the faster we can process your order.
              </p>
            )}
            <textarea
              value={notes}
              onChange={e => { setNotes(e.target.value); setErrors(v => ({ ...v, notes: '' })) }}
              placeholder={
                project === 'Custom / Other'
                  ? 'e.g. Print design for a 2-sided A5 flyer, logo needed for a cleaning company, etc.'
                  : 'e.g. 5-page business website with contact form, or 10-slide pitch deck for a startup'
              }
              rows={project === 'Custom / Other' ? 3 : 2}
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
                  <p className="text-zinc-500 text-xs mb-2">Choose how much to pay now:</p>
                  <div className="flex gap-2">
                    {[25, 50, 75].map(pct => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => { setPartialPercent(pct); setErrors(v => ({ ...v, partial: '' })) }}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                          partialPercent === pct
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                  {parsedInput > 0 && (
                    <p className="text-zinc-500 text-xs mt-2">
                      Paying <span className="font-semibold text-zinc-800">{fmt(chargeKES, 'KES')}</span>
                      {inputCurrency === 'AED' && <span> ≈ {fmt(parsedInput * (partialPercent / 100), 'AED')}</span>}
                      {' '}now · remaining {fmt(amountKES - partialKES, 'KES')} due on delivery
                    </p>
                  )}
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
              className={`${inputClass('email')} ${emailInvalid && !errors.email ? 'border-red-400' : ''}`}
            />
            {emailInvalid && !errors.email && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid email — e.g. name@example.com</p>
            )}
            {errMsg('email')}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Phone <span className="text-red-400">*</span>
            </label>
            <div className={`flex border rounded-lg overflow-hidden transition-colors ${errors.phone ? 'border-red-400' : phoneInvalid ? 'border-red-400' : 'border-zinc-300'}`}>
              {/* Country selector */}
              <select
                value={phoneCountry.code}
                onChange={e => {
                  setPhoneCountry(COUNTRIES.find(c => c.code === e.target.value))
                  setPhoneLocal('')
                  setErrors(v => ({ ...v, phone: '' }))
                }}
                className="bg-zinc-50 border-r border-zinc-300 text-zinc-700 text-sm px-2 py-2.5 focus:outline-none shrink-0 cursor-pointer"
              >
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code === '+other' ? 'Other' : c.code}
                  </option>
                ))}
              </select>
              {/* Number input */}
              <input
                type="tel"
                value={phoneLocal}
                onChange={e => {
                  setPhoneLocal(e.target.value.replace(/[^\d\s]/g, ''))
                  setErrors(v => ({ ...v, phone: '' }))
                }}
                placeholder={phoneCountry.placeholder}
                className="flex-1 bg-white px-3 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none"
              />
            </div>
            {phoneInvalid && !errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {phoneCountry.name} number should look like: <span className="font-medium">{phoneCountry.placeholder}</span>
              </p>
            )}
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

          {/* Refund / dispute notice */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-xs text-zinc-500 space-y-1">
            <p><span className="font-semibold text-zinc-700">Refunds:</span> Eligible within 48 hours if work has not started. See our{' '}
              <Link to="/refund" target="_blank" className="underline text-zinc-700">Refund Policy</Link>.
            </p>
            <p><span className="font-semibold text-zinc-700">Disputes:</span> Email{' '}
              <a href="mailto:help@draftit.co.ke" className="underline text-zinc-700">help@draftit.co.ke</a>{' '}
              or <a href="https://wa.me/254726899113" target="_blank" rel="noreferrer" className="underline text-zinc-700">WhatsApp us</a> — we resolve all issues within 24 hours.
            </p>
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-base"
          >
            Continue to Payment →
          </button>

          <p className="text-zinc-400 text-xs text-center">
            Payments secured by Paystack · Charges in KES
          </p>

        </div>
      </div>
    </div>
  )
}
