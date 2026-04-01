// Shared payment methods component used by OrderPage and ClientPayPage.
// Handles: M-Pesa STK Push (direct Daraja), Paystack (Card/Apple Pay/M-Pesa), M-Pesa Paybill.
import { useState, useRef, useEffect } from 'react'
import { paymentConfig } from '../constants/paymentConfig'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

function generateRef() {
  const ts   = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `DI-${ts}-${rand}`
}

const CheckIcon = () => (
  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

// Props:
//   amount         — KES number to charge
//   serviceName    — label shown in WhatsApp message and Paystack dashboard
//   category       — optional (e.g. "KRA", "Shop")
//   customerEmail  — pre-fill Paystack email field
//   customerPhone  — pre-fill STK phone field
//   customerName   — passed to Paystack metadata
//   onPaymentSuccess(result) — fired when any method confirms payment
//                              result: { method, reference, amount }
export default function PaymentMethods({
  amount,
  serviceName,
  category = '',
  customerEmail = '',
  customerPhone = '',
  customerName  = '',
  onPaymentSuccess,
}) {
  const fmt = (n) => `KES ${Number(n).toLocaleString()}`

  const buildWaUrl = (method, ref) => {
    const msg = `Hi, I just paid for *${serviceName}*.\nAmount: ${fmt(amount)}\nMethod: ${method}\nReference: ${ref || '—'}\n\nPlease confirm and proceed.`
    return `https://wa.me/${paymentConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`
  }

  const copyText = (text, setter) => {
    navigator.clipboard.writeText(text)
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  // ── STK Push state ─────────────────────────────────────────────────────────
  const [stkPhone,      setStkPhone]      = useState(customerPhone)
  const [stkStatus,     setStkStatus]     = useState('idle') // idle|loading|polling|paid|error|timeout
  const [stkMessage,    setStkMessage]    = useState('')
  const [stkCheckoutId, setStkCheckoutId] = useState('')
  const pollRef   = useRef(null)
  const pollCount = useRef(0)

  useEffect(() => () => clearInterval(pollRef.current), [])

  const startPolling = (checkoutRequestId) => {
    pollCount.current = 0
    pollRef.current = setInterval(async () => {
      pollCount.current += 1
      if (pollCount.current > 15) {
        clearInterval(pollRef.current)
        setStkStatus('timeout')
        setStkMessage('No confirmation after 60 seconds. Check your phone or try another method.')
        return
      }
      try {
        const res  = await fetch(`${BACKEND}/api/mpesa/query`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ checkoutRequestId }),
        })
        const data = await res.json()
        if (data.paid) {
          clearInterval(pollRef.current)
          setStkStatus('paid')
          onPaymentSuccess?.({ method: 'M-Pesa STK Push', reference: checkoutRequestId, amount })
        }
      } catch { /* silent — keep polling */ }
    }, 4000)
  }

  const handleStkPush = async () => {
    if (!stkPhone) return
    setStkStatus('loading')
    setStkMessage('')
    try {
      const res  = await fetch(`${BACKEND}/api/mpesa/stk-push`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          phone:        stkPhone,
          amount,
          serviceLabel: serviceName,
          accountRef:   'DraftIt',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Payment request failed')
      setStkCheckoutId(data.checkoutRequestId)
      setStkStatus('polling')
      setStkMessage('STK push sent — enter your M-Pesa PIN on your phone…')
      startPolling(data.checkoutRequestId)
    } catch (err) {
      setStkStatus('error')
      setStkMessage(err.message || 'Something went wrong. Try again.')
    }
  }

  const resetStk = () => {
    clearInterval(pollRef.current)
    setStkStatus('idle')
    setStkMessage('')
    setStkCheckoutId('')
  }

  // ── Paystack state ─────────────────────────────────────────────────────────
  const [paystackEmail,  setPaystackEmail]  = useState(customerEmail)
  const [paystackStatus, setPaystackStatus] = useState('idle') // idle|loading|success
  const [paystackRef,    setPaystackRef]    = useState('')
  const paystackSuccessRef = useRef(false)

  const handlePaystack = async () => {
    if (!paystackEmail) return
    if (!window.PaystackPop) {
      setPaystackStatus('idle')
      return
    }
    paystackSuccessRef.current = false
    setPaystackStatus('loading')
    const ref        = generateRef()
    const paystackPop = new window.PaystackPop()
    await paystackPop.checkout({
      key:      import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email:    paystackEmail,
      amount:   Math.round(amount * 100),
      currency: 'KES',
      ref,
      label:    serviceName,
      firstname: customerName.split(' ')[0] || '',
      lastname:  customerName.split(' ').slice(1).join(' ') || '',
      metadata: {
        custom_fields: [
          { display_name: 'Service',  variable_name: 'service',  value: serviceName },
          { display_name: 'Category', variable_name: 'category', value: category || '—' },
          { display_name: 'Customer', variable_name: 'customer', value: customerName || '—' },
        ],
      },
      onSuccess: (transaction) => {
        paystackSuccessRef.current = true
        setPaystackRef(transaction.reference)
        setPaystackStatus('success')
        onPaymentSuccess?.({ method: 'Paystack', reference: transaction.reference, amount })
      },
      onCancel: () => { /* handled after await */ },
    })
    if (!paystackSuccessRef.current) setPaystackStatus('idle')
  }

  // ── Paybill state ──────────────────────────────────────────────────────────
  const [paybillOpen,   setPaybillOpen]   = useState(false)
  const [paid,          setPaid]          = useState(false)
  const [copiedPaybill, setCopiedPaybill] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState(false)

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-3">

      {/* ── 1. M-Pesa STK Push ────────────────────────────────────────────── */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-1 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-zinc-900 text-sm">M-Pesa STK Push</p>
            <p className="text-zinc-500 text-xs">We send a payment prompt to your phone</p>
          </div>
          <span className="ml-auto text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Fastest</span>
        </div>

        <div className="px-5 pb-5 pt-3">
          {stkStatus === 'paid' ? (
            <div className="text-center py-2">
              <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2"><CheckIcon /></div>
              <p className="text-emerald-700 font-semibold text-sm mb-3">Payment confirmed!</p>
              <a href={buildWaUrl('M-Pesa STK Push', stkCheckoutId)} target="_blank" rel="noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm text-center">
                Confirm on WhatsApp →
              </a>
            </div>
          ) : stkStatus === 'polling' ? (
            <div>
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5 mb-3">
                <Spinner />
                <p className="text-emerald-700 text-xs">{stkMessage}</p>
              </div>
              <button onClick={resetStk} className="w-full text-xs text-zinc-400 hover:text-zinc-600 py-1 transition-colors">
                Cancel — try another method
              </button>
            </div>
          ) : stkStatus === 'timeout' ? (
            <div>
              <p className="text-amber-700 text-xs bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">{stkMessage}</p>
              <button onClick={resetStk} className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold py-2.5 rounded-lg text-sm transition-colors">
                Try again
              </button>
            </div>
          ) : (
            <div>
              <input
                type="tel"
                value={stkPhone}
                onChange={e => setStkPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-500 mb-2.5"
              />
              {stkStatus === 'error' && (
                <p className="text-red-600 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-2.5">{stkMessage}</p>
              )}
              <button
                onClick={handleStkPush}
                disabled={!stkPhone || stkStatus === 'loading'}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
              >
                {stkStatus === 'loading' ? <><Spinner /> Sending…</> : `Send ${fmt(amount)} to My Phone`}
              </button>
              <p className="text-zinc-400 text-xs text-center mt-1.5">You'll get a PIN prompt from Safaricom</p>
            </div>
          )}
        </div>
      </div>

      {/* ── 2. Paystack — Card / Apple Pay / M-Pesa ───────────────────────── */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-1 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-zinc-900 text-sm">Card · Apple Pay · M-Pesa</p>
            <p className="text-zinc-500 text-xs">Secure Paystack checkout — Apple Pay on Safari</p>
          </div>
          <span className="ml-auto text-[10px] font-semibold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">International</span>
        </div>

        <div className="px-5 pb-5 pt-3">
          {paystackStatus === 'success' ? (
            <div className="text-center py-2">
              <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2"><CheckIcon /></div>
              <p className="text-emerald-700 font-semibold text-sm mb-1">Payment confirmed!</p>
              <p className="text-zinc-400 text-xs font-mono mb-3">Ref: {paystackRef}</p>
              <a href={buildWaUrl('Card / Apple Pay / Paystack', paystackRef)} target="_blank" rel="noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm text-center">
                Confirm on WhatsApp →
              </a>
            </div>
          ) : (
            <div>
              <input
                type="email"
                value={paystackEmail}
                onChange={e => setPaystackEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-500 mb-2.5"
              />
              <button
                onClick={handlePaystack}
                disabled={!paystackEmail || paystackStatus === 'loading'}
                className="w-full bg-zinc-900 hover:bg-zinc-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
              >
                {paystackStatus === 'loading' ? <><Spinner /> Opening checkout…</> : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Pay {fmt(amount)} — Card / Apple Pay / M-Pesa
                  </>
                )}
              </button>
              <p className="text-zinc-400 text-xs text-center mt-1.5">Opens Paystack secure checkout · All major cards accepted</p>
            </div>
          )}
        </div>
      </div>

      {/* ── 3. M-Pesa Paybill (collapsible) ───────────────────────────────── */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setPaybillOpen(o => !o)}
          className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-zinc-50 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-zinc-900 text-sm">M-Pesa Paybill</p>
            <p className="text-zinc-500 text-xs">Pay manually from the Safaricom app or USSD</p>
          </div>
          <svg className={`w-4 h-4 text-zinc-400 transition-transform shrink-0 ${paybillOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {paybillOpen && (
          <div className="px-5 pb-5 space-y-3 border-t border-zinc-100">
            <p className="text-zinc-500 text-xs pt-3">
              Go to <strong>M-Pesa → Lipa na M-Pesa → Pay Bill</strong> and enter the details below:
            </p>
            {[
              ['Business No.', paymentConfig.paybillNumber,  copiedPaybill, setCopiedPaybill],
              ['Account No.',  paymentConfig.paybillAccount, copiedAccount, setCopiedAccount],
            ].map(([label, value, copied, setter]) => (
              <div key={label} className="flex items-center justify-between bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3">
                <div>
                  <p className="text-zinc-500 text-xs">{label}</p>
                  <p className="text-zinc-900 font-mono font-bold text-sm">{value}</p>
                </div>
                <button
                  onClick={() => copyText(value, setter)}
                  className="text-xs bg-zinc-200 hover:bg-zinc-300 text-zinc-700 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
            <div className="pt-2 border-t border-zinc-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paid}
                  onChange={e => setPaid(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 cursor-pointer shrink-0"
                />
                <span className="text-zinc-700 text-sm">I have completed the Paybill payment</span>
              </label>
              {paid && (
                <a
                  href={buildWaUrl('M-Pesa Paybill', paymentConfig.paybillNumber)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm text-center"
                >
                  Confirm Payment on WhatsApp →
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-zinc-400 text-xs text-center pb-2">
        All payments in KES · Secured by Safaricom &amp; Paystack
      </p>
    </div>
  )
}
