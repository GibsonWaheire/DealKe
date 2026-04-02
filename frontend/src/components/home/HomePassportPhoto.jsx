import { Link } from 'react-router-dom'

export default function HomePassportPhoto() {
  return (
    <section className="py-14 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* Left — content */}
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-xs font-semibold text-emerald-700 w-fit mb-5">
                <span>📸</span> Online Tool · KES 150
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight mb-3">
                Passport Photo — done in minutes
              </h2>

              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                Upload any photo. Our AI removes the background, you crop it to
                the Kenya 35×45 mm standard, then pay KES 150 to download a
                print-ready PNG — or a 4-up A4 sheet, ready for any photo
                studio.
              </p>

              <ul className="space-y-2 mb-8">
                {[
                  'AI background removal — runs in your browser',
                  'Crop locked to Kenya / UK 35×45 mm standard',
                  '300 DPI PNG — single or 4-up A4 print sheet',
                  'Instant download after payment',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/passport-photo"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
                >
                  Try it now — KES 150
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <span className="inline-flex items-center text-xs text-zinc-400 self-center">
                  No account needed
                </span>
              </div>
            </div>

            {/* Right — visual */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 sm:p-10 flex flex-col items-center justify-center gap-6 min-h-56">
              {/* Mock before/after cards */}
              <div className="flex items-center gap-4">
                {/* Before */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-[103px] rounded-lg overflow-hidden bg-zinc-700 border border-zinc-600 flex items-end justify-center relative">
                    {/* Simulated photo with busy background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-emerald-900/40" />
                    <div className="relative w-10 h-16 bg-zinc-400 rounded-t-full mx-auto" />
                  </div>
                  <span className="text-xs text-zinc-400">Original</span>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center gap-1">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="text-[10px] text-emerald-400 font-semibold">AI removes BG</span>
                </div>

                {/* After */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-[103px] rounded-lg overflow-hidden bg-white border-2 border-emerald-400 flex items-end justify-center relative">
                    <div className="relative w-10 h-16 bg-zinc-400 rounded-t-full mx-auto" />
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">35×45 mm ✓</span>
                </div>
              </div>

              {/* Price pill */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <span className="text-white font-bold text-base">KES 150</span>
                <span className="text-zinc-400 text-xs">·</span>
                <span className="text-zinc-300 text-xs">≈ $1.20</span>
                <span className="text-zinc-400 text-xs">·</span>
                <span className="text-zinc-300 text-xs">instant download</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
