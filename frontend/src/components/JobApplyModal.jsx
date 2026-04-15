// Job application modal — collects applicant details.
// Submit handler ready for email/backend wiring later.
import { useState } from 'react'

export default function JobApplyModal({ job, onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', portfolio: '', cover: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: wire to backend /api/apply or email service when ready
    await new Promise(r => setTimeout(r, 800)) // simulate network
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between gap-3 rounded-t-2xl z-10">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Applying for</p>
            <h2 className="text-slate-900 font-bold text-base leading-snug">{job.title}</h2>
            <p className="text-slate-500 text-sm">{job.company} · {job.location}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-slate-400 hover:text-slate-700 transition-colors mt-1"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">Application Submitted!</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                Thank you, <strong>{form.name.split(' ')[0]}</strong>. We've received your application
                for <strong>{job.title}</strong> at {job.company}. We'll be in touch via{' '}
                <strong>{form.email}</strong> if you're shortlisted.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-slate-900 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-slate-700 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Salary info banner */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-slate-500 text-xs">Salary</span>
                <span className="text-slate-900 font-bold text-sm">{job.salary}</span>
              </div>

              {/* Full name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Full name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Jane Mwangi"
                  autoComplete="off"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={set('email')}
                  placeholder="jane@email.com"
                  autoComplete="off"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-400"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Phone number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="+254 7XX XXX XXX"
                  autoComplete="off"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-400"
                />
              </div>

              {/* Portfolio / LinkedIn */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  LinkedIn or Portfolio URL{' '}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={form.portfolio}
                  onChange={set('portfolio')}
                  placeholder="https://linkedin.com/in/yourname"
                  autoComplete="off"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-400"
                />
              </div>

              {/* Cover note */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Why are you a good fit?{' '}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.cover}
                  onChange={set('cover')}
                  placeholder="Briefly describe your experience and why you're applying..."
                  autoComplete="off"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : 'Submit Application →'}
              </button>

              <p className="text-slate-400 text-xs text-center">
                Your details are kept private and used only for this application.
              </p>

            </form>
          )}
        </div>
      </div>
    </div>
  )
}
