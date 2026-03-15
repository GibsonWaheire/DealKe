// src/components/PageHeader.jsx
import { useState, useEffect } from 'react'

export default function PageHeader({ label, title, subtitle, images }) {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (!images?.length) return
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [images])

  // ── With background slider ──────────────────────────────
  if (images?.length) {
    return (
      <div className="relative py-20 md:py-28 overflow-hidden">
        {images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 overflow-hidden transition-opacity duration-700"
            style={{ opacity: i === slide ? 1 : 0 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className={`w-full h-full object-cover ${i % 2 === 0 ? 'animate-kb-a' : 'animate-kb-b'}`}
              loading="lazy"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/68 via-black/55 to-black/42" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {label && (
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3 animate-fade-in">
              {label}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl animate-fade-in-up">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/65 mt-4 max-w-xl text-base leading-relaxed animate-fade-in-up delay-200">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    )
  }

  // ── Plain light version (fallback) ─────────────────────
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white border-b border-gray-100 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {label && (
          <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3 animate-fade-in">
            {label}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight max-w-3xl animate-fade-in-up">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-500 mt-4 max-w-xl text-base leading-relaxed animate-fade-in-up delay-200">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
