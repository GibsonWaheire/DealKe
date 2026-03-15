import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { path: '/',          label: 'Home',     end: true },
  { path: '/packages',  label: 'Packages', end: false },
  { path: '/services',  label: 'Services', end: false },
  { path: '/about',     label: 'About',    end: false },
  { path: '/contact',   label: 'Contact',  end: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-emerald-600 font-semibold text-sm transition-colors'
      : 'text-slate-600 hover:text-slate-900 text-sm transition-colors'

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight shrink-0">
          <span className="text-slate-900">Deal</span><span className="text-emerald-500">Ke</span>
        </Link>

        {/* Desktop: links + CTA right */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(({ path, label, end }) => (
            <NavLink key={path} to={path} end={end} className={linkClass}>
              {label}
            </NavLink>
          ))}
          <a
            href="https://wa.me/254726899113"
            target="_blank"
            rel="noreferrer"
            className="ml-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            WhatsApp Us
          </a>
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
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-gray-100 px-4 pt-3 pb-5 flex flex-col gap-4">
          {navLinks.map(({ path, label, end }) => (
            <NavLink key={path} to={path} end={end} className={linkClass} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <a
            href="https://wa.me/254726899113"
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg text-center transition-colors"
            onClick={() => setOpen(false)}
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </nav>
  )
}
