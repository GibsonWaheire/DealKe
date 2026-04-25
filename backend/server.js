// backend/server.js
require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const mpesaRoutes = require('./routes/mpesa')
const jobsRoutes  = require('./routes/jobs')

const app  = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}))
app.use(express.json())

// ── Routes ───────────────────────────────────────────────
app.use('/api/mpesa', mpesaRoutes)
app.use('/api/jobs',  jobsRoutes)

app.get('/health', (_req, res) => res.json({ status: 'ok', env: process.env.MPESA_ENV }))

app.get('/my-ip', async (_req, res) => {
  try {
    const r = await fetch('https://api.ipify.org?format=json')
    const d = await r.json()
    res.json(d)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ── Start ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`DealFlow backend running on http://localhost:${PORT}`)
  console.log(`M-Pesa env: ${process.env.MPESA_ENV || 'sandbox'}`)
})
