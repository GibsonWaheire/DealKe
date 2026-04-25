// Handles: AI background removal, crop UI (react-easy-crop), watermarked preview.
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

// Remove shadow halos left by the AI — hard-thresholds the alpha channel.
// Pixels with alpha < 200 → fully transparent; >= 200 → fully opaque.
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

async function getCroppedImg(imageSrc, pixelCrop, bgColor, flipH = false) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = PASSPORT_W
      canvas.height = PASSPORT_H
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      // Fill solid background first
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, PASSPORT_W, PASSPORT_H)

      if (flipH) {
        ctx.translate(PASSPORT_W, 0)
        ctx.scale(-1, 1)
      }

      // pixelCrop may extend outside the image when restrictPosition=false.
      // Clamp source rect to actual image bounds, then compute where that
      // visible portion lands in the passport frame — prevents stretching.
      const sx  = pixelCrop.x
      const sy  = pixelCrop.y
      const sw  = pixelCrop.width
      const sh  = pixelCrop.height

      const csx  = Math.max(0, sx)
      const csy  = Math.max(0, sy)
      const csx2 = Math.min(image.naturalWidth,  sx + sw)
      const csy2 = Math.min(image.naturalHeight, sy + sh)

      if (csx2 > csx && csy2 > csy) {
        const scaleX = PASSPORT_W / sw
        const scaleY = PASSPORT_H / sh
        const dx = (csx  - sx) * scaleX
        const dy = (csy  - sy) * scaleY
        const dw = (csx2 - csx) * scaleX
        const dh = (csy2 - csy) * scaleY
        ctx.drawImage(image, csx, csy, csx2 - csx, csy2 - csy, dx, dy, dw, dh)
      }

      canvas.toBlob(
        blob => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
        'image/png',
        1.0,
      )
    }
    image.onerror = reject
    image.src = imageSrc
  })
}

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

export default function PassportPhotoEditor({ file, onCancel, onConfirm }) {
  // Internal steps: removing → cropping → preview
  const [editorStep, setEditorStep]           = useState('removing')
  const [bgRemovedUrl, setBgRemovedUrl]       = useState(null)
  const [progress, setProgress]               = useState(0)
  const [progressLabel, setProgressLabel]     = useState('Loading AI model…')
  const [bgError, setBgError]                 = useState(null)

  const [crop, setCrop]                       = useState({ x: 0, y: 0 })
  const [zoom, setZoom]                       = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [bgColor, setBgColor]                 = useState('#ffffff')

  const [previewBlob, setPreviewBlob]         = useState(null)
  const [isGenerating, setIsGenerating]       = useState(false)
  const [flipH, setFlipH]                     = useState(false)
  const canvasRef = useRef(null)

  // ── Run background removal on mount ───────────────────────────────────────
  useEffect(() => {
    let objectUrl = null
    let mounted   = true

    const run = async () => {
      try {
        const { removeBackground } = await import('@imgly/background-removal')
        const result = await removeBackground(file, {
          progress: (key, current, total) => {
            if (!mounted) return
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
        if (!mounted) return
        setProgressLabel('Cleaning up edges…')
        const cleaned = await cleanAlpha(result)
        const url = URL.createObjectURL(cleaned)
        if (!mounted) { URL.revokeObjectURL(url); return }
        objectUrl = url
        setBgRemovedUrl(url)
        setEditorStep('cropping')
      } catch (err) {
        console.error('Background removal failed:', err)
        if (!mounted) return
        setBgError('Background removal failed — you can still crop your original photo.')
        const url = URL.createObjectURL(file)
        objectUrl = url
        setBgRemovedUrl(url)
        setEditorStep('cropping')
      }
    }

    run()
    return () => {
      mounted = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const handleConfirmCrop = async () => {
    if (!croppedAreaPixels) return
    setIsGenerating(true)
    try {
      const blob = await getCroppedImg(bgRemovedUrl, croppedAreaPixels, bgColor, flipH)
      setPreviewBlob(blob)
      setEditorStep('preview')
    } catch (err) {
      console.error('Crop failed:', err)
    } finally {
      setIsGenerating(false)
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

  // ── Render: removing ──────────────────────────────────────────────────────
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
        <button
          onClick={onCancel}
          className="text-sm text-slate-400 hover:text-slate-600 underline transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  // ── Render: cropping ──────────────────────────────────────────────────────
  if (editorStep === 'cropping') {
    return (
      <div className="flex flex-col gap-5">
        {bgError && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-sm text-amber-700">
            {bgError}
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-700">
              Drag to reposition · scroll or pinch to zoom
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
          {/* react-easy-crop requires position:relative + explicit height on the parent */}
          <div className="relative h-72 rounded-xl overflow-hidden bg-zinc-100">
            {bgRemovedUrl && (
              <Cropper
                image={bgRemovedUrl}
                crop={crop}
                zoom={zoom}
                aspect={PASSPORT_W / PASSPORT_H}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                restrictPosition={false}
              />
            )}
            {/* Face position guide */}
            <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-4">
              <div
                className="border-2 border-white/50 rounded-[50%] opacity-70"
                style={{ width: '38%', aspectRatio: '1/1.1' }}
              />
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
            {/* Custom colour picker */}
            <label
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium cursor-pointer transition-all ${
                !BG_COLORS.some(c => c.value === bgColor)
                  ? 'border-emerald-500 ring-2 ring-emerald-200 text-emerald-700'
                  : 'border-zinc-200 text-slate-600 hover:border-zinc-300'
              }`}
              title="Custom colour"
            >
              <span
                className="w-4 h-4 rounded-full border border-zinc-300 shrink-0"
                style={{ backgroundColor: bgColor }}
              />
              Custom
              <input
                type="color"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                className="sr-only"
              />
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
            disabled={isGenerating || !croppedAreaPixels}
            className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? <><Spinner /> Generating…</> : 'Preview photo →'}
          </button>
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
          ← Re-crop
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
