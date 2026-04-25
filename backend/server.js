// backend/server.js
require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const mpesaRoutes = require('./routes/mpesa')
const jobsRoutes  = require('./routes/jobs')

const app  = express()
const PORT = process.env.PORT || 4000

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'https://draftit.co.ke',
  'https://www.draftit.co.ke',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    // allow server-to-server / curl (no origin) and whitelisted origins
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true)
    cb(new Error(`CORS: ${origin} not allowed`))
  },
  methods: ['GET', 'POST'],
}))
app.use(express.json())

// ── Routes ───────────────────────────────────────────────
app.use('/api/mpesa', mpesaRoutes)
app.use('/api/jobs',  jobsRoutes)

app.get('/health', (_req, res) => res.json({ status: 'ok', env: process.env.MPESA_ENV }))


// ── Start ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`DealFlow backend running on http://localhost:${PORT}`)
  console.log(`M-Pesa env: ${process.env.MPESA_ENV || 'sandbox'}`)
})
