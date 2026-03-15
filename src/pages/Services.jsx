// src/pages/Services.jsx
import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const WaIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

const services = [
  { name: 'New KRA PIN Registration', price: 'KES 500', turnaround: 'Same day', category: 'KRA', note: 'Most requested' },
  { name: 'Lost KRA PIN Retrieval', price: 'KES 300', turnaround: 'Same day', category: 'KRA' },
  { name: 'Change KRA Email Address', price: 'KES 300', turnaround: 'Same day', category: 'KRA' },
  { name: 'File KRA Returns', price: 'KES 400', turnaround: 'Same day', category: 'KRA' },
  { name: 'eTIMS Registration', price: 'KES 600', turnaround: '1 business day', category: 'KRA' },
  { name: 'eTIMS Invoice Generation', price: 'KES 200', turnaround: 'Same day', category: 'KRA' },
  { name: 'Tax Compliance Certificate', price: 'KES 500', turnaround: '1 business day', category: 'KRA' },

  { name: 'Vehicle Transfer / Force Transfer', price: 'KES 1,500', turnaround: '2 business days', category: 'NTSA' },
  { name: 'New Number Plates / Inspection', price: 'KES 500', turnaround: '1 business day', category: 'NTSA' },
  { name: 'Driving License Renewal', price: 'KES 400', turnaround: '1 business day', category: 'NTSA' },
  { name: 'Apply Smart DL', price: 'KES 400', turnaround: '1 business day', category: 'NTSA' },
  { name: 'Apply PDL / Interim License', price: 'KES 400', turnaround: '1 business day', category: 'NTSA' },
  { name: 'Test Booking', price: 'KES 300', turnaround: 'Same day', category: 'NTSA' },
  { name: 'PSV License', price: 'KES 800', turnaround: '2 business days', category: 'NTSA' },
  { name: 'Road Service License', price: 'KES 800', turnaround: '2 business days', category: 'NTSA' },

  { name: 'eCitizen Account Creation', price: 'KES 300', turnaround: 'Same day', category: 'eCitizen' },
  { name: 'Change eCitizen Phone Number', price: 'KES 300', turnaround: 'Same day', category: 'eCitizen' },
  { name: 'Good Conduct / PCC Application', price: 'KES 500', turnaround: '1 business day', category: 'eCitizen' },
  { name: 'Passport Application / Renewal', price: 'KES 600', turnaround: '1 business day', category: 'eCitizen' },
  { name: 'NCPWD Registration', price: 'KES 400', turnaround: '1 business day', category: 'eCitizen' },
  { name: 'Church Registration', price: 'KES 800', turnaround: '2 business days', category: 'eCitizen' },
  { name: 'BRS Services', price: 'KES 500', turnaround: '1 business day', category: 'eCitizen' },

  { name: 'New NSSF Registration', price: 'KES 400', turnaround: 'Same day', category: 'NSSF & SHA' },
  { name: 'Lost NSSF Card', price: 'KES 300', turnaround: 'Same day', category: 'NSSF & SHA' },
  { name: 'New SHA Registration', price: 'KES 400', turnaround: 'Same day', category: 'NSSF & SHA' },
  { name: 'Change SHA Phone Number', price: 'KES 300', turnaround: 'Same day', category: 'NSSF & SHA' },
  { name: 'New SHIF Registration', price: 'KES 400', turnaround: 'Same day', category: 'NSSF & SHA' },
  { name: 'Lost SHIF Card', price: 'KES 300', turnaround: 'Same day', category: 'NSSF & SHA' },
  { name: 'Add SHA Dependants', price: 'KES 300', turnaround: 'Same day', category: 'NSSF & SHA' },
  { name: 'SHA Bill Appeal / Reduction', price: 'KES 500', turnaround: '1 business day', category: 'NSSF & SHA' },

  { name: 'New Teacher Registration', price: 'KES 600', turnaround: '2 business days', category: 'TSC' },
  { name: 'Wealth Declaration', price: 'KES 400', turnaround: 'Same day', category: 'TSC' },
  { name: 'Retrieve Old Appraisal', price: 'KES 300', turnaround: 'Same day', category: 'TSC' },
  { name: 'TSC Promotions Application', price: 'KES 400', turnaround: '1 business day', category: 'TSC' },
  { name: 'Apply for Sick Leave', price: 'KES 300', turnaround: 'Same day', category: 'TSC' },
  { name: 'TSC Recruitment Application', price: 'KES 400', turnaround: '1 business day', category: 'TSC' },

  { name: 'HELB Loan Application', price: 'KES 500', turnaround: '1 business day', category: 'HELB & HEF' },
  { name: 'HELB Clearance Certificate', price: 'KES 400', turnaround: '1 business day', category: 'HELB & HEF' },
  { name: 'HEF Services', price: 'KES 400', turnaround: '1 business day', category: 'HELB & HEF' },
  { name: 'HELB / HEF Email Change', price: 'KES 300', turnaround: 'Same day', category: 'HELB & HEF' },
  { name: 'KUCCPS Application', price: 'KES 400', turnaround: 'Same day', category: 'HELB & HEF' },
  { name: 'KUCCPS Placement Check', price: 'KES 200', turnaround: 'Same day', category: 'HELB & HEF' },
  { name: 'TVET Application', price: 'KES 400', turnaround: '1 business day', category: 'HELB & HEF' },

  { name: 'Business Name Registration', price: 'KES 1,500', turnaround: '2 business days', category: 'Business' },
  { name: 'Company Registration', price: 'KES 3,000', turnaround: '3 business days', category: 'Business' },
  { name: 'Business Name Search', price: 'KES 400', turnaround: 'Same day', category: 'Business' },
  { name: 'AGPO Approval Application', price: 'KES 1,000', turnaround: '2 business days', category: 'Business' },
  { name: 'CRB Clearance (Metropol / Transunion)', price: 'KES 600', turnaround: 'Same day', category: 'Business' },

  { name: 'Car Sale Agreement', price: 'KES 800', turnaround: 'Same day', category: 'Documents', note: 'Fast' },
  { name: 'Simple Business Contract', price: 'KES 1,000', turnaround: '1 business day', category: 'Documents' },
  { name: 'Affidavit / Statutory Declaration', price: 'KES 1,200', turnaround: '1 business day', category: 'Documents' },
  { name: 'Lost / Duplicate ID Application', price: 'KES 400', turnaround: '1 business day', category: 'Documents' },
  { name: 'New Birth Certificate', price: 'KES 400', turnaround: '1 business day', category: 'Documents' },
  { name: 'Change of Particulars (NRB)', price: 'KES 500', turnaround: '1 business day', category: 'Documents' },
  { name: 'Good Conduct Certificate', price: 'KES 500', turnaround: '1 business day', category: 'Documents' },
  { name: 'COVID-19 Certificate Download', price: 'KES 200', turnaround: 'Same day', category: 'Documents' },
  { name: 'Typesetting (per page)', price: 'KES 40', turnaround: 'Same day', category: 'Documents' },
  { name: 'Photoshop / Design Requests', price: 'KES 300', turnaround: 'Same day', category: 'Documents' },
  { name: 'Grade 10 Admission Letters', price: 'KES 200', turnaround: 'Same day', category: 'Documents' },
  { name: 'KJSEA Results Check', price: 'KES 30', turnaround: 'Same day', category: 'Documents' },
  { name: 'KJSEA Placement Check', price: 'KES 30', turnaround: 'Same day', category: 'Documents' },

  { name: 'Starter Website Package', price: 'KES 15,000', turnaround: '5–7 days', category: 'Websites' },
  { name: 'Business Website Package', price: 'KES 35,000', turnaround: '7–10 days', category: 'Websites' },
  { name: 'Premium Website Package', price: 'KES 65,000', turnaround: '10–14 days', category: 'Websites' },
]

