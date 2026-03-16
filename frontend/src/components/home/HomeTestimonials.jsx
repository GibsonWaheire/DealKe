import { useRef } from 'react'
import { testimonials } from '../../data/homeData'
import useScrollAnimation from '../../hooks/useScrollAnimation'

export default function HomeTestimonials() {
  const sectionRef = useRef(null)
  const visible = useScrollAnimation(sectionRef, { threshold: 0.2 })

  return (
    <section ref={sectionRef} className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">Client feedback</p>
        <h2 className="text-2xl font-bold text-zinc-900 mb-8">What people actually said.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className={`bg-zinc-50 border border-zinc-200 rounded-2xl p-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <p className="text-amber-400 text-sm tracking-widest">★★★★★</p>
              <p className="text-zinc-700 text-sm leading-relaxed mt-3">"{t.quote}"</p>
              <div className="mt-4 pt-4 border-t border-zinc-200">
                <p className="text-zinc-900 font-semibold text-sm">— {t.name}</p>
                <p className="text-zinc-500 text-xs mt-0.5">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
