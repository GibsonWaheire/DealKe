// src/components/Footer.jsx
import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home',     to: '/' },
  { label: 'Packages', to: '/packages' },
  { label: 'Services', to: '/services' },
  { label: 'About',    to: '/about' },
  { label: 'Contact',  to: '/contact' },
]

const policyLinks = [
  { label: 'Privacy Policy',   to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Refund Policy',    to: '/refund' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="text-xl font-bold tracking-tight">
              <span className="text-white">Deal</span><span className="text-emerald-400">Ke</span>
            </Link>
            <p className="text-slate-400 text-sm mt-3 max-w-xs leading-relaxed">
              Websites and digital services for Kenyan businesses.
              Built and run from Nairobi — every project done personally.
            </p>
            <a
              href="https://wa.me/254726899113"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Pages</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-400 hover:text-white text-sm transition-colors">
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
              <li>hello@dealflow.co.ke</li>
              <li>Nairobi, Kenya</li>
              <li className="text-slate-500 text-xs pt-1">Mon–Sat · 8am–8pm</li>
            </ul>
            <h4 className="text-white font-semibold mt-6 mb-3 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              {policyLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-400 hover:text-white text-xs transition-colors">
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
          <p className="text-slate-500 text-sm">© 2026 DealFlow. All rights reserved.</p>
          <p className="text-slate-500 text-sm">Made in Kenya 🇰🇪</p>
        </div>
      </div>
    </footer>
  )
}
