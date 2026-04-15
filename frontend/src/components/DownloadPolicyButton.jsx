// Triggers browser print dialog — user can Save as PDF from there.
export default function DownloadPolicyButton({ label = 'Download PDF' }) {
  return (
    <button
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-slate-500 text-slate-700 hover:text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
    >
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
      </svg>
      {label}
    </button>
  )
}
