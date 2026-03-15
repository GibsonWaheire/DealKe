import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-white font-medium text-sm transition-colors'
      : 'text-zinc-400 hover:text-white text-sm transition-colors'

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight shrink-0 text-white">
          DealKe<span className="text-white">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { path: '/', label: 'Home' },
            { path: '/services', label: 'Services' },
          ].map(({ path, label }) => (
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

        <div className="hidden md:block">
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg"
          >
            WhatsApp Us
          </a>
        </div>

        <button
          className="flex md:hidden text-zinc-400 hover:text-white p-2 -mr-2"
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

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-zinc-950 border-t border-zinc-800 px-4 pt-3 pb-5 flex flex-col gap-4">
          {[
            { path: '/', label: 'Home' },
            { path: '/services', label: 'Services' },
          ].map(({ path, label }) => (
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
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg w-full text-center"
            onClick={() => setOpen(false)}
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </nav>
  )
}
