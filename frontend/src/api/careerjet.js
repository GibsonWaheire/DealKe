// src/api/careerjet.js
// Calls our backend proxy at /api/jobs — the backend holds the Careerjet key
// and uses the whitelisted server IP to make the actual API call.

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

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
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000)
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 7)  return `${days} days ago`
  const weeks = Math.floor(days / 7)
  return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
}

/**
 * Search Kenyan jobs via the backend proxy.
 *
 * @param {object} opts
 * @param {string}  opts.keywords
 * @param {string}  opts.location  - city or 'All Locations'
 * @param {string}  opts.tab       - 'all' | 'corporate' | 'casual' | 'freelance'
 * @param {number}  opts.page
 * @returns {{ jobs, hits, pages }}
 */
export async function searchCareerjetJobs({ keywords = '', location = '', tab = 'all', page = 1 } = {}) {
  const params = new URLSearchParams({ tab, page: String(page) })
  if (keywords) params.set('keywords', keywords)
  if (location && location !== 'All Locations') params.set('location', location)

  const res = await fetch(`${BACKEND}/api/jobs?${params}`)
  if (!res.ok) throw new Error(`Jobs API error: ${res.status}`)

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
