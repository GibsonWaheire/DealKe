import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { featuredServices, microServices } from '../../data/homeData'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import WaIcon from './WaIcon'
import { parsePrice, waLink } from './homeUtils'

export default function HomeServices() {
  const navigate = useNavigate()
  const servicesRef = useRef(null)
  const servicesVisible = useScrollAnimation(servicesRef, { threshold: 0.2 })

  return (
    <>
      <section id="services" ref={servicesRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
            <div className={`transition-all duration-700 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">Popular services</p>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">Most requested, fastest turnaround</h2>
              <p className="text-zinc-600 text-sm mb-8">Full catalog with 70+ services is on the Services page.</p>
              <div className="border border-zinc-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-5 py-2.5 bg-zinc-50 border-b border-zinc-200">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Service</span>
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide text-right">Price</span>
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide text-right hidden sm:block">Time</span>
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide text-right">Order</span>
                </div>
                {featuredServices.map((svc, i) => (
                  <div
                    key={svc.name}
                    className={`grid grid-cols-[1fr_auto_auto_auto] gap-3 px-5 py-3.5 items-center hover:bg-zinc-50 transition-all duration-500 ${i > 0 ? 'border-t border-zinc-200' : ''} ${servicesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                      <span className="text-zinc-800 font-medium text-sm truncate">{svc.name}</span>
                      {svc.note && <span className="hidden sm:inline bg-zinc-100 text-zinc-700 text-xs px-2 py-0.5 rounded-full border border-zinc-200 shrink-0">{svc.note}</span>}
                    </div>
                    <span className="text-zinc-900 font-bold text-sm text-right whitespace-nowrap">{svc.price}</span>
                    <span className="text-zinc-500 text-xs text-right whitespace-nowrap hidden sm:block">{svc.turnaround}</span>
                    <button
                      onClick={() => navigate('/order', { state: { serviceName: svc.name, price: parsePrice(svc.price), currency: 'KES', category: 'Services' } })}
                      className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Order →
                    </button>
                  </div>
                ))}
              </div>
              <Link to="/services" className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-900 text-sm font-medium mt-5 underline underline-offset-2">
                View all 70+ services →
              </Link>
            </div>
            <div className={`space-y-4 lg:pt-14 transition-all duration-700 delay-150 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Documents and pen" className="w-full h-52 object-cover rounded-2xl" loading="lazy" />
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Laptop workspace" className="w-full h-52 object-cover rounded-2xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">Quick services</p>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">Small tasks. Fast. Fixed price.</h2>
            <p className="text-zinc-600 text-sm mt-1">WhatsApp your request — most are done same day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {microServices.map((group) => (
              <div key={group.category} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                <div className={`${group.accentBg} px-5 py-4 flex items-center gap-2`}>
                  <span className="text-lg">{group.icon}</span>
                  <h3 className="text-white font-bold text-sm">{group.category}</h3>
                </div>
                <div className="divide-y divide-zinc-100">
                  {group.services.map((svc) => (
                    <div key={svc.name} className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-zinc-50 transition-colors">
                      <span className="text-zinc-700 text-xs leading-snug flex-1">{svc.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${group.accentLight} ${group.accentText}`}>KES {svc.price}</span>
                        <a href={waLink(`Hi, I need "${svc.name}" — KES ${svc.price}. Please confirm and share M-Pesa payment details.`)} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-green-600 transition-colors" aria-label="Order on WhatsApp">
                          <WaIcon />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-200">
                  <a href={waLink(`Hi, I need help with a ${group.category} task. Can you assist?`)} target="_blank" rel="noreferrer" className={`text-xs font-semibold ${group.accentText} hover:underline`}>
                    Ask about a custom task →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