const tabs = [
  { value: 'KRA', label: 'KRA' },
  { value: 'NTSA', label: 'NTSA' },
  { value: 'eCitizen', label: 'eCitizen' },
  { value: 'NSSF & SHA', label: 'NSSF & SHA' },
  { value: 'TSC', label: 'TSC' },
  { value: 'HELB & HEF', label: 'HELB & HEF' },
  { value: 'Business', label: 'Business' },
  { value: 'Documents', label: 'Documents' },
  { value: 'Websites', label: 'Websites' },
]

export default function Services() {
  const [active, setActive] = useState('KRA')
  const filtered = services.filter((s) => s.category === active)

  return (
    <div className="bg-white">
      <PageHeader
        label="Services"
        title="KRA, NTSA, contracts, and more — sorted fast."
        subtitle="Most of these take less than a day. You don't need to visit any office."
      />

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab strip */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((t) => (
              <button
                key={t.value}
                onClick={() => setActive(t.value)}
                className={`text-sm px-4 py-1.5 rounded-full border transition-colors font-medium ${
                  active === t.value
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-gray-200 hover:border-slate-400 hover:text-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Service count */}
          <p className="text-slate-400 text-xs mb-4">{filtered.length} services in this category</p>

          {/* List table */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-2.5 bg-slate-50 border-b border-gray-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Service</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide text-right">Price</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide text-right hidden sm:block">Turnaround</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide text-right">Order</span>
            </div>

            {/* Rows */}
            {filtered.map((svc, i) => (
              <div
                key={svc.name}
                className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3.5 items-center hover:bg-slate-50 transition-colors ${i > 0 ? 'border-t border-gray-100' : ''}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-slate-800 text-sm font-medium truncate">{svc.name}</span>
                  {svc.note && (
                    <span className="hidden sm:inline bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">
                      {svc.note}
                    </span>
                  )}
                </div>
                <span className="text-slate-900 font-bold text-sm text-right whitespace-nowrap">{svc.price}</span>
                <span className="text-slate-400 text-xs text-right whitespace-nowrap hidden sm:block">{svc.turnaround}</span>
                <a
                  href={`https://wa.me/254726899113?text=${encodeURIComponent(`Hi, I'd like to order ${svc.name}. Please confirm price and M-Pesa payment details.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  <WaIcon /> Order
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-50 border-t border-gray-100 py-10 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-600 text-sm">
            Don&apos;t see what you need? I handle more than what&apos;s listed here.
          </p>
          <a
            href="https://wa.me/254726899113"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white mt-4 px-6 py-2.5 rounded-xl font-medium transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
