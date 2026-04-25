import { useState, useRef, useCallback, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import PassportPhotoEditor from '../components/PassportPhotoEditor'
import PassportPhotoDownload from '../components/PassportPhotoDownload'
import PaymentSheet from '../components/PaymentSheet'

const STRUCTURED_DATA = [
  // Product schema — lets Google show price in search results
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Online Passport Photo Kenya — 35×45mm',
    description: 'AI background removal, crop to Kenya standard 35×45mm, instant download of 300 DPI print-ready PNG or 4-up A4 sheet.',
    brand: { '@type': 'Brand', name: 'Draft-It' },
    image: 'https://draftit.co.ke/og-image.jpg',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KES',
      price: '150',
      availability: 'https://schema.org/InStock',
      url: 'https://draftit.co.ke/passport-photo',
      seller: { '@type': 'Organization', name: 'Draft-It' },
    },
  },
  // WebApplication schema — for the tool itself
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Passport Photo Editor — Draft-It',
    url: 'https://draftit.co.ke/passport-photo',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    description: 'Online passport photo maker for Kenya. Upload a photo, remove background with AI, crop to 35×45mm, pay KES 150 and download instantly.',
    offers: { '@type': 'Offer', priceCurrency: 'KES', price: '150' },
  },
  // FAQPage schema — targets Google "People Also Ask" boxes
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a passport photo cost online in Kenya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A passport photo on Draft-It costs KES 150 (about $1.20). Pay online with M-Pesa or card, and download your print-ready 35×45mm PNG instantly — no queuing at a photo studio.',
        },
      },
      {
        '@type': 'Question',
        name: 'What size is a Kenya passport photo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kenya passport photos must be 35mm wide by 45mm tall (35×45mm). Draft-It crops your photo to exactly this size at 300 DPI, ready to print at any photo studio or print shop.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I remove the background from a passport photo online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Draft-It uses AI to automatically remove the background from your photo directly in your browser — your photo is never uploaded to a server. You can choose white, light blue, or light gray as the replacement background.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I print a passport photo sheet at home?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. After paying KES 150, you can download a 4-up A4 sheet with four passport photos arranged for printing. Print at 300 DPI on photo paper for best results.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe to upload my photo online for a passport photo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your photo never leaves your device. All AI background removal and cropping runs entirely in your browser using WebAssembly — nothing is sent to or stored on our servers.',
        },
      },
    ],
  },
  // BreadcrumbList
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://draftit.co.ke/' },
      { '@type': 'ListItem', position: 2, name: 'Passport Photo', item: 'https://draftit.co.ke/passport-photo' },
    ],
  },
]

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

  const fileInputRef    = useRef(null)
  const videoRef        = useRef(null)
  const snapCanvasRef   = useRef(null)
  const streamRef       = useRef(null)

  const [cameraOpen,   setCameraOpen]   = useState(false)
  const [cameraFacing, setCameraFacing] = useState('user')
  const [cameraError,  setCameraError]  = useState(null)
  const [cameraReady,  setCameraReady]  = useState(false)

  // ── Camera helpers ─────────────────────────────────────────────────────────
  const startStream = useCallback(async (facing) => {
    setCameraError(null)
    setCameraReady(false)
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch {
      setCameraError('Camera access denied. Please allow camera permission or upload a photo instead.')
    }
  }, [])

  const openCamera = useCallback(() => {
    setCameraOpen(true)
    setCameraFacing('user')
    startStream('user')
  }, [startStream])

  const stopCamera = useCallback(() => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null }
    setCameraOpen(false)
    setCameraReady(false)
    setCameraError(null)
  }, [])

  const switchCamera = useCallback(() => {
    const next = cameraFacing === 'user' ? 'environment' : 'user'
    setCameraFacing(next)
    startStream(next)
  }, [cameraFacing, startStream])

  const capturePhoto = useCallback(() => {
    const video  = videoRef.current
    const canvas = snapCanvasRef.current
    if (!video || !canvas) return
    canvas.width  = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    // Mirror front-camera so captured image is not flipped
    if (cameraFacing === 'user') {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }
    ctx.drawImage(video, 0, 0)
    canvas.toBlob(blob => {
      if (!blob) return
      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })
      stopCamera()
      handleFileSelect(file)
    }, 'image/jpeg', 0.95)
  }, [cameraFacing, stopCamera]) // handleFileSelect added below via useCallback dep

  // Clean up stream if component unmounts while camera is open
  useEffect(() => () => { if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop()) }, [])

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
      <Helmet>
        {/* Keywords — supplements the global SeoManager title/description */}
        <meta name="keywords" content="passport photo online Kenya, passport photo maker Kenya, online passport photo Nairobi, Kenya passport photo 35x45mm, passport photo background removal, passport size photo Kenya, cheap passport photo Kenya, passport photo KES 150, print ready passport photo Kenya, 4up passport photo sheet Kenya" />
        <meta property="og:image" content="https://draftit.co.ke/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://draftit.co.ke/og-image.jpg" />
        {/* Structured data — injected as separate script tags */}
        {STRUCTURED_DATA.map((schema, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

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
              <h2 className="font-semibold text-slate-800 mb-4">Add your photo</h2>

              {/* Primary option: Take photo */}
              <button
                onClick={openCamera}
                className="w-full flex items-center gap-4 border-2 border-dashed border-emerald-300 hover:border-emerald-400 hover:bg-emerald-50 rounded-xl p-5 text-left transition-all mb-3"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Take a photo</p>
                  <p className="text-slate-400 text-xs mt-0.5">Use your camera — works on phone &amp; desktop</p>
                </div>
              </button>

              {/* Secondary option: Upload file */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all select-none ${
                  isDragging
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <span className="text-sm text-slate-600 font-medium">Upload from device</span>
                </div>
                <p className="text-slate-400 text-xs mt-1">JPG, PNG, WEBP · max 15 MB · drag &amp; drop supported</p>
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

        {/* Description + FAQ — shown on upload step only */}
        {step === 'upload' && (
          <div className="mt-8 space-y-6 text-sm text-slate-600">

            <p className="text-center text-xs text-slate-400">
              Kenya/UK passport photo standard: 35 × 45 mm · 300 DPI print quality
            </p>

            {/* What this tool does */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
              <h2 className="font-semibold text-slate-800 mb-2">What is this tool?</h2>
              <p className="leading-relaxed">
                Draft-It's Passport Photo Editor lets you create a Kenya-standard passport photo entirely in your browser
                — no app download, no photo studio queue. Upload any clear photo of yourself, and the tool will:
              </p>
              <ul className="mt-3 space-y-1.5 list-none">
                {[
                  { icon: '🤖', text: 'Remove the background automatically using AI' },
                  { icon: '✂️', text: 'Crop and resize to the exact 35 × 45 mm Kenya passport size' },
                  { icon: '🖨️', text: 'Export a 300 DPI print-ready PNG — or a 4-up A4 sheet with four photos' },
                  { icon: '🔒', text: 'Process everything locally — your photo never leaves your device' },
                ].map(item => (
                  <li key={item.text} className="flex items-start gap-2">
                    <span className="mt-0.5">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 leading-relaxed">
                Once your photo looks right, pay <strong className="text-slate-800">KES 150</strong> (≈ $1.20) via M-Pesa or card,
                and download your file instantly.
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
              <h2 className="font-semibold text-slate-800 mb-3">Common questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'What size is a Kenya passport photo?',
                    a: 'Kenya passport photos must be 35 mm wide × 45 mm tall. Draft-It crops your photo to exactly this size at 300 DPI, ready to print at any print shop.',
                  },
                  {
                    q: 'Is my photo stored on your servers?',
                    a: 'No. All background removal and cropping runs in your browser using WebAssembly. Nothing is uploaded or stored anywhere.',
                  },
                  {
                    q: 'What do I get after paying?',
                    a: 'You can download a single 35×45 mm PNG, or a 4-up A4 sheet with four photos — both at 300 DPI, ready for printing.',
                  },
                  {
                    q: 'Can I change the background colour?',
                    a: 'Yes — after removing the background you can choose white, light blue, or light grey before saving.',
                  },
                ].map(item => (
                  <div key={item.q}>
                    <p className="font-medium text-slate-700">{item.q}</p>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Hidden canvas used for camera snapshot */}
      <canvas ref={snapCanvasRef} className="hidden" />

      {/* Camera modal */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <button onClick={stopCamera} className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="text-sm font-semibold">Take your passport photo</p>
            <button onClick={switchCamera} className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Switch camera">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>

          {/* Video */}
          <div className="flex-1 relative overflow-hidden">
            {cameraError ? (
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                <div>
                  <p className="text-white text-sm">{cameraError}</p>
                  <button
                    onClick={stopCamera}
                    className="mt-4 px-4 py-2 rounded-xl bg-white text-slate-800 text-sm font-semibold"
                  >
                    Use file upload instead
                  </button>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  onCanPlay={() => setCameraReady(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transform: cameraFacing === 'user' ? 'scaleX(-1)' : 'none' }}
                />
                {/* Face guide overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="border-2 border-white/70 rounded-[50%]"
                    style={{ width: '55%', maxWidth: 260, aspectRatio: '35/45' }}
                  />
                </div>
                <p className="absolute bottom-28 left-0 right-0 text-center text-white/80 text-xs">
                  Align your face within the oval · neutral expression · no glasses
                </p>
              </>
            )}
          </div>

          {/* Capture button */}
          {!cameraError && (
            <div className="flex items-center justify-center py-8">
              <button
                onClick={capturePhoto}
                disabled={!cameraReady}
                className="w-18 h-18 rounded-full bg-white disabled:opacity-50 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                style={{ width: 72, height: 72 }}
              >
                <div className="w-14 h-14 rounded-full border-4 border-slate-300 bg-white" />
              </button>
            </div>
          )}
        </div>
      )}

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
