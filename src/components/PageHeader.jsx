// src/components/PageHeader.jsx
export default function PageHeader({ label, title, subtitle }) {
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
