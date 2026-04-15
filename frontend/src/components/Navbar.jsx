import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

const navLinks = [
  { path: '/',          label: 'Home',     end: true },
  { path: '/services',  label: 'Services', end: false },
  { path: '/packages',  label: 'Packages', end: false },
  { path: '/shop',      label: 'Shop',     end: false },
  { path: '/jobs',      label: 'Jobs',     end: false },
  { path: '/about',     label: 'About',    end: false },
  { path: '/contact',   label: 'Contact',  end: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-emerald-600 font-semibold text-sm transition-colors'
      : 'text-slate-600 hover:text-slate-900 text-sm transition-colors'

  const handlePay = () => {
    setOpen(false)
    navigate('/pay')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500">
            <span className="text-white font-bold text-sm tracking-tight">DI</span>
          </span>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-slate-900">Draft</span><span className="text-emerald-500">-It</span>
          </span>
        </Link>

        {/* Desktop: links + Pay CTA */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(({ path, label, end }) => (
            <NavLink key={path} to={path} end={end} className={linkClass}>
              {label}
            </NavLink>
          ))}

          {/* Pay button */}
          <button
            onClick={handlePay}
            className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white overflow-hidden group shadow-md shadow-emerald-500/25 transition-shadow hover:shadow-lg hover:shadow-emerald-500/35"
            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #0d9488 100%)' }}
          >
            {/* Shimmer overlay on hover */}
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200 rounded-xl" />
            <svg className="w-3.5 h-3.5 shrink-0 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <span className="relative z-10">Pay Now</span>
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="flex md:hidden text-slate-500 hover:text-slate-900 p-2 -mr-2"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-gray-100 px-4 pt-3 pb-5 flex flex-col gap-4">
          {navLinks.map(({ path, label, end }) => (
            <NavLink key={path} to={path} end={end} className={linkClass} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}

          {/* Pay button — mobile */}
          <button
            onClick={handlePay}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white shadow-md shadow-emerald-500/25"
            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #0d9488 100%)' }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Pay Now
          </button>
        </div>
      </div>
    </nav>
  )
}
