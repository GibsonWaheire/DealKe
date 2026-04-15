// Cookie consent banner — stores preference in localStorage.
// Shows once; hidden permanently after Accept or Decline.
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'draftit_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const respond = (choice) => {
    localStorage.setItem(STORAGE_KEY, choice) // 'accepted' | 'declined'
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="no-print fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl shadow-black/40 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">

        {/* Icon */}
        <div className="shrink-0 hidden sm:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center text-lg">
          🍪
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm mb-0.5">We use cookies &amp; third-party tools</p>
          <p className="text-slate-400 text-xs leading-relaxed">
            We use cookies and third-party tools (including Google Analytics) to understand how
            visitors use our site, enable secure payments, and improve your experience. No
            advertising or social media tracking cookies are used.{' '}
            <Link to="/privacy" className="underline text-slate-300 hover:text-white transition-colors">Privacy Notice</Link>
            {' '}·{' '}
            <Link to="/terms" className="underline text-slate-300 hover:text-white transition-colors">Terms</Link>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => respond('declined')}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => respond('accepted')}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-white transition-colors"
          >
            Accept
          </button>
        </div>

      </div>
    </div>
  )
}
