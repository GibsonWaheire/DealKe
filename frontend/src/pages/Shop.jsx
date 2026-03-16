// src/pages/Shop.jsx
import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const WA = '254726899113'
const waLink = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`

const headerImages = [
  { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80', alt: 'Shop' },
  { src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1600&q=80', alt: 'Digital products' },
]

const TYPE_BADGE = {
  digital:  { label: 'Digital',  cls: 'bg-blue-50 text-blue-700 border-blue-200' },
  physical: { label: 'Physical', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  software: { label: 'Software', cls: 'bg-violet-50 text-violet-700 border-violet-200' },
  service:  { label: 'Service',  cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
}

const shopCategories = [
  {
    id: 'print', label: 'Print & Design', icon: '🖨️',
    items: [
      { name: 'Business Cards Design (250 pcs)',    price: 1200, type: 'physical' },
      { name: 'A3 Poster / Banner Design',          price: 500,  type: 'digital'  },
      { name: 'A5 Flyer Design',                    price: 400,  type: 'digital'  },
      { name: 'ID Badge Design + Print',            price: 300,  type: 'physical' },
      { name: 'Certificate Template Design',        price: 500,  type: 'digital'  },
      { name: 'Company Letterhead Design',          price: 600,  type: 'digital'  },
      { name: 'Logo Design (Basic)',                price: 2500, type: 'digital'  },
      { name: 'Roll-up Banner (85×200cm)',          price: 3500, type: 'physical' },
      { name: 'T-Shirt Print Design',               price: 500,  type: 'digital'  },
      { name: 'Social Media Kit (5 templates)',     price: 800,  type: 'digital'  },
    ],
  },
  {
    id: 'digital', label: 'Digital Downloads', icon: '💾',
    items: [
      { name: 'Invoice Generator (Excel)',          price: 300,  type: 'digital'  },
      { name: 'Stock Management Sheet (Excel)',     price: 400,  type: 'digital'  },
      { name: 'Payroll Calculator (Excel)',         price: 600,  type: 'digital'  },
      { name: 'Business Plan Template (Word)',      price: 500,  type: 'digital'  },
      { name: 'HR Policy Document Pack',            price: 800,  type: 'digital'  },
      { name: 'Social Media Post Pack (30 days)',   price: 1000, type: 'digital'  },
      { name: 'eBook: Start a Business in Kenya',  price: 300,  type: 'digital'  },
      { name: 'Website HTML Template',             price: 500,  type: 'digital'  },
      { name: 'KRA & Tax Guide (PDF)',             price: 200,  type: 'digital'  },
      { name: 'Lease Agreement Pack (5 types)',    price: 400,  type: 'digital'  },
    ],
  },
  {
    id: 'software', label: 'POS & Software', icon: '💻',
    items: [
      { name: 'Simple POS Software (Retail)',       price: 5000,  type: 'software' },
      { name: 'Restaurant POS Software',            price: 6000,  type: 'software' },
      { name: 'Pharmacy POS Software',              price: 7000,  type: 'software' },
      { name: 'Supermarket POS Software',           price: 8000,  type: 'software' },
      { name: 'HRM Software (Small Business)',      price: 10000, type: 'software' },
      { name: 'Inventory Management Software',     price: 7000,  type: 'software' },
      { name: 'Fleet Management System',           price: 15000, type: 'software' },
      { name: 'School Management System',          price: 12000, type: 'software' },
      { name: 'Accounting Software Setup',         price: 8000,  type: 'service'  },
      { name: 'Odoo POS Setup & Training',         price: 8000,  type: 'service'  },
    ],
  },
  {
    id: 'hardware', label: 'Hardware & Devices', icon: '🖥️',
    items: [
      { name: 'Thermal Receipt Printer (58mm)',     price: 3500,  type: 'physical' },
      { name: 'Thermal Receipt Printer (80mm)',     price: 4500,  type: 'physical' },
      { name: 'Barcode Scanner (USB wired)',        price: 2500,  type: 'physical' },
      { name: 'Barcode Scanner (Wireless)',         price: 3800,  type: 'physical' },
      { name: 'Cash Drawer',                        price: 3000,  type: 'physical' },
      { name: 'Card Reader (Contactless NFC)',      price: 1800,  type: 'physical' },
      { name: 'Label Printer (Zebra-compatible)',  price: 6500,  type: 'physical' },
      { name: 'GPS Tracker (Vehicle)',             price: 4500,  type: 'physical' },
      { name: 'Fingerprint Time Attendance',       price: 8000,  type: 'physical' },
      { name: 'UPS Power Backup (650VA)',          price: 5500,  type: 'physical' },
      { name: 'Network Switch (8-port)',           price: 2500,  type: 'physical' },
      { name: 'IP Security Camera (2MP)',          price: 3000,  type: 'physical' },
      { name: 'CCTV 4-Channel NVR Kit',           price: 12000, type: 'physical' },
      { name: 'Biometric Fingerprint Padlock',     price: 2800,  type: 'physical' },
    ],
  },
  {
    id: 'dev', label: 'Developer & Designer Tools', icon: '🛠️',
    items: [
      { name: 'USB-C Hub (8-in-1)',                price: 2500, type: 'physical' },
      { name: 'External SSD (256GB)',              price: 4500, type: 'physical' },
      { name: 'Drawing Tablet (Basic)',            price: 8000, type: 'physical' },
      { name: 'Raspberry Pi 4 (4GB)',              price: 7000, type: 'physical' },
      { name: 'Arduino Starter Kit',              price: 3500, type: 'physical' },
      { name: 'Network Cable Crimping Kit',        price: 1200, type: 'physical' },
      { name: 'Soldering Iron Kit',               price: 1800, type: 'physical' },
      { name: 'Digital Multimeter',               price: 1500, type: 'physical' },
      { name: 'Wireless Mouse & Keyboard Set',    price: 1500, type: 'physical' },
      { name: 'Cable Management Kit',             price: 800,  type: 'physical' },
      { name: 'Monitor Stand (adjustable)',       price: 2200, type: 'physical' },
      { name: 'Portable Projector (mini)',        price: 12000, type: 'physical' },
    ],
  },
  {
    id: 'office', label: 'Office Equipment', icon: '🏢',
    items: [
      { name: 'Laminator (A4)',                    price: 3500, type: 'physical' },
      { name: 'Binding Machine (Comb, A4)',        price: 4500, type: 'physical' },
      { name: 'Paper Shredder (Strip-cut)',        price: 4500, type: 'physical' },
      { name: 'Stamp Maker (custom)',              price: 1200, type: 'physical' },
      { name: 'Whiteboard (120×90cm)',             price: 3000, type: 'physical' },
      { name: 'Notice Board (cork)',               price: 1800, type: 'physical' },
      { name: 'Printer Ink (HP/Epson/Canon)',      price: 1200, type: 'physical' },
      { name: 'A4 Paper Ream (500 sheets)',        price: 600,  type: 'physical' },
      { name: 'ID Card Printer + Ribbon',          price: 18000, type: 'physical' },
      { name: 'Electric Stapler',                  price: 2500, type: 'physical' },
    ],
  },
  {
    id: 'services', label: 'Home & Office Services', icon: '🧹',
    items: [
      { name: 'House Cleaning (1 bedroom)',             price: 1500, type: 'service' },
      { name: 'House Cleaning (3 bedroom)',             price: 3000, type: 'service' },
      { name: 'Office Deep Cleaning',                   price: 5000, type: 'service' },
      { name: 'Domestic Worker (Housegirl) Placement', price: 3000, type: 'service' },
      { name: 'Cook / Housekeeper Placement',          price: 3000, type: 'service' },
      { name: 'Security Guard Placement',              price: 4000, type: 'service' },
      { name: 'Printer Repair & Service',              price: 1500, type: 'service' },
      { name: 'Pest Control (1 bedroom)',              price: 2500, type: 'service' },
      { name: 'TV Wall Mount Installation',            price: 1500, type: 'service' },
      { name: 'Office Furniture Delivery & Setup',     price: 2000, type: 'service' },
      { name: 'AC Installation / Service',             price: 3500, type: 'service' },
      { name: 'Plumbing (minor repairs)',              price: 2000, type: 'service' },
    ],
  },
]

export default function Shop() {
  const [activeTab, setActiveTab] = useState('print')

  const activeCategory = shopCategories.find(c => c.id === activeTab)

  return (
    <div className="bg-white">
      <PageHeader
        label="Shop"
        title="Products, Software & Services"
        subtitle="Order via WhatsApp · Pay via M-Pesa · Fast delivery"
        images={headerImages}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {shopCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products grid */}
          {activeCategory && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{activeCategory.icon}</span>
                <h2 className="text-xl font-bold text-slate-900">{activeCategory.label}</h2>
                <span className="text-slate-400 text-sm">({activeCategory.items.length} items)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {activeCategory.items.map((item) => {
                  const badge = TYPE_BADGE[item.type]
                  return (
                    <div key={item.name} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-slate-800 font-semibold text-sm leading-snug flex-1">{item.name}</p>
                        <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-slate-900 font-black text-lg">KES {item.price.toLocaleString()}</span>
                        <a
                          href={waLink(`Hi, I'd like to order "${item.name}" — KES ${item.price.toLocaleString()}. Please confirm availability and M-Pesa payment details.`)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                          </svg>
                          Order
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* CTA */}
          <div className="mt-14 bg-slate-50 border border-gray-100 rounded-2xl p-8 text-center">
            <p className="text-slate-700 font-semibold text-lg mb-2">Don't see what you need?</p>
            <p className="text-slate-500 text-sm mb-5">We source most things on request — just ask on WhatsApp.</p>
            <a
              href={`https://wa.me/254726899113?text=${encodeURIComponent("Hi, I'm looking for a product/service not listed on the shop — can you help?")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Ask on WhatsApp
            </a>
          </div>

        </div>
      </section>
    </div>
  )
}
