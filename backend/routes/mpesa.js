// backend/routes/mpesa.js
const express = require('express')
const axios   = require('axios')
const router  = express.Router()

const ENV      = process.env.MPESA_ENV || 'sandbox'
const BASE_URL = ENV === 'production'
  ? 'https://api.safaricom.co.ke'
  : 'https://sandbox.safaricom.co.ke'

// ── Helpers ─────────────────────────────────────────────

async function getAccessToken() {
  const key    = process.env.MPESA_CONSUMER_KEY
  const secret = process.env.MPESA_CONSUMER_SECRET
  const creds  = Buffer.from(`${key}:${secret}`).toString('base64')

  const { data } = await axios.get(
    `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${creds}` } }
  )
  return data.access_token
}

function getTimestamp() {
  const now = new Date()
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ].join('')
}

function getPassword(timestamp) {
  const raw = `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  return Buffer.from(raw).toString('base64')
}

// ── POST /api/mpesa/stk-push ─────────────────────────────
// Body: { phone, amount, serviceLabel, accountRef }
router.post('/stk-push', async (req, res) => {
  const { phone, amount, serviceLabel = 'DealKe Service', accountRef = 'DealKe' } = req.body

  if (!phone || !amount) {
    return res.status(400).json({ error: 'phone and amount are required' })
  }

  // Normalise phone: strip leading 0 or + and ensure 254XXXXXXXXX
  const normalised = phone
    .replace(/\s+/g, '')
    .replace(/^\+/, '')
    .replace(/^0/, '254')

  if (!/^2547\d{8}$/.test(normalised)) {
    return res.status(400).json({ error: 'Invalid Kenyan phone number' })
  }

  try {
    const token     = await getAccessToken()
    const timestamp = getTimestamp()
    const password  = getPassword(timestamp)

    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password:          password,
      Timestamp:         timestamp,
      TransactionType:   'CustomerPayBillOnline',
      Amount:            Math.ceil(Number(amount)),
      PartyA:            normalised,
      PartyB:            process.env.MPESA_SHORTCODE,
      PhoneNumber:       normalised,
      CallBackURL:       process.env.MPESA_CALLBACK_URL,
      AccountReference:  accountRef,
      TransactionDesc:   serviceLabel,
    }

    const { data } = await axios.post(
      `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return res.json({
      success:        true,
      checkoutRequestId: data.CheckoutRequestID,
      merchantRequestId: data.MerchantRequestID,
      message:        'STK push sent. Ask customer to enter M-Pesa PIN.',
    })
  } catch (err) {
    const detail = err.response?.data || err.message
    console.error('[mpesa stk-push error]', detail)
    return res.status(502).json({ error: 'M-Pesa request failed', detail })
  }
})

// ── POST /api/mpesa/callback ─────────────────────────────
// Safaricom posts payment result here
router.post('/callback', (req, res) => {
  const body = req.body?.Body?.stkCallback

  if (!body) {
    return res.status(400).json({ error: 'Invalid callback payload' })
  }

  const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = body

  if (ResultCode === 0) {
    // Payment successful
    const items = CallbackMetadata?.Item || []
    const get   = (name) => items.find((i) => i.Name === name)?.Value

    const paymentInfo = {
      checkoutRequestId: CheckoutRequestID,
      mpesaReceiptNumber: get('MpesaReceiptNumber'),
      amount:             get('Amount'),
      phone:              get('PhoneNumber'),
      transactionDate:    get('TransactionDate'),
    }

    console.log('[mpesa payment confirmed]', paymentInfo)
    // TODO: save to database, trigger email/WhatsApp notification

  } else {
    console.log('[mpesa payment failed]', ResultCode, ResultDesc, CheckoutRequestID)
  }

  // Always respond 200 to Safaricom
  return res.json({ ResultCode: 0, ResultDesc: 'Accepted' })
})

// ── POST /api/mpesa/query ────────────────────────────────
// Check the status of a pending STK push
router.post('/query', async (req, res) => {
  const { checkoutRequestId } = req.body
  if (!checkoutRequestId) {
    return res.status(400).json({ error: 'checkoutRequestId required' })
  }

  try {
    const token     = await getAccessToken()
    const timestamp = getTimestamp()
    const password  = getPassword(timestamp)

    const { data } = await axios.post(
      `${BASE_URL}/mpesa/stkpushquery/v1/query`,
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password:          password,
        Timestamp:         timestamp,
        CheckoutRequestID: checkoutRequestId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return res.json({
      resultCode: data.ResultCode,
      resultDesc: data.ResultDesc,
      paid:       data.ResultCode === '0',
    })
  } catch (err) {
    return res.status(502).json({ error: 'Query failed', detail: err.response?.data })
  }
})

module.exports = router
