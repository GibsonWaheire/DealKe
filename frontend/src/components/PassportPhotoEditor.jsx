// Handles: crop UI first (react-easy-crop on original photo), then AI background
// removal on the cropped result, then watermarked preview.
// Props:
//   file       — File object from the upload step
//   onCancel   — called when user clicks Back/Cancel
//   onConfirm  — called with (blob) when user approves the preview
import { useState, useEffect, useRef, useCallback } from 'react'
import Cropper from 'react-easy-crop'

const PASSPORT_W = 413   // px at 300 DPI for 35mm
const PASSPORT_H = 531   // px at 300 DPI for 45mm

const BG_COLORS = [
  { label: 'White',      value: '#ffffff' },
  { label: 'Light Blue', value: '#c8daf5' },
  { label: 'Light Gray', value: '#f2f2f2' },
]

// Crop original photo to passport dimensions — no background applied yet.
function cropToPassport(imageSrc, pixelCrop, flipH = false) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = PASSPORT_W
      canvas.height = PASSPORT_H
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      if (flipH) { ctx.translate(PASSPORT_W, 0); ctx.scale(-1, 1) }
      ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
        0, 0, PASSPORT_W, PASSPORT_H,
      )
      canvas.toBlob(
        blob => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
        'image/png', 1.0,
      )
    }
    image.onerror = reject
    image.src = imageSrc
  })
}

// Composite a transparent-bg PNG onto a solid background colour.
function compositeOnBg(blob, bgColor) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      canvas.toBlob(resolve, 'image/png', 1.0)
    }
    img.onerror = reject
    img.src = url
  })
}

// Remove shadow halos left by the AI — hard-thresholds the alpha channel.
function cleanAlpha(blob) {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      const raw = ctx.getImageData(0, 0, canvas.width, canvas.height)
      for (let i = 3; i < raw.data.length; i += 4) {
        raw.data[i] = raw.data[i] < 200 ? 0 : 255
      }
      ctx.putImageData(raw, 0, 0)
      canvas.toBlob(resolve, 'image/png', 1.0)
    }
    img.src = url
  })
}

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

