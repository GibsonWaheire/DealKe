// src/components/Footer.jsx
import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Packages', to: '/packages' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Col 1 — Brand */}
          <div>
            <Link to="/" className="text-xl font-bold tracking-tight">
              <span className="text-white">Deal</span>
              <span className="text-emerald-400">Ke</span>
            </Link>
            <p className="text-zinc-400 text-sm mt-2 max-w-xs leading-relaxed">
              Affordable websites and digital services for Kenyan businesses.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-zinc-400 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Get in Touch</h4>
            <ul className="space-y-2">
              <li className="text-zinc-400 text-sm">📱 +254 700 000 000</li>
              <li className="text-zinc-400 text-sm">✉️ hello@dealke.co.ke</li>
              <li className="text-zinc-400 text-sm">📍 Nairobi, Kenya</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-zinc-500 text-sm">© 2025 DealKe. All rights reserved.</p>
          <p className="text-zinc-500 text-sm">Made in Kenya 🇰🇪</p>
        </div>
      </div>
    </footer>
  )
}
