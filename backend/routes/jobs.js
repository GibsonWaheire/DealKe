// backend/routes/jobs.js
// Proxies job searches to Careerjet so the whitelisted server IP is used.

const express = require('express')
const axios   = require('axios')
const router  = express.Router()

const API_KEY  = process.env.CAREERJET_API_KEY
const API_BASE = 'https://search.api.careerjet.net/v4/query'
const REFERER  = 'https://draftit.co.ke/jobs/'

const CONTRACT_TYPE = {
  corporate: 'p',
  casual:    't',
  freelance: 'c',
}

router.get('/', async (req, res) => {
  const { keywords = '', location = '', tab = 'all', page = '1' } = req.query

  // Forward the real user IP + user-agent to satisfy Careerjet's requirements
  const userIp    = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1'
  const userAgent = req.headers['user-agent'] || 'Mozilla/5.0'

  const params = {
    locale_code:   'en_KE',
    user_ip:       userIp,
    user_agent:    userAgent,
    page:          page,
    page_size:     '20',
    sort:          'date',
    fragment_size: '150',
  }

  if (keywords)                                  params.keywords      = keywords
  if (location && location !== 'All Locations')  params.location      = location
  if (tab !== 'all' && CONTRACT_TYPE[tab])       params.contract_type = CONTRACT_TYPE[tab]

  try {
    const response = await axios.get(API_BASE, {
      params,
      headers: { Referer: REFERER },
      auth: { username: API_KEY, password: '' },
      timeout: 8000,
    })

    res.json(response.data)
  } catch (err) {
    const status = err.response?.status || 502
    res.status(status).json({ error: 'Job search failed', detail: err.message })
  }
})

module.exports = router