export default function PassportPhotoEditor({ file, onCancel, onConfirm }) {
  // Flow: cropping (original) → removing (AI) → preview
  const [editorStep, setEditorStep]           = useState('cropping')
  const [originalUrl, setOriginalUrl]         = useState(null)
  const [progress, setProgress]               = useState(0)
  const [progressLabel, setProgressLabel]     = useState('Cropping…')

  const [crop, setCrop]                       = useState({ x: 0, y: 0 })
  const [zoom, setZoom]                       = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [bgColor, setBgColor]                 = useState('#ffffff')

  const [previewBlob, setPreviewBlob]         = useState(null)
  const [isProcessing, setIsProcessing]       = useState(false)
  const [flipH, setFlipH]                     = useState(false)
  const canvasRef = useRef(null)

  // Create object URL for the original file so user edits on the real photo
  useEffect(() => {
    const url = URL.createObjectURL(file)
    setOriginalUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])

  // User is happy with the crop → crop first, then remove background
  const handleConfirmCrop = async () => {
    if (!croppedAreaPixels || !originalUrl) return
    setIsProcessing(true)
    setEditorStep('removing')
    setProgress(0)
    try {
      // 1. Crop the original photo to passport dimensions
      setProgressLabel('Cropping your photo…')
      const cropped = await cropToPassport(originalUrl, croppedAreaPixels, flipH)

      // 2. Remove background from the cropped passport image
      setProgressLabel('Loading AI model…')
      const { removeBackground } = await import('@imgly/background-removal')
      const bgRemoved = await removeBackground(cropped, {
        progress: (key, current, total) => {
          if (key.includes('fetch') || key.includes('load') || key.includes('model')) {
            setProgressLabel('Loading AI model… (first time only, cached after)')
          } else {
            setProgressLabel('Removing background…')
          }
          if (total > 0) setProgress(Math.round((current / total) * 100))
        },
        model: 'medium',
        output: { format: 'image/png', quality: 1.0 },
      })

      // 3. Clean shadow halos from alpha edges
      setProgressLabel('Cleaning up edges…')
      const cleaned = await cleanAlpha(bgRemoved)

      // 4. Composite onto chosen background colour
      const final = await compositeOnBg(cleaned, bgColor)

      setPreviewBlob(final)
      setEditorStep('preview')
    } catch (err) {
      console.error('Processing failed:', err)
      setEditorStep('cropping')
    } finally {
      setIsProcessing(false)
    }
  }

  // ── Draw watermarked preview ───────────────────────────────────────────────
  useEffect(() => {
    if (!previewBlob || !canvasRef.current || editorStep !== 'preview') return
    const canvas = canvasRef.current
    canvas.width  = PASSPORT_W
    canvas.height = PASSPORT_H
    const ctx = canvas.getContext('2d')

    const img = new Image()
    const url = URL.createObjectURL(previewBlob)
    img.onload = () => {
      ctx.clearRect(0, 0, PASSPORT_W, PASSPORT_H)
      ctx.drawImage(img, 0, 0)
      // Diagonal watermark
      ctx.save()
      ctx.globalAlpha = 0.20
      ctx.fillStyle   = '#111111'
      ctx.font        = 'bold 40px sans-serif'
      ctx.translate(PASSPORT_W / 2, PASSPORT_H / 2)
      ctx.rotate(-Math.PI / 5)
      for (let y = -PASSPORT_H; y < PASSPORT_H; y += 88) {
        ctx.fillText('DRAFT-IT', -110, y)
      }
      ctx.restore()
      URL.revokeObjectURL(url)
    }
    img.src = url
  }, [previewBlob, editorStep])

  // ── Render: cropping — user frames the shot on the ORIGINAL photo ──────────
  if (editorStep === 'cropping') {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-700">
              Position &amp; zoom · drag anywhere · scroll to zoom
            </p>
            <button
              onClick={() => setFlipH(v => !v)}
              title="Flip horizontally"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                flipH
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-zinc-200 text-slate-500 hover:border-zinc-300'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              Flip
            </button>
          </div>

          {/* react-easy-crop requires position:relative + explicit height */}
          <div className="relative rounded-xl overflow-hidden bg-zinc-100" style={{ height: 320 }}>
            {originalUrl && (
              <Cropper
                image={originalUrl}
                crop={crop}
                zoom={zoom}
                aspect={PASSPORT_W / PASSPORT_H}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                restrictPosition={false}
              />
            )}
            {/* Face guide — centered oval, sits in the upper-middle third of the frame */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-start pt-6">
              <div
                className="border-2 border-white/60 rounded-[50%]"
                style={{ width: '36%', aspectRatio: '1 / 1.25' }}
              />
              <p className="text-white/70 text-[10px] mt-2">align face here</p>
            </div>
          </div>

          <input
            type="range"
            min={1} max={3} step={0.05}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
            className="w-full mt-3 accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Background colour */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Background colour</p>
          <div className="flex gap-2 flex-wrap items-center">
            {BG_COLORS.map(c => (
              <button
                key={c.value}
                onClick={() => setBgColor(c.value)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                  bgColor === c.value
                    ? 'border-emerald-500 ring-2 ring-emerald-200 text-emerald-700'
                    : 'border-zinc-200 text-slate-600 hover:border-zinc-300'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-zinc-200 shrink-0"
                  style={{ backgroundColor: c.value }}
                />
                {c.label}
              </button>
            ))}
            <label
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium cursor-pointer transition-all ${
                !BG_COLORS.some(c => c.value === bgColor)
                  ? 'border-emerald-500 ring-2 ring-emerald-200 text-emerald-700'
                  : 'border-zinc-200 text-slate-600 hover:border-zinc-300'
              }`}
              title="Custom colour"
            >
              <span className="w-4 h-4 rounded-full border border-zinc-300 shrink-0" style={{ backgroundColor: bgColor }} />
              Custom
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="sr-only" />
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 text-slate-600 text-sm font-medium hover:border-zinc-300 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleConfirmCrop}
            disabled={isProcessing || !croppedAreaPixels}
            className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {isProcessing ? <><Spinner /> Processing…</> : 'Remove background →'}
          </button>
        </div>
      </div>
    )
  }

  // ── Render: removing — AI processing after crop ───────────────────────────
  if (editorStep === 'removing') {
    return (
      <div className="flex flex-col items-center gap-6 py-10 px-2">
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">{progressLabel}</span>
            <span className="text-sm tabular-nums text-slate-400">{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-2.5 bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(progress, 3)}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            Processed entirely in your browser — your photo is never uploaded.
          </p>
        </div>
      </div>
    )
  }

  // ── Render: preview ───────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-center">
        <p className="text-sm font-medium text-slate-700 mb-1">Your passport photo</p>
        <p className="text-xs text-slate-400">Watermark removed after payment</p>
      </div>

      <canvas
        ref={canvasRef}
        style={{ width: 180, height: 231, imageRendering: 'auto' }}
        className="rounded-lg shadow-md border border-zinc-100 block"
      />

      <div className="flex gap-3 w-full">
        <button
          onClick={() => setEditorStep('cropping')}
          className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-slate-600 text-sm font-medium hover:border-zinc-300 transition-colors"
        >
          ← Re-position
        </button>
        <button
          onClick={() => onConfirm(previewBlob)}
          className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
        >
          Looks good →
        </button>
      </div>
    </div>
  )
}
