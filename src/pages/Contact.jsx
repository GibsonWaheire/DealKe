// src/pages/Contact.jsx
import { useState } from 'react'
import { toast } from 'sonner'
import PageHeader from '../components/PageHeader'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const serviceOptions = [
  'Website Package',
  'KRA Registration',
  'KRA Retrieval',
  'Car Sale Agreement',
  'Business Contract',
  'Affidavit',
  'Business Name Search',
  'Other',
]

const contactDetails = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+254 726 899 113',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: 'Email',
    value: 'hello@dealke.co.ke',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'Nairobi, Kenya',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Hours',
    value: 'Mon–Sat, 8am–8pm',
  },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Message sent! I'll get back to you shortly.")
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    }, 1000)
  }

  return (
    <div className="bg-white">
      <PageHeader
        label="Contact"
        title="Drop a message."
        subtitle="I check messages throughout the day. Most people get a reply within a few hours."
      />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left — Form */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Send a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. James Mwangi"
                    required
                    className="h-10 border-gray-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-300 focus-visible:ring-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="h-10 border-gray-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-300 focus-visible:ring-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+254 7XX XXX XXX"
                    className="h-10 border-gray-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-300 focus-visible:ring-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Service Interested In</label>
                  <Select
                    value={form.service}
                    onValueChange={(val) => setForm((prev) => ({ ...prev, service: val }))}
                  >
                    <SelectTrigger className="h-10 border-gray-200 bg-white text-slate-900 w-full focus:ring-emerald-300 focus:ring-2">
                      <SelectValue placeholder="Select a service..." />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message / Project Brief</label>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me what you need..."
                    rows={5}
                    required
                    className="border-gray-200 bg-white text-slate-900 placeholder:text-slate-400 resize-none focus-visible:ring-emerald-300 focus-visible:ring-2"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium h-11 rounded-xl"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Right — Contact details */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Contact details</h2>
              <div className="space-y-5 mb-8">
                {contactDetails.map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="text-slate-400 mt-0.5 shrink-0">{icon}</div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
                      <p className="text-slate-800 text-sm mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp card */}
              <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6">
                <p className="text-slate-900 font-semibold text-sm mb-1">Most clients use WhatsApp.</p>
                <p className="text-slate-500 text-sm mb-4">
                  It's faster and I'm genuinely on it. Most questions get answered within the hour.
                </p>
                <a
                  href="https://wa.me/254726899113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
