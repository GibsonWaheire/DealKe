import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { routes } from '../router/index'

const navLinks = routes.filter(r => r.path !== '/contact')

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-emerald-400 text-sm font-medium transition-colors'
      : 'text-zinc-300 hover:text-white text-sm transition-colors'

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-zinc-900/95 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight shrink-0">
          <span className="text-white">Deal</span>
          <span className="text-emerald-400">Ke</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={linkClass}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            asChild
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
          >
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>

        {/* Hamburger */}
        <button
          className="flex md:hidden text-zinc-300 hover:text-white p-2 -mr-2"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-zinc-800 px-4 pt-3 pb-5 flex flex-col gap-4">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Button
            asChild
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm w-full"
          >
            <Link to="/contact" onClick={() => setOpen(false)}>Get a Quote</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
