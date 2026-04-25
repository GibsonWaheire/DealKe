// src/pages/Jobs.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import JobApplyModal from '../components/JobApplyModal'
import { searchCareerjetJobs } from '../api/careerjet'

// ─── Static domestic jobs (redirect to dedicated platform) ───────────────────

const DOMESTIC_JOBS = [
  { id: 'd1', title: 'Nanny / Babysitter',    company: 'Private Family',    location: 'Nairobi',        type: 'domestic', sector: 'Childcare', salary: 'KES 12,000 – 20,000/mo', posted: 'New', redirect: 'https://domestic-connect.co.ke' },
  { id: 'd2', title: 'House Manager & Cook',  company: 'Private Household', location: 'Karen, Nairobi', type: 'domestic', sector: 'Domestic',  salary: 'KES 15,000 – 25,000/mo', posted: 'New', redirect: 'https://domestic-connect.co.ke' },
  { id: 'd3', title: 'Housekeeper',           company: 'Private Family',    location: 'Westlands',      type: 'domestic', sector: 'Domestic',  salary: 'KES 10,000 – 18,000/mo', posted: 'New', redirect: 'https://domestic-connect.co.ke' },
  { id: 'd4', title: 'Caregiver (Elderly)',   company: 'Private Client',    location: 'Runda, Nairobi', type: 'domestic', sector: 'Childcare', salary: 'KES 18,000 – 30,000/mo', posted: 'New', redirect: 'https://domestic-connect.co.ke' },
]

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPE_TABS = [
  { value: 'all',       label: 'All Jobs' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'casual',    label: 'Casual' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'domestic',  label: 'Domestic' },
]

