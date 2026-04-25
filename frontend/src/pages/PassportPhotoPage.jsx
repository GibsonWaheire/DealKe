import { useState, useRef, useCallback } from 'react'
import PassportPhotoEditor from '../components/PassportPhotoEditor'
import PassportPhotoDownload from '../components/PassportPhotoDownload'
import PaymentSheet from '../components/PaymentSheet'

const COUNTRIES = [
  { code: '+254',   flag: '🇰🇪', name: 'Kenya',        placeholder: '7XX XXX XXX',  regex: /^0?[71]\d{8}$/ },
  { code: '+971',   flag: '🇦🇪', name: 'UAE',          placeholder: '5X XXX XXXX',  regex: /^0?5\d{8}$/ },
  { code: '+974',   flag: '🇶🇦', name: 'Qatar',        placeholder: '5XXX XXXX',    regex: /^[3-7]\d{7}$/ },
  { code: '+966',   flag: '🇸🇦', name: 'Saudi Arabia', placeholder: '5X XXX XXXX',  regex: /^0?5\d{8}$/ },
  { code: '+1',     flag: '🇺🇸', name: 'USA / Canada', placeholder: 'XXX XXX XXXX', regex: /^\d{10}$/ },
  { code: '+44',    flag: '🇬🇧', name: 'UK',           placeholder: '7XXX XXXXXX',  regex: /^0?7\d{9}$/ },
  { code: '+255',   flag: '🇹🇿', name: 'Tanzania',     placeholder: '7XX XXX XXX',  regex: /^0?[67]\d{8}$/ },
  { code: '+256',   flag: '🇺🇬', name: 'Uganda',       placeholder: '7XX XXX XXX',  regex: /^0?[37]\d{8}$/ },
  { code: '+27',    flag: '🇿🇦', name: 'South Africa', placeholder: '7X XXX XXXX',  regex: /^0?[67]\d{8}$/ },
  { code: '+91',    flag: '🇮🇳', name: 'India',        placeholder: 'XXXXX XXXXX',  regex: /^[6-9]\d{9}$/ },
  { code: '+other', flag: '🌍',  name: 'Other',        placeholder: 'XXXXXXXXXX',   regex: /^\d{6,15}$/ },
]

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PRICE = 150

const STEP_LABELS = ['Upload', 'Edit', 'Pay', 'Download']
const STEP_INDEX  = { upload: 0, edit: 1, details: 2, done: 3 }

