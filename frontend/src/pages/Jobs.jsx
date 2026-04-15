// src/pages/Jobs.jsx
import { useState, useMemo, useRef } from 'react'
import JobApplyModal from '../components/JobApplyModal'

// ─── Mock data (replace with API calls later) ────────────────────────────────

const JOBS = [
  // Corporate
  { id: 1,  title: 'Software Developer',          company: 'TechHub Africa',      location: 'Nairobi',        type: 'corporate', sector: 'IT',             salary: 'KES 80,000 – 120,000/mo',   posted: '2 days ago',  featured: true },
  { id: 2,  title: 'Accountant',                  company: 'Deloitte Kenya',      location: 'Nairobi',        type: 'corporate', sector: 'Finance',         salary: 'KES 60,000 – 90,000/mo',    posted: '1 day ago' },
  { id: 3,  title: 'Sales Executive',             company: 'Safaricom PLC',       location: 'Mombasa',        type: 'corporate', sector: 'Sales',           salary: 'KES 40,000 + commission',   posted: '3 days ago' },
  { id: 4,  title: 'Primary School Teacher',      company: 'Brookhouse School',   location: 'Nairobi',        type: 'corporate', sector: 'Education',       salary: 'KES 35,000 – 55,000/mo',    posted: '5 days ago' },
  { id: 5,  title: 'ICU Nurse',                   company: 'Aga Khan Hospital',   location: 'Nairobi',        type: 'corporate', sector: 'Healthcare',      salary: 'KES 50,000 – 80,000/mo',    posted: '1 day ago',   featured: true },
  { id: 6,  title: 'HR Officer',                  company: 'KCB Bank',            location: 'Nairobi',        type: 'corporate', sector: 'Human Resources', salary: 'KES 55,000 – 75,000/mo',    posted: '4 days ago' },
  { id: 7,  title: 'Supply Chain Officer',        company: 'Unilever Kenya',      location: 'Nairobi',        type: 'corporate', sector: 'Logistics',       salary: 'KES 70,000 – 95,000/mo',    posted: '2 days ago' },
  { id: 8,  title: 'Customer Service Agent',      company: 'Equity Bank',         location: 'Kisumu',         type: 'corporate', sector: 'Finance',         salary: 'KES 30,000 – 45,000/mo',    posted: '6 days ago' },
  { id: 9,  title: 'Civil Engineer',              company: 'Kenya National Highways', location: 'Nairobi',    type: 'corporate', sector: 'Engineering',     salary: 'KES 90,000 – 130,000/mo',   posted: '3 days ago' },
  { id: 10, title: 'Marketing Manager',           company: 'Coca-Cola Kenya',     location: 'Nairobi',        type: 'corporate', sector: 'Marketing',       salary: 'KES 100,000 – 150,000/mo',  posted: '1 day ago',   featured: true },

  // Casual
  { id: 11, title: 'Shopkeeper / Shop Assistant', company: 'Naivas Supermarket',  location: 'Nairobi',        type: 'casual',    sector: 'Retail',          salary: 'KES 15,000 – 20,000/mo',    posted: '1 day ago' },
  { id: 12, title: 'Cashier',                     company: 'Carrefour Kenya',     location: 'Nakuru',         type: 'casual',    sector: 'Retail',          salary: 'KES 18,000/mo',             posted: '2 days ago' },
  { id: 13, title: 'Waiter / Waitress',           company: 'Java House',          location: 'Nairobi',        type: 'casual',    sector: 'Hospitality',     salary: 'KES 16,000 + tips/mo',      posted: '3 days ago' },
  { id: 14, title: 'Security Guard',              company: 'G4S Kenya',           location: 'Mombasa',        type: 'casual',    sector: 'Security',        salary: 'KES 18,000/mo',             posted: '1 day ago' },
  { id: 15, title: 'Delivery Rider (Motorbike)',  company: 'Sendy Kenya',         location: 'Nairobi',        type: 'casual',    sector: 'Transport',       salary: 'KES 500 – 800/day',         posted: '2 days ago' },
  { id: 16, title: 'Warehouse Picker & Packer',   company: 'Jumia Kenya',         location: 'Nairobi',        type: 'casual',    sector: 'Logistics',       salary: 'KES 16,000/mo',             posted: '4 days ago' },
  { id: 17, title: 'Petrol Station Attendant',    company: 'Shell Kenya',         location: 'Nakuru',         type: 'casual',    sector: 'Retail',          salary: 'KES 14,000/mo',             posted: '5 days ago' },

  // Freelance
  { id: 18, title: 'React / Node.js Developer',   company: 'Remote Client (EU)',  location: 'Remote',         type: 'freelance', sector: 'IT',             salary: '$15 – $30/hr',              posted: '1 day ago',   featured: true },
  { id: 19, title: 'Graphic Designer',            company: 'Creative Agency',     location: 'Remote',         type: 'freelance', sector: 'Design',          salary: 'KES 5,000 – 15,000/project', posted: '2 days ago' },
  { id: 20, title: 'SEO Content Writer',          company: 'Digital Agency',      location: 'Remote',         type: 'freelance', sector: 'Writing',         salary: 'KES 3,000 – 8,000/article', posted: '3 days ago' },
  { id: 21, title: 'Social Media Manager',        company: 'Various Clients',     location: 'Remote',         type: 'freelance', sector: 'Marketing',       salary: 'KES 20,000 – 40,000/mo',    posted: '4 days ago' },
  { id: 22, title: 'Virtual Assistant',           company: 'Remote Client (US)',  location: 'Remote',         type: 'freelance', sector: 'Admin',           salary: '$8 – $15/hr',               posted: '1 day ago' },
  { id: 23, title: 'Video Editor',                company: 'Content Creators Hub', location: 'Remote',        type: 'freelance', sector: 'Design',          salary: 'KES 8,000 – 25,000/project', posted: '5 days ago' },
  { id: 24, title: 'Mobile App Developer',        company: 'Startup (Remote)',    location: 'Remote',         type: 'freelance', sector: 'IT',             salary: '$20 – $40/hr',              posted: '2 days ago' },

  // Domestic → redirect to domestic-connect.co.ke
  { id: 25, title: 'Nanny / Babysitter',          company: 'Private Family',      location: 'Nairobi',        type: 'domestic',  sector: 'Childcare',       salary: 'KES 12,000 – 20,000/mo',    posted: '1 day ago',   redirect: 'https://domestic-connect.co.ke' },
  { id: 26, title: 'House Manager & Cook',        company: 'Private Household',   location: 'Karen, Nairobi', type: 'domestic',  sector: 'Domestic',        salary: 'KES 15,000 – 25,000/mo',    posted: '2 days ago',  redirect: 'https://domestic-connect.co.ke' },
  { id: 27, title: 'Housekeeper',                 company: 'Private Family',      location: 'Westlands',      type: 'domestic',  sector: 'Domestic',        salary: 'KES 10,000 – 18,000/mo',    posted: '3 days ago',  redirect: 'https://domestic-connect.co.ke' },
  { id: 28, title: 'Caregiver (Elderly)',         company: 'Private Client',      location: 'Runda, Nairobi', type: 'domestic',  sector: 'Childcare',       salary: 'KES 18,000 – 30,000/mo',    posted: '1 day ago',   redirect: 'https://domestic-connect.co.ke' },
]