const LOCATIONS = ['All Locations', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Remote']

const TYPE_BADGE = {
  corporate: 'bg-blue-50 text-blue-700 border-blue-100',
  casual:    'bg-amber-50 text-amber-700 border-amber-100',
  freelance: 'bg-purple-50 text-purple-700 border-purple-100',
  domestic:  'bg-rose-50 text-rose-700 border-rose-100',
}

const TYPE_LABEL = {
  corporate: 'Corporate',
  casual:    'Casual',
  freelance: 'Freelance',
  domestic:  'Domestic',
}

const QUICK_CATS = [
  { label: 'Corporate & Office', value: 'corporate' },
  { label: 'Casual & Retail',    value: 'casual' },
  { label: 'Freelance & Remote', value: 'freelance' },
  { label: 'Domestic Help',      value: 'domestic' },
]

// ─── JobCard ──────────────────────────────────────────────────────────────────

export function JobCard({ job, onApply }) {
  const handleApply = (e) => {
    e.stopPropagation()
    if (job.redirect) {
      window.open(job.redirect, '_blank', 'noopener,noreferrer')
      return
    }
    onApply(job)
  }

  const handleRowClick = () => {
    if (job.redirect) window.open(job.redirect, '_blank', 'noopener,noreferrer')
    else onApply(job)
  }

  return (
    <div
      className="group flex items-center gap-4 px-5 py-4 border-l-2 border-transparent hover:border-emerald-400 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
      onClick={handleRowClick}
    >
      {/* Company avatar */}
      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-50 flex items-center justify-center text-slate-500 group-hover:text-emerald-600 font-bold text-sm shrink-0 uppercase transition-colors duration-200">
        {job.company[0]}
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-slate-900 font-semibold text-sm group-hover:text-emerald-700 transition-colors duration-200">
            {job.title}
          </h3>
          {job.featured && (
            <span className="bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
        <p className="text-slate-400 text-xs mt-0.5">
          {job.company} · {job.location}
          {job.site && <span className="text-slate-300"> · {job.site}</span>}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TYPE_BADGE[job.type]}`}>
            {TYPE_LABEL[job.type]}
          </span>
          {job.sector && (
            <span className="text-xs px-2 py-0.5 rounded-full border border-gray-100 bg-slate-50 text-slate-500">
              {job.sector}
            </span>
          )}
        </div>
      </div>

      {/* Right: salary + posted */}
      <div className="shrink-0 text-right hidden sm:block">
        <p className="text-slate-900 font-bold text-sm">{job.salary}</p>
        <p className="text-slate-400 text-xs mt-0.5">{job.posted}</p>
      </div>

      {/* Action */}
      <button
        onClick={handleApply}
        className="shrink-0 bg-slate-900 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-200"
      >
        {job.redirect ? 'View →' : 'Apply →'}
      </button>
    </div>
  )
}

// ─── DomesticBanner ───────────────────────────────────────────────────────────

export function DomesticBanner() {
  return (
    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="text-3xl">🏠</div>
      <div className="flex-1">
        <h3 className="text-slate-900 font-bold text-sm mb-1">Looking for domestic workers?</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Nannies, housekeepers, caregivers, and cooks — verified profiles on our dedicated platform.
        </p>
      </div>
      <a
        href="https://domestic-connect.co.ke"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
      >
        Visit Domestic Connect →
      </a>
    </div>
  )
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function JobSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-slate-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-slate-100 rounded w-2/5" />
        <div className="h-3 bg-slate-100 rounded w-1/3" />
        <div className="h-5 bg-slate-100 rounded-full w-20" />
      </div>
      <div className="hidden sm:block shrink-0 text-right space-y-2">
        <div className="h-3.5 bg-slate-100 rounded w-28" />
        <div className="h-3 bg-slate-100 rounded w-16 ml-auto" />
      </div>
      <div className="shrink-0 h-8 w-16 bg-slate-100 rounded-lg" />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Jobs() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch]       = useState('')
  const [location, setLocation]   = useState('All Locations')
  const [applyJob, setApplyJob]   = useState(null)
  const [page, setPage]           = useState(1)

  const [jobs, setJobs]     = useState([])
  const [hits, setHits]     = useState(0)
  const [pages, setPages]   = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState(null)

  const gridRef    = useRef(null)
  const searchRef  = useRef(null) // debounce timer

  const scrollToGrid = () =>
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const pickCategory = (val) => {
    setActiveTab(val)
    setPage(1)
    scrollToGrid()
  }

  // Fetch from API whenever tab / location / page change (immediate)
  const fetchJobs = useCallback(async (kw, loc, tab, pg) => {
    if (tab === 'domestic') return // domestic is static
    setLoading(true)
    setError(null)
    try {
      const result = await searchCareerjetJobs({ keywords: kw, location: loc, tab, page: pg })
      setJobs(result.jobs)
      setHits(result.hits)
      setPages(result.pages)
    } catch (err) {
      console.error(err)
      setError('Failed to load jobs. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  // On tab / location / page change → fetch immediately
  useEffect(() => {
    if (activeTab === 'domestic') return
    fetchJobs(search, location, activeTab, page)
  }, [activeTab, location, page]) // eslint-disable-line react-hooks/exhaustive-deps

  // On search input → debounce 400 ms then fetch from page 1
  useEffect(() => {
    if (activeTab === 'domestic') return
    clearTimeout(searchRef.current)
    searchRef.current = setTimeout(() => {
      setPage(1)
      fetchJobs(search, location, activeTab, 1)
    }, 400)
    return () => clearTimeout(searchRef.current)
  }, [search]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (val) => {
    setActiveTab(val)
    setPage(1)
  }

  const handleLocationChange = (val) => {
    setLocation(val)
    setPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setLocation('All Locations')
    setActiveTab('all')
    setPage(1)
  }

  const displayJobs = activeTab === 'domestic' ? DOMESTIC_JOBS : jobs

  return (
    <div className="bg-white">
      {applyJob && (
        <JobApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
      )}

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-20 md:py-28">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
          alt="People working in an office"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/50" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
            Find Work.<br />
            <span className="text-emerald-400">Any kind.</span>{' '}
            <span className="text-white/35">Anywhere.</span>
          </h1>
          <p className="text-white/55 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
            Corporate offices, casual shifts, freelance gigs, and domestic roles —
            all in one place for Kenyans.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-1.5 flex flex-col sm:flex-row gap-1.5 max-w-2xl mb-6 shadow-2xl">
            <div className="flex items-center gap-2 flex-1 px-3">
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Job title, keyword, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && scrollToGrid()}
                className="flex-1 py-2.5 text-slate-800 text-sm bg-transparent outline-none placeholder-slate-400"
              />
            </div>
            <div className="hidden sm:block w-px bg-gray-100 my-1.5" />
            <select
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="sm:w-40 px-3 py-2.5 text-slate-700 text-sm bg-slate-50 rounded-xl outline-none"
            >
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
            <button
              onClick={scrollToGrid}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              Find Jobs →
            </button>
          </div>

          {/* Quick category pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {QUICK_CATS.map((cat) => (
              <button
                key={cat.value}
                onClick={() => pickCategory(cat.value)}
                className="bg-white/10 hover:bg-white/18 border border-white/15 text-white text-sm px-4 py-2 rounded-xl transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8">
            {[
              { num: '10,000+', label: 'Live jobs' },
              { num: '4',       label: 'Job categories' },
              { num: 'Kenya',   label: 'Focused' },
              { num: 'Free',    label: 'To apply' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-white font-bold text-xl leading-tight">{s.num}</p>
                <p className="text-white/45 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section ref={gridRef} className="py-10 bg-slate-50 border-t border-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {activeTab === 'domestic' && <DomesticBanner />}

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {TYPE_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
                  activeTab === tab.value
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-gray-200 hover:border-slate-400 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Location filter */}
          <div className="flex flex-wrap gap-3 mb-5">
            <select
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="text-sm px-3 py-2 border border-gray-200 rounded-xl text-slate-700 bg-white outline-none"
            >
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
            {(location !== 'All Locations' || search || activeTab !== 'all') && (
              <button
                onClick={clearFilters}
                className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Result meta */}
          {activeTab !== 'domestic' && !loading && !error && (
            <p className="text-slate-400 text-xs mb-4">
              {hits > 0 ? `${hits.toLocaleString()} jobs found` : 'No jobs found'}
              {pages > 1 && ` · page ${page} of ${pages}`}
            </p>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-sm">{error}</p>
              <button
                onClick={() => fetchJobs(search, location, activeTab, page)}
                className="mt-3 text-emerald-600 text-sm font-medium underline underline-offset-2"
              >
                Retry
              </button>
            </div>
          )}

          {/* Job list */}
          {!error && (
            <>
              {loading ? (
                <div className="flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white">
                  {Array.from({ length: 6 }).map((_, i) => <JobSkeleton key={i} />)}
                </div>
              ) : displayJobs.length > 0 ? (
                <div className="flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white">
                  {displayJobs.map((job) => (
                    <JobCard key={job.id} job={job} onApply={setApplyJob} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-slate-400 text-sm">No jobs match your current filters.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-3 text-emerald-600 text-sm font-medium underline underline-offset-2"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {!loading && activeTab !== 'domestic' && pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => { setPage(p => p - 1); scrollToGrid() }}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm rounded-xl border border-gray-200 bg-white text-slate-600 hover:border-slate-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Prev
                  </button>
                  <span className="text-sm text-slate-500">Page {page} of {pages}</span>
                  <button
                    onClick={() => { setPage(p => p + 1); scrollToGrid() }}
                    disabled={page >= pages}
                    className="px-4 py-2 text-sm rounded-xl border border-gray-200 bg-white text-slate-600 hover:border-slate-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Domestic CTA strip ────────────────────────────────────────────── */}
      <section className="bg-rose-50 border-y border-rose-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <p className="text-rose-500 text-xs font-semibold uppercase tracking-widest mb-1">Domestic Workers</p>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Need a nanny, cook, or housekeeper?</h2>
            <p className="text-slate-500 text-sm max-w-md">
              Domestic Connect is our dedicated platform for verified domestic workers across Kenya.
            </p>
          </div>
          <a
            href="https://domestic-connect.co.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-7 py-3 rounded-xl transition-colors text-sm"
          >
            Visit domestic-connect.co.ke →
          </a>
        </div>
      </section>

      {/* ── Employer CTA ──────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-14 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">For Employers</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Hiring? Post a job for free.
          </h2>
          <p className="text-white/55 text-sm mb-7 leading-relaxed">
            Reach thousands of Kenyan job seekers across all sectors. Corporate, casual, freelance,
            and domestic vacancies welcome.
          </p>
          <a
            href="mailto:help@draftit.co.ke?subject=Job Posting Request&body=Hi, I'd like to post a job vacancy. Here are the details:"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Post a Job — Email Us →
          </a>
        </div>
      </section>
    </div>
  )
}
