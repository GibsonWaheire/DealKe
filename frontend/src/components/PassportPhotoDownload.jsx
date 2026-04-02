// Post-payment download panel.
// Props: blob — the clean (watermark-free) PNG blob
import { useState } from 'react'

const PASSPORT_W = 413
const PASSPORT_H = 531

async function buildA4Sheet(blob) {
  const A4_W   = 2480
  const A4_H   = 3508
  const MARGIN = 71    // ~6mm at 300 DPI
  const GAP    = 59    // ~5mm at 300 DPI

  const canvas = document.createElement('canvas')
  canvas.width  = A4_W
  canvas.height = A4_H
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, A4_W, A4_H)

  const img = await createImageBitmap(blob)

  const positions = [
    [MARGIN,               MARGIN],
    [MARGIN + PASSPORT_W + GAP, MARGIN],
    [MARGIN,               MARGIN + PASSPORT_H + GAP],
    [MARGIN + PASSPORT_W + GAP, MARGIN + PASSPORT_H + GAP],
  ]
  positions.forEach(([x, y]) => ctx.drawImage(img, x, y, PASSPORT_W, PASSPORT_H))

  return new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0))
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a   = document.createElement('a')
  a.href     = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const DownloadIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

const Spinner = () => (
  <svg className="w-5 h-5 animate-spin shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

export default function PassportPhotoDownload({ blob }) {
  const [sheetLoading, setSheetLoading] = useState(false)

  if (!blob) return null

  const handleSingle = () => downloadBlob(blob, 'passport-photo-draftit.png')

  const handleSheet = async () => {
    setSheetLoading(true)
    try {
      const sheetBlob = await buildA4Sheet(blob)
      downloadBlob(sheetBlob, 'passport-photo-4up-draftit.png')
    } finally {
      setSheetLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Success banner */}
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
        <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-emerald-800 text-sm">Payment confirmed!</p>
          <p className="text-emerald-600 text-xs">Your photo is ready to download below.</p>
        </div>
      </div>

      {/* Download: single */}
      <button
        onClick={handleSingle}
        className="w-full flex items-center justify-between px-4 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
      >
        <div className="text-left">
          <p className="font-semibold text-sm">Download passport photo</p>
          <p className="text-emerald-100 text-xs mt-0.5">Single photo · PNG · 35×45mm · 300 DPI</p>
        </div>
        <DownloadIcon />
      </button>

      {/* Download: 4-up sheet */}
      <button
        onClick={handleSheet}
        disabled={sheetLoading}
        className="w-full flex items-center justify-between px-4 py-4 rounded-xl border border-zinc-200 hover:border-zinc-300 text-slate-700 disabled:opacity-60 transition-colors"
      >
        <div className="text-left">
          <p className="font-semibold text-sm">Download 4-up A4 sheet</p>
          <p className="text-slate-400 text-xs mt-0.5">4 photos on A4 · ready to print</p>
        </div>
        {sheetLoading ? <Spinner /> : <DownloadIcon />}
      </button>

      {/* Tips */}
      <div className="bg-zinc-50 rounded-xl px-4 py-3 text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-600 mb-1.5">Print tips</p>
        <p>• Set printer to 300 DPI for best quality</p>
        <p>• Use glossy or matte photo paper</p>
        <p>• Dimensions: 35 × 45 mm (Kenya/UK standard)</p>
      </div>

      {/* Start over */}
      <button
        onClick={() => window.location.reload()}
        className="text-sm text-slate-400 hover:text-slate-600 underline text-center transition-colors"
      >
        Edit another photo
      </button>
    </div>
  )
}
