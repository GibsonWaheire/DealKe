import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'draftit_newsletter_dismissed'
const DELAY_MS = 12000 // show after 12 seconds

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setLoading(true)

    // Using Brevo (formerly Sendinblue) free tier — replace API_KEY and LIST_ID
    // after you sign up at brevo.com
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': import.meta.env.VITE_BREVO_API_KEY || '',
        },
        body: JSON.stringify({
          email,
          listIds: [Number(import.meta.env.VITE_BREVO_LIST_ID) || 1],
          updateEnabled: true,
        }),
      })
    } catch (_) {
      // fail silently — still show success to user
    }

    setLoading(false)
    setSubmitted(true)
    localStorage.setItem(STORAGE_KEY, '1')
    setTimeout(() => setVisible(false), 3000)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">You're in!</h3>
            <p className="text-gray-500 text-sm">We'll send you tips and exclusive offers.</p>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-1">Free tips & offers</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
              Grow your business in Kenya — for free
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Get KRA tips, web design guides, and exclusive Draft-It discounts straight to your inbox. No spam.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors disabled:opacity-60"
              >
                {loading ? 'Subscribing…' : 'Get Free Tips'}
              </button>
            </form>
            <p className="text-center text-xs text-gray-400 mt-3">
              Unsubscribe any time.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
