// backend/server.js
require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const mpesaRoutes = require('./routes/mpesa')

const app  = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}))
app.use(express.json())

// ── Routes ───────────────────────────────────────────────
app.use('/api/mpesa', mpesaRoutes)

app.get('/health', (_req, res) => res.json({ status: 'ok', env: process.env.MPESA_ENV }))

// ── Start ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`DealKe backend running on http://localhost:${PORT}`)
  console.log(`M-Pesa env: ${process.env.MPESA_ENV || 'sandbox'}`)
})
