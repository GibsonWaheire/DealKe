// src/pages/Shop.jsx
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('print')
  const [typeFilter, setTypeFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [cart, setCart] = useState([])

  const activeCategory = shopCategories.find(c => c.id === activeTab)
  const visibleItems = useMemo(() => {
    if (!activeCategory) return []
    const normalized = query.trim().toLowerCase()
    let items = activeCategory.items.filter((item) => {
      const matchesQuery = !normalized || item.name.toLowerCase().includes(normalized)
      const matchesType = typeFilter === 'all' || item.type === typeFilter
      return matchesQuery && matchesType
    })
    if (sortBy === 'price-low') items = [...items].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') items = [...items].sort((a, b) => b.price - a.price)
    if (sortBy === 'name') items = [...items].sort((a, b) => a.name.localeCompare(b.name))
    return items
  }, [activeCategory, query, typeFilter, sortBy])

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.name === item.name)
      if (exists) {
        return prev.map((p) => (p.name === item.name ? { ...p, qty: p.qty + 1 } : p))
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const updateQty = (name, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.name === name ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0)
    )
  }

  const buyNow = (item) => {
    navigate('/order', {
      state: {
        serviceName: item.name,
        price: item.price,
        currency: 'KES',
        category: 'Shop',
      },
    })
  }

  const checkoutCart = () => {
    if (!cartTotal) return
    navigate('/order', {
      state: {
        serviceName: `Shop Order (${cartCount} item${cartCount > 1 ? 's' : ''})`,
        price: cartTotal,
        currency: 'KES',
        category: 'Shop',
      },
    })
  }

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

          {activeCategory && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-2xl">{activeCategory.icon}</span>
                  <h2 className="text-xl font-bold text-slate-900">{activeCategory.label}</h2>
                  <span className="text-slate-400 text-sm">({visibleItems.length} items)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 mb-6">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full h-11 px-4 border border-gray-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 text-sm"
                  />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="h-11 px-3 border border-gray-200 rounded-xl text-slate-700 bg-white text-sm"
                  >
                    <option value="all">All types</option>
                    <option value="digital">Digital</option>
                    <option value="physical">Physical</option>
                    <option value="software">Software</option>
                    <option value="service">Service</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-11 px-3 border border-gray-200 rounded-xl text-slate-700 bg-white text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to high</option>
                    <option value="price-high">Price: High to low</option>
                    <option value="name">Name: A-Z</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  {visibleItems.map((item) => {
                    const badge = TYPE_BADGE[item.type]
                    return (
                      <div key={item.name} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-slate-800 font-semibold text-sm leading-snug flex-1">{item.name}</p>
                          <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${badge.cls}`}>
                            {badge.label}
                          </span>
                        </div>
                        <div className="mt-auto">
                          <p className="text-slate-900 font-black text-lg mb-3">KES {item.price.toLocaleString()}</p>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => addToCart(item)}
                              className="inline-flex items-center justify-center border border-gray-200 hover:border-gray-400 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                            >
                              Add to cart
                            </button>
                            <button
                              onClick={() => buyNow(item)}
                              className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                            >
                              Buy now
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {!visibleItems.length && (
                  <div className="bg-slate-50 border border-gray-100 rounded-2xl p-8 text-center mt-2">
                    <p className="text-slate-700 font-semibold">No products found.</p>
                    <p className="text-slate-500 text-sm mt-1">Try a different category, type, or search term.</p>
                  </div>
                )}
              </div>
              <aside className="lg:sticky lg:top-24 bg-white border border-gray-100 rounded-2xl p-5">
                <p className="text-slate-900 font-bold text-base">Your cart</p>
                <p className="text-slate-500 text-xs mt-1 mb-4">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
                {cart.length ? (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.name} className="rounded-xl border border-gray-100 p-3">
                        <p className="text-slate-800 text-sm font-medium leading-snug">{item.name}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-slate-900 font-semibold text-sm">KES {(item.price * item.qty).toLocaleString()}</p>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(item.name, -1)} className="w-7 h-7 rounded-md border border-gray-200 text-slate-600 hover:border-gray-400">-</button>
                            <span className="text-sm font-semibold text-slate-800 w-5 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.name, 1)} className="w-7 h-7 rounded-md border border-gray-200 text-slate-600 hover:border-gray-400">+</button>
                          </div>
                      </div>
                    </div>
                    ))}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-sm">Subtotal</span>
                        <span className="text-slate-900 text-lg font-bold">KES {cartTotal.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={checkoutCart}
                        className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl transition-colors"
                      >
                        Proceed to checkout
                      </button>
                      <a
                        href={waLink(`Hi, I'd like to order these items: ${cart.map((i) => `${i.name} x${i.qty}`).join(', ')}. Total KES ${cartTotal.toLocaleString()}. Please confirm availability.`)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 w-full inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                      >
                        Checkout on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-gray-100 rounded-xl p-4">
                    <p className="text-slate-600 text-sm">Your cart is empty. Add products to continue.</p>
                  </div>
                )}
              </aside>
            </div>
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
