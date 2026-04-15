import { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/services',  label: 'Services', end: false },
  { path: '/packages',  label: 'Packages', end: false },
  { path: '/shop',      label: 'Shop',     end: false },
  { path: '/jobs',      label: 'Jobs',     end: false },
]

const homeDropdown = [
  { path: '/',        label: 'Home',    end: true },
  { path: '/about',   label: 'About',   end: false },
  { path: '/contact', label: 'Contact', end: false },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate    = useNavigate()
  const { pathname } = useLocation()

  const isHomeDrop = ['/', '/about', '/contact'].includes(pathname)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close dropdown on route change
  useEffect(() => { setDropdownOpen(false) }, [pathname])

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-emerald-600 font-semibold text-sm transition-colors'
      : 'text-slate-600 hover:text-slate-900 text-sm transition-colors'

  const handlePay = () => {
    setMobileOpen(false)
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

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">

          {/* Home dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              className={`flex items-center gap-1 text-sm transition-colors ${
                isHomeDrop ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50">
                {/* Arrow */}
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                {homeDropdown.map(({ path, label, end }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={end}
                    onClick={() => setDropdownOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition-colors ${
                        isActive
                          ? 'text-emerald-600 font-semibold bg-emerald-50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Regular links */}
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
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
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
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-gray-100 px-4 pt-3 pb-5 flex flex-col gap-1">

          {/* Home group */}
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-1 pt-1 pb-0.5">Home</p>
          {homeDropdown.map(({ path, label, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'text-emerald-600 font-semibold bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="border-t border-gray-100 my-1" />

          {/* Other links */}
          {navLinks.map(({ path, label, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'text-emerald-600 font-semibold bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="border-t border-gray-100 my-1" />

          {/* Pay button */}
          <button
            onClick={handlePay}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white shadow-md shadow-emerald-500/25 mt-1"
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
