// src/pages/Services.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const parsePrice = (str) => parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0

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

  { name: 'Landing Page', price: 'KES 6,000', turnaround: '3–5 days', category: 'Websites' },
  { name: 'Simple Website', price: 'KES 22,000', turnaround: '5–7 days', category: 'Websites' },
  { name: 'Business Website', price: 'KES 18,000', turnaround: '7–10 days', category: 'Websites', note: 'Popular' },
  { name: 'E-commerce Website', price: 'KES 80,000', turnaround: '14–21 days', category: 'Websites' },

  // Social Media & Design
  { name: 'Facebook Business Page Setup', price: 'KES 800', turnaround: 'Same day', category: 'Social & Design' },
  { name: 'Instagram Business Setup', price: 'KES 800', turnaround: 'Same day', category: 'Social & Design' },
  { name: 'TikTok Business Account Setup', price: 'KES 800', turnaround: 'Same day', category: 'Social & Design' },
  { name: 'WhatsApp Business Setup', price: 'KES 500', turnaround: 'Same day', category: 'Social & Design' },
  { name: 'Google Business Profile Setup', price: 'KES 1,500', turnaround: '1 business day', category: 'Social & Design' },
  { name: 'Social Media Profile Optimization', price: 'KES 1,500', turnaround: '1 business day', category: 'Social & Design' },
  { name: 'Monthly Social Media Management', price: 'KES 5,000/mo', turnaround: 'Ongoing', category: 'Social & Design', note: 'Package' },
  { name: 'Logo Design', price: 'KES 2,500', turnaround: '2 business days', category: 'Social & Design' },
  { name: 'Business Card Design', price: 'KES 1,500', turnaround: '1 business day', category: 'Social & Design' },
  { name: 'Flyer / Poster Design', price: 'KES 1,500', turnaround: '1 business day', category: 'Social & Design' },
  { name: 'Banner / Signage Design', price: 'KES 2,000', turnaround: '1 business day', category: 'Social & Design' },
  { name: 'Company Profile Design', price: 'KES 3,000', turnaround: '2 business days', category: 'Social & Design' },
  { name: 'Email Signature Design', price: 'KES 800', turnaround: 'Same day', category: 'Social & Design' },
  { name: 'T-Shirt / Uniform Print Design', price: 'KES 1,500', turnaround: '1 business day', category: 'Social & Design' },

  // Cyber services
  { name: 'CV / Resume Writing', price: 'KES 500', turnaround: 'Same day', category: 'Cyber', note: 'Popular' },
  { name: 'Cover Letter Writing', price: 'KES 300', turnaround: 'Same day', category: 'Cyber' },
  { name: 'Email Account Setup (Gmail/Yahoo)', price: 'KES 200', turnaround: 'Same day', category: 'Cyber' },
  { name: 'Online Form Filling', price: 'KES 200', turnaround: 'Same day', category: 'Cyber' },
  { name: 'Data Entry (per hour)', price: 'KES 500', turnaround: 'Agreed', category: 'Cyber' },
  { name: 'PDF Conversion / Merging', price: 'KES 100', turnaround: 'Same day', category: 'Cyber' },
  { name: 'MS Word / Excel / PowerPoint Help', price: 'KES 300', turnaround: 'Same day', category: 'Cyber' },
  { name: 'Printing B&W (per page)', price: 'KES 10', turnaround: 'Same day', category: 'Cyber' },
  { name: 'Printing Color (per page)', price: 'KES 30', turnaround: 'Same day', category: 'Cyber' },
  { name: 'Scanning (per page)', price: 'KES 20', turnaround: 'Same day', category: 'Cyber' },
  { name: 'Lamination A4', price: 'KES 50', turnaround: 'Same day', category: 'Cyber' },
  { name: 'Passport Photo Print (2 copies)', price: 'KES 150', turnaround: 'Same day', category: 'Cyber' },
  { name: 'Photo Editing', price: 'KES 300', turnaround: 'Same day', category: 'Cyber' },
  { name: 'Internet Research (per hour)', price: 'KES 100', turnaround: 'Same day', category: 'Cyber' },
  { name: 'File Recovery Assistance', price: 'KES 500', turnaround: 'Same day', category: 'Cyber' },

  // IT & Networking
  { name: 'Home Wi-Fi Setup & Configuration', price: 'KES 2,000', turnaround: 'Same day', category: 'IT & Networking', note: 'Popular' },
  { name: 'Wi-Fi Repeater / Extender Setup', price: 'KES 1,500', turnaround: 'Same day', category: 'IT & Networking' },
  { name: 'Router Configuration', price: 'KES 1,000', turnaround: 'Same day', category: 'IT & Networking' },
  { name: 'Office Network Setup (up to 10 devices)', price: 'KES 8,000', turnaround: '1 business day', category: 'IT & Networking' },
  { name: 'Network Cabling (structured)', price: 'KES 5,000+', turnaround: 'Quoted', category: 'IT & Networking' },
  { name: 'TV Wall Mount Installation', price: 'KES 1,500', turnaround: 'Same day', category: 'IT & Networking' },
  { name: 'DSTV / GoTV Installation', price: 'KES 2,000', turnaround: 'Same day', category: 'IT & Networking' },
  { name: 'CCTV Installation (per camera)', price: 'KES 3,500', turnaround: '1 business day', category: 'IT & Networking' },
  { name: 'Projector / Screen Installation', price: 'KES 2,000', turnaround: 'Same day', category: 'IT & Networking' },
  { name: 'Printer / Scanner Network Setup', price: 'KES 1,000', turnaround: 'Same day', category: 'IT & Networking' },
  { name: 'Computer Repair & Service', price: 'from KES 1,500', turnaround: 'Same day', category: 'IT & Networking' },
  { name: 'Virus / Malware Removal', price: 'KES 1,500', turnaround: 'Same day', category: 'IT & Networking' },
  { name: 'Software Installation (per device)', price: 'KES 500', turnaround: 'Same day', category: 'IT & Networking' },

  // POS & ERP (Odoo)
  { name: 'POS System Setup (retail shop)', price: 'KES 5,000', turnaround: '1 business day', category: 'POS & ERP', note: 'Popular' },
  { name: 'POS System Setup (restaurant/hotel)', price: 'KES 8,000', turnaround: '1–2 business days', category: 'POS & ERP' },
  { name: 'POS System Setup (pharmacy)', price: 'KES 8,000', turnaround: '1–2 business days', category: 'POS & ERP' },
  { name: 'POS System Setup (supermarket)', price: 'KES 6,000', turnaround: '2–3 business days', category: 'POS & ERP' },
  { name: 'Receipt Printer Setup & Test', price: 'KES 1,500', turnaround: 'Same day', category: 'POS & ERP' },
  { name: 'Barcode Scanner Setup', price: 'KES 1,000', turnaround: 'Same day', category: 'POS & ERP' },
  { name: 'Staff POS Training (per session)', price: 'KES 3,000', turnaround: '1 business day', category: 'POS & ERP' },
  { name: 'Odoo ERP Demo & Setup', price: 'KES 5,000', turnaround: '2 business days', category: 'POS & ERP' },
  { name: 'Odoo CRM Module', price: 'KES 15,000', turnaround: '3–5 business days', category: 'POS & ERP' },
  { name: 'Odoo Accounting Module', price: 'KES 20,000', turnaround: '3–5 business days', category: 'POS & ERP' },
  { name: 'Odoo Inventory Module', price: 'KES 15,000', turnaround: '3–5 business days', category: 'POS & ERP' },
  { name: 'Odoo Point of Sale Module', price: 'KES 6,000', turnaround: '2–3 business days', category: 'POS & ERP' },
  { name: 'Odoo Full ERP (all modules)', price: 'from KES 50,000', turnaround: 'Quoted', category: 'POS & ERP', note: 'Enterprise' },
  { name: 'Odoo Staff Training', price: 'KES 5,000/day', turnaround: 'Agreed', category: 'POS & ERP' },
]

const headerImages = [
  { src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80', alt: 'Documents and pen' },
  { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80', alt: 'Smartphone on desk' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80', alt: 'Modern office' },
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
  { value: 'Social & Design', label: 'Social & Design' },
  { value: 'Cyber', label: 'Cyber Services' },
  { value: 'IT & Networking', label: 'IT & Networking' },
  { value: 'POS & ERP', label: 'POS & ERP' },
]

export default function Services() {
  const navigate = useNavigate()
  const [active, setActive] = useState('KRA')
  const filtered = services.filter((s) => s.category === active)

  return (
    <div className="bg-white">
      <PageHeader
        label="Services"
        title="KRA, NTSA, contracts, design, and more."
        subtitle="Most of these take less than a day. You don't need to visit any office."
        images={headerImages}
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
                <button
                  onClick={() => navigate('/order', { state: { serviceName: svc.name, price: parsePrice(svc.price), currency: 'KES', category: svc.category } })}
                  className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  Order →
                </button>
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
