// src/api/careerjet.js
// Careerjet job search — Kenya (en_KE)

const API_KEY  = import.meta.env.VITE_CAREERJET_API_KEY
const API_BASE = 'https://search.api.careerjet.net/v4/query'
const REFERER  = 'https://draftit.co.ke/jobs/'

// Cache user IP so we only fetch it once per session
let cachedIp = null

async function getUserIp() {
  if (cachedIp) return cachedIp
  try {
    const res = await fetch('https://api.ipify.org?format=json', {
      signal: AbortSignal.timeout(3000),
    })
    cachedIp = (await res.json()).ip
  } catch {
    cachedIp = '41.90.64.1' // Safaricom Kenya fallback
  }
  return cachedIp
}

// Map our tab values to Careerjet contract_type codes
const CONTRACT_TYPE = {
  corporate: 'p', // permanent
  casual:    't', // temporary
  freelance: 'c', // contract
}

function formatSalary(job) {
  if (job.salary_min && job.salary_max) {
    const cur    = job.salary_currency_code || 'KES'
    const min    = Math.round(job.salary_min).toLocaleString()
    const max    = Math.round(job.salary_max).toLocaleString()
    const period = { Y: '/yr', M: '/mo', W: '/wk', D: '/day', H: '/hr' }[job.salary_type] ?? ''
    return `${cur} ${min} – ${max}${period}`
  }
  return job.salary || 'Competitive'
}

function formatPosted(dateStr) {
  if (!dateStr) return 'Recently'
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 7)  return `${days} days ago`
  const weeks = Math.floor(days / 7)
  return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
}

/**
 * Search Kenyan jobs on Careerjet.
 *
 * @param {object} opts
 * @param {string}  opts.keywords  - free-text search
 * @param {string}  opts.location  - city or 'All Locations'
 * @param {string}  opts.tab       - 'all' | 'corporate' | 'casual' | 'freelance'
 * @param {number}  opts.page      - 1-indexed page number
 * @returns {{ jobs, hits, pages }}
 */
export async function searchCareerjetJobs({ keywords = '', location = '', tab = 'all', page = 1 } = {}) {
  const userIp = await getUserIp()

  const params = new URLSearchParams({
    locale_code:   'en_KE',
    user_ip:       userIp,
    user_agent:    navigator.userAgent,
    page:          String(page),
    page_size:     '20',
    sort:          'date',
    fragment_size: '150',
  })

  if (keywords)                                    params.set('keywords',      keywords)
  if (location && location !== 'All Locations')    params.set('location',      location)
  if (tab !== 'all' && CONTRACT_TYPE[tab])         params.set('contract_type', CONTRACT_TYPE[tab])

  const headers = new Headers({
    Authorization: `Basic ${btoa(`${API_KEY}:`)}`,
    Referer:       REFERER,
  })

  const res = await fetch(`${API_BASE}?${params}`, { headers })
  if (!res.ok) throw new Error(`Careerjet API ${res.status}`)

  const data = await res.json()
  if (data.type !== 'JOBS') return { jobs: [], hits: 0, pages: 0 }

  const jobs = (data.jobs ?? []).map((job, i) => ({
    id:       `cj-p${page}-${i}`,
    title:    job.title,
    company:  job.company || 'Company',
    location: job.locations || 'Kenya',
    type:     tab === 'all' ? 'corporate' : tab,
    sector:   '',
    salary:   formatSalary(job),
    posted:   formatPosted(job.date),
    desc:     job.description,
    redirect: job.url,
    site:     job.site,
  }))

  return { jobs, hits: data.hits ?? 0, pages: data.pages ?? 1 }
}