export default function PassportPhotoPage() {
  const [step, setStep]               = useState('upload') // upload | edit | details | done
  const [uploadedFile, setUploadedFile] = useState(null)
  const [processedBlob, setProcessedBlob] = useState(null)
  const [isDragging, setIsDragging]   = useState(false)

  // Details form
  const [name, setName]               = useState('')
  const [email, setEmail]             = useState('')
  const [phoneCountry, setPhoneCountry] = useState(COUNTRIES[0])
  const [phoneLocal, setPhoneLocal]   = useState('')
  const [errors, setErrors]           = useState({})
  const [sheetOpen, setSheetOpen]     = useState(false)

  const fileInputRef = useRef(null)

  const stepIndex = STEP_INDEX[step] ?? 0

  const fullPhone = phoneLocal
    ? (phoneCountry.code === '+other'
        ? phoneLocal
        : phoneCountry.code + phoneLocal.replace(/^0+/, ''))
    : ''

  const emailInvalid = email.length > 5  && !EMAIL_REGEX.test(email)
  const phoneInvalid = phoneLocal.length > 3 && !phoneCountry.regex.test(phoneLocal.replace(/\s/g, ''))

  // ── Upload handlers ────────────────────────────────────────────────────────
  const handleFileSelect = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please upload a JPG, PNG, or WEBP image.')
      return
    }
    if (file.size > 15 * 1024 * 1024) {
      alert('File too large — please use an image under 15 MB.')
      return
    }
    setUploadedFile(file)
    setStep('edit')
  }

  const handleDragOver  = useCallback((e) => { e.preventDefault(); setIsDragging(true) }, [])
  const handleDragLeave = useCallback(() => setIsDragging(false), [])
  const handleDrop      = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files[0])
  }, [])

  // ── Editor → details ───────────────────────────────────────────────────────
  const handleEditorConfirm = (blob) => {
    setProcessedBlob(blob)
    setStep('details')
  }

  // ── Validation + payment ───────────────────────────────────────────────────
  const validate = () => {
    const e = {}
    if (!name.trim())                          e.name  = 'Enter your full name'
    if (!email.trim() || !EMAIL_REGEX.test(email)) e.email = 'Enter a valid email address'
    if (!phoneLocal.trim())                    e.phone = 'Enter your phone number'
    else if (phoneInvalid)                     e.phone = `Invalid phone for ${phoneCountry.name}`
    return e
  }

  const handlePay = () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) setSheetOpen(true)
  }

  const errMsg = (field) => errors[field]
    ? <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
    : null

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-50 pb-16">
      <div className="max-w-lg mx-auto px-4 pt-10">

        {/* Page header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-xs font-semibold text-emerald-700 mb-4">
            <span>📸</span> Online Passport Photo Tool
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Passport Photo Editor</h1>
          <p className="text-slate-500 text-sm mt-2">
            Remove background · Crop to 35×45 mm · Download at 300 DPI
          </p>
        </div>

        {/* Step indicator */}
        {step !== 'done' && (
          <div className="flex items-center justify-center gap-1 mb-8">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex items-center gap-1">
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < stepIndex  ? 'bg-emerald-500 text-white' :
                    i === stepIndex ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-400' :
                                     'bg-zinc-100 text-zinc-400'
                  }`}>
                    {i < stepIndex ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${
                    i <= stepIndex ? 'text-slate-700' : 'text-zinc-400'
                  }`}>
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div className={`w-5 h-px mx-1 ${i < stepIndex ? 'bg-emerald-400' : 'bg-zinc-200'}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">

          {/* ── Upload ─────────────────────────────────────────────────────── */}
          {step === 'upload' && (
            <div>
              <h2 className="font-semibold text-slate-800 mb-4">Upload your photo</h2>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all select-none ${
                  isDragging
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <p className="font-semibold text-slate-700 text-sm">Drop your photo here</p>
                <p className="text-slate-400 text-xs mt-1">or click to browse · JPG, PNG, WEBP · max 15 MB</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={e => handleFileSelect(e.target.files?.[0])}
              />

              <p className="text-xs text-slate-400 text-center mt-3">
                Your photo is processed in your browser — never sent to our servers.
              </p>

              {/* How it works */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: '🖼️', label: 'Upload', sub: 'JPG or PNG' },
                  { icon: '✂️', label: 'Edit & crop', sub: 'AI removes BG' },
                  { icon: '💳', label: 'Pay KES 150', sub: 'then download' },
                ].map(item => (
                  <div key={item.label} className="bg-zinc-50 rounded-xl p-3 text-center">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <p className="text-xs font-semibold text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Edit ───────────────────────────────────────────────────────── */}
          {step === 'edit' && (
            <div>
              <h2 className="font-semibold text-slate-800 mb-4">Edit your photo</h2>
              <PassportPhotoEditor
                file={uploadedFile}
                onCancel={() => { setUploadedFile(null); setStep('upload') }}
                onConfirm={handleEditorConfirm}
              />
            </div>
          )}

          {/* ── Details + payment ──────────────────────────────────────────── */}
          {step === 'details' && (
            <div>
              <h2 className="font-semibold text-slate-800 mb-1">Your details</h2>
              <p className="text-sm text-slate-500 mb-5">We'll send your payment receipt to your email.</p>

              {/* Price summary */}
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-5">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Passport Photo — Draft-It</p>
                  <p className="text-xs text-slate-500 mt-0.5">35×45 mm · background removed · print-ready PNG</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-lg font-bold text-emerald-700">KES 150</p>
                  <p className="text-xs text-slate-400">≈ $1.20</p>
                </div>
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: undefined })) }}
                  placeholder="e.g. Jane Muthoni"
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                    errors.name ? 'border-red-400 bg-red-50' : 'border-zinc-200 focus:border-emerald-400'
                  }`}
                />
                {errMsg('name')}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: undefined })) }}
                  placeholder="jane@example.com"
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                    errors.email || emailInvalid ? 'border-red-400 bg-red-50' : 'border-zinc-200 focus:border-emerald-400'
                  }`}
                />
                {errMsg('email')}
                {emailInvalid && !errors.email && (
                  <p className="text-red-500 text-xs mt-1">Invalid email address</p>
                )}
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone number</label>
                <div className={`flex rounded-xl border overflow-hidden transition-colors ${
                  errors.phone || phoneInvalid ? 'border-red-400' : 'border-zinc-200 focus-within:border-emerald-400'
                }`}>
                  <select
                    value={phoneCountry.code}
                    onChange={e => {
                      setPhoneCountry(COUNTRIES.find(c => c.code === e.target.value) || COUNTRIES[0])
                      setPhoneLocal('')
                      setErrors(v => ({ ...v, phone: undefined }))
                    }}
                    className="bg-zinc-50 border-r border-zinc-200 px-2 py-2.5 text-sm text-slate-700 outline-none shrink-0 cursor-pointer"
                  >
                    {COUNTRIES.map(c => (
                      <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={phoneLocal}
                    onChange={e => { setPhoneLocal(e.target.value); setErrors(v => ({ ...v, phone: undefined })) }}
                    placeholder={phoneCountry.placeholder}
                    className="flex-1 px-3 py-2.5 text-sm outline-none bg-white min-w-0"
                  />
                </div>
                {errMsg('phone')}
                {phoneInvalid && !errors.phone && (
                  <p className="text-red-500 text-xs mt-1">Invalid phone number for {phoneCountry.name}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('edit')}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 text-slate-600 text-sm font-medium hover:border-zinc-300 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handlePay}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
                >
                  Pay KES 150 →
                </button>
              </div>
            </div>
          )}

          {/* ── Done / download ─────────────────────────────────────────────── */}
          {step === 'done' && (
            <div>
              <h2 className="font-semibold text-slate-800 mb-4">Download your photo</h2>
              <PassportPhotoDownload blob={processedBlob} />
            </div>
          )}
        </div>

        {/* Footer note on upload screen */}
        {step === 'upload' && (
          <p className="text-center text-xs text-slate-400 mt-5">
            Kenya/UK passport photo standard: 35 × 45 mm · 300 DPI print quality
          </p>
        )}
      </div>

      {/* Payment sheet — rendered at page level so it can cover the full viewport */}
      <PaymentSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        amount={PRICE}
        serviceName="Passport Photo — Draft-It"
        category="Photo"
        description="Passport photo: background removed, cropped to 35×45mm, print-ready PNG"
        customerEmail={email}
        customerPhone={fullPhone}
        customerName={name}
        onPaymentSuccess={() => {
          setSheetOpen(false)
          setStep('done')
        }}
      />
    </div>
  )
}