const TYPE_TABS = [
  { value: 'all',       label: 'All Jobs' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'casual',    label: 'Casual' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'domestic',  label: 'Domestic' },
]

const SECTORS = [
  'All Sectors',
  'IT', 'Finance', 'Sales', 'Education', 'Healthcare', 'Human Resources',
  'Logistics', 'Engineering', 'Marketing', 'Retail', 'Hospitality',
  'Security', 'Transport', 'Design', 'Writing', 'Admin', 'Childcare', 'Domestic',
]

const LOCATIONS = ['All Locations', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Remote']

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

// ─── JobCard ─────────────────────────────────────────────────────────────────

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
    if (job.redirect) {
      window.open(job.redirect, '_blank', 'noopener,noreferrer')
    } else {
      onApply(job)
    }
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
        <p className="text-slate-400 text-xs mt-0.5">{job.company} · {job.location}</p>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TYPE_BADGE[job.type]}`}>
            {TYPE_LABEL[job.type]}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full border border-gray-100 bg-slate-50 text-slate-500">
            {job.sector}
          </span>
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

// ─── DomesticBanner ──────────────────────────────────────────────────────────

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

// ─── Quick category pills shown in hero ──────────────────────────────────────

const QUICK_CATS = [
  { label: 'Corporate & Office', value: 'corporate' },
  { label: 'Casual & Retail',    value: 'casual' },
  { label: 'Freelance & Remote', value: 'freelance' },
  { label: 'Domestic Help',      value: 'domestic' },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Jobs() {
  const [activeTab, setActiveTab]     = useState('all')
  const [search, setSearch]           = useState('')
  const [sector, setSector]           = useState('All Sectors')
  const [location, setLocation]       = useState('All Locations')
  const [applyJob, setApplyJob]       = useState(null)
  const gridRef                       = useRef(null)

  const scrollToGrid = () =>
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const pickCategory = (val) => {
    setActiveTab(val)
    scrollToGrid()
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return JOBS.filter((job) => {
      if (activeTab !== 'all' && job.type !== activeTab) return false
      if (sector !== 'All Sectors' && job.sector !== sector) return false
      if (location !== 'All Locations' && !job.location.includes(location)) return false
      if (q && !job.title.toLowerCase().includes(q) && !job.company.toLowerCase().includes(q)) return false
      return true
    })
  }, [activeTab, search, sector, location])

  const tabCount = (val) =>
    val === 'all' ? JOBS.length : JOBS.filter((j) => j.type === val).length

  return (
    <div className="bg-white">
      {applyJob && (
        <JobApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-20 md:py-28">
        {/* Background image — reduced opacity so text reads clearly */}
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
          alt="People working in an office"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        {/* Left-to-right gradient: solid on left, fades on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/50" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Headline */}
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
              onChange={(e) => setLocation(e.target.value)}
              className="sm:w-40 px-3 py-2.5 text-slate-700 text-sm bg-slate-50 rounded-xl outline-none"
            >
              {LOCATIONS.map((l) => (
                <option key={l}>{l}</option>
              ))}
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
              { num: '1,200+', label: 'Jobs listed' },
              { num: '340+',   label: 'Companies' },
              { num: '4',      label: 'Job categories' },
              { num: 'Free',   label: 'To apply' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-white font-bold text-xl leading-tight">{s.num}</p>
                <p className="text-white/45 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section ref={gridRef} className="py-10 bg-slate-50 border-t border-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Domestic banner — visible when domestic tab is active */}
          {activeTab === 'domestic' && <DomesticBanner />}

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {TYPE_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
                  activeTab === tab.value
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-gray-200 hover:border-slate-400 hover:text-slate-800'
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-xs ${activeTab === tab.value ? 'text-white/55' : 'text-slate-400'}`}>
                  {tabCount(tab.value)}
                </span>
              </button>
            ))}
          </div>

          {/* Sector + location filter row */}
          <div className="flex flex-wrap gap-3 mb-5">
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="text-sm px-3 py-2 border border-gray-200 rounded-xl text-slate-700 bg-white outline-none"
            >
              {SECTORS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-sm px-3 py-2 border border-gray-200 rounded-xl text-slate-700 bg-white outline-none"
            >
              {LOCATIONS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            {(sector !== 'All Sectors' || location !== 'All Locations' || search) && (
              <button
                onClick={() => { setSector('All Sectors'); setLocation('All Locations'); setSearch('') }}
                className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Result count */}
          <p className="text-slate-400 text-xs mb-4">
            {filtered.length} job{filtered.length !== 1 ? 's' : ''} found
          </p>

          {/* Job list */}
          {filtered.length > 0 ? (
            <div className="flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white">
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} onApply={setApplyJob} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400 text-sm">No jobs match your current filters.</p>
              <button
                onClick={() => { setActiveTab('all'); setSector('All Sectors'); setLocation('All Locations'); setSearch('') }}
                className="mt-3 text-emerald-600 text-sm font-medium underline underline-offset-2"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Domestic CTA strip ───────────────────────────────────────────── */}
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

      {/* ── Employer CTA ─────────────────────────────────────────────────── */}
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
