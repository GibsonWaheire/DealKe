// src/components/PageHeader.jsx
export default function PageHeader({ label, title, subtitle }) {
  return (
    <div className="bg-zinc-900 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {label && (
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
            {label}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-zinc-400 mt-3 max-w-xl text-base leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
