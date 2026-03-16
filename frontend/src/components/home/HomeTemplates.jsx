import { useState } from 'react'
import { TILL, templateCategories } from '../../data/homeData'
import WaIcon from './WaIcon'
import { waLink } from './homeUtils'

export default function HomeTemplates() {
  const [tmplTab, setTmplTab] = useState('mpesa')

  return (
    <section className="py-20 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">Templates</p>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">Ready-made Kenyan templates</h2>
            <p className="text-zinc-600 text-sm mt-1">
              Free or KES 50 · Pay via M-Pesa Till <span className="font-semibold text-zinc-700">{TILL}</span> · Sent on WhatsApp
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {templateCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setTmplTab(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tmplTab === cat.id ? 'bg-zinc-900 text-white shadow-sm' : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {templateCategories.filter((c) => c.id === tmplTab).map((cat) => (
          <div key={cat.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cat.templates.map((t) => (
              <div key={t.name} className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${t.price === 0 ? 'bg-zinc-100 text-zinc-700 border border-zinc-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    {t.price === 0 ? 'Free' : `KES ${t.price}`}
                  </span>
                </div>
                <p className="text-zinc-800 font-medium text-sm leading-snug flex-1">{t.name}</p>
                <a
                  href={t.price === 0 ? waLink(`Hi, please send me the "${t.name}" (free template).`) : waLink(`Hi, I'd like the "${t.name}" template. Please share M-Pesa Till details for KES ${t.price}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                >
                  <WaIcon /> {t.price === 0 ? 'Get Free' : `Order · KES ${t.price}`}
                </a>
              </div>
            ))}
          </div>
        ))}
        <p className="text-zinc-500 text-xs mt-8">All templates are fully editable in Word, PDF or Excel. Sent via WhatsApp within minutes of payment confirmation.</p>
      </div>
    </section>
  )
}
