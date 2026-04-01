// src/components/Footer.jsx
import { Link } from 'react-router-dom'

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const quickLinks = [
  { label: 'Home',     to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Packages', to: '/packages' },
  { label: 'Shop',     to: '/shop' },
  { label: 'Blog',     to: '/blog' },
  { label: 'About',    to: '/about' },
  { label: 'Contact',  to: '/contact' },
]

const policyLinks = [
  { label: 'Privacy Notice',    to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Refund Policy',     to: '/refund' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500">
                <span className="text-white font-bold text-sm tracking-tight">DI</span>
              </span>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">Draft</span><span className="text-emerald-400">-It</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm mt-3 max-w-xs leading-relaxed">
              Websites, digital services, templates and tools for Kenyan businesses.
              Built and run from Nairobi — every project done personally.
            </p>
            <Link
              to="/pay"
              className="inline-flex items-center gap-2 mt-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Pay for a service →
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Pages</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} onClick={scrollTop} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2.5 text-slate-400 text-sm">
              <li>+254 726 899 113</li>
              <li>iknus.xmc@gmail.com</li>
              <li>Nairobi, Kenya</li>
              <li className="text-slate-500 text-xs pt-1">Mon–Sat · 8am–8pm</li>
            </ul>
            <h4 className="text-white font-semibold mt-6 mb-3 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              {policyLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} onClick={scrollTop} className="text-slate-400 hover:text-white text-xs transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-500 text-sm">© 2026 Draft-It. All rights reserved.</p>
          <p className="text-slate-500 text-sm">Made in Kenya 🇰🇪</p>
        </div>
      </div>
    </footer>
  )
}
