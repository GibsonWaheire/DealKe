import { Link } from 'react-router-dom'
import { WA_PHONE } from '../../data/homeData'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import { useRef } from 'react'

export default function HomeCta() {
  const sectionRef = useRef(null)
  const visible = useScrollAnimation(sectionRef, { threshold: 0.2 })

  return (
    <section ref={sectionRef} className="bg-zinc-900 border-t border-zinc-800 py-16 text-center">
      <div className={`max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-3">Get started</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Stop putting it off.</h2>
        <p className="text-zinc-300 text-base mb-8">Pay directly for any service — we start immediately. M-Pesa, card, or Apple Pay.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/pay" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors">
            Pay for a service →
          </Link>
          <Link to="/contact" className="border border-zinc-400 text-zinc-100 hover:border-zinc-200 hover:text-white font-medium px-7 py-3.5 rounded-xl transition-colors">
            Send a quote request
          </Link>
        </div>
        <p className="text-zinc-400 text-xs mt-4">{WA_PHONE} · Mon–Sat, 8am–8pm</p>
      </div>
    </section>
  )
}
