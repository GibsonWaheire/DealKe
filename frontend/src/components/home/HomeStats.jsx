import { useEffect, useRef, useState } from 'react'
import { stats } from '../../data/homeData'
import useScrollAnimation from '../../hooks/useScrollAnimation'

export default function HomeStats() {
  const [count47, setCount47] = useState(0)
  const [count6, setCount6] = useState(0)
  const [count42, setCount42] = useState(0)
  const statsRef = useRef(null)
  const flowRef = useRef(null)
  const statsVisible = useScrollAnimation(statsRef, { threshold: 0.2 })
  const flowVisible = useScrollAnimation(flowRef, { threshold: 0.2 })

  useEffect(() => {
    if (!statsVisible) return
    const animateCount = (target, duration, setValue, decimals = 0) => {
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = target * eased
        setValue(decimals > 0 ? Number(current.toFixed(decimals)) : Math.round(current))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    animateCount(47, 1500, setCount47)
    animateCount(6, 1000, setCount6)
    animateCount(4.2, 1500, setCount42, 1)
  }, [statsVisible])

  return (
    <>
      <section ref={statsRef} className="bg-zinc-900 border-y border-zinc-800 py-10">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center"><p className="text-3xl font-bold text-white">{count47}</p><p className="text-zinc-400 text-sm mt-1">{stats[0].label}</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-white">{count6}</p><p className="text-zinc-400 text-sm mt-1">{stats[1].label}</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-white">{count42.toFixed(1)}</p><p className="text-zinc-400 text-sm mt-1">{stats[2].label}</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-white">{stats[3].value}</p><p className="text-zinc-400 text-sm mt-1">{stats[3].label}</p></div>
          </div>
        </div>
      </section>
      <div ref={flowRef} className="bg-zinc-50 text-zinc-700 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 text-sm">
            <div className={`flex items-center gap-2 transition-all duration-500 ${flowVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}><span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span><span className="text-zinc-600">WhatsApp your request</span></div>
            <span className="hidden sm:block text-zinc-400 mx-4">→</span>
            <div className={`flex items-center gap-2 transition-all duration-500 delay-100 ${flowVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}><span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span><span className="text-zinc-600">Confirm price · Pay via M-Pesa</span></div>
            <span className="hidden sm:block text-zinc-400 mx-4">→</span>
            <div className={`flex items-center gap-2 transition-all duration-500 delay-200 ${flowVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}><span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span><span className="text-zinc-600">Service delivered — usually same day</span></div>
          </div>
        </div>
      </div>
    </>
  )
}
