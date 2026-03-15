import { Link } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

const whatsappUrl = 'https://wa.me/254700000000'

const digitalServices = [
  { name: 'KRA PIN Registration', price: 'KES 500', turnaround: 'Same day', note: 'Most requested' },
  { name: 'KRA PIN Retrieval', price: 'KES 300', turnaround: 'Same day' },
  { name: 'Car Sale Agreement', price: 'KES 800', turnaround: 'Same day', note: 'Same day' },
  { name: 'Business Contract', price: 'KES 1,000', turnaround: '1 business day' },
  { name: 'Affidavit / Declaration', price: 'KES 1,200', turnaround: '1 business day' },
  { name: 'Business Name Search', price: 'KES 400', turnaround: 'Same day' },
  { name: 'eCitizen Account Setup', price: 'KES 300', turnaround: 'Same day' },
  { name: 'NSSF Registration', price: 'KES 500', turnaround: 'Same day' },
]

const websitePackages = [
  {
    name: 'Starter',
    price: 'KES 15,000',
    popular: false,
    features: ['1 page', 'Mobile ready', 'Contact form', '1 revision'],
  },
  {
    name: 'Business',
    price: 'KES 35,000',
    popular: true,
    features: ['5 pages', 'SEO setup', 'Google Maps', '3 revisions'],
  },
  {
    name: 'Premium',
    price: 'KES 65,000',
    popular: false,
    features: ['10 pages', 'CMS + Blog', 'Analytics', 'Priority support'],
  },
]

const testimonials = [
  {
    quote: 'My KRA PIN was sorted within hours. Very professional and fast.',
    name: 'James M., Thika',
    detail: 'Small Business Owner',
  },
  {
    quote: 'Website was live in 5 days. Clean, mobile-friendly, exactly what I needed. Not Wix. Not a template. An actual website.',
    name: 'Grace W., Nairobi',
    detail: 'Salon Owner',
  },
  {
    quote: 'Car sale agreement was ready in 2 hours. Saved me a trip to town.',
    name: 'Brian O., Kisumu',
    detail: 'Private Seller',
  },
]

const faqs = [
  {
    q: 'How long does it take to build my website?',
    a: 'Most go live in 3 to 7 days. Depends on how fast you send content and feedback.',
  },
  {
    q: 'Do I need to provide content?',
    a: "Yes - text, logo, images. We'll tell you exactly what before we start.",
  },
  {
    q: 'How do I pay?',
    a: 'M-Pesa, bank transfer, or cash. 50% upfront, balance on delivery.',
  },
  {
    q: 'Can I update the website after delivery?',
    a: 'Yes. Maintenance packages available, or we train you if CMS is included.',
  },
  {
    q: 'How does KRA PIN registration work?',
    a: 'Send your ID details on WhatsApp. We handle iTax and send the certificate - usually same day.',
  },
]

const recentDeliveries = [
  { name: 'KRA PIN Registration', time: '2 hrs' },
  { name: 'Business Website', time: '4 days' },
  { name: 'Car Sale Agreement', time: 'Same day' },
]

export default function Home() {
  return (
    <div className="bg-zinc-950">
      <section className="bg-zinc-900 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full">
                🇰🇪 Nairobi, Kenya
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mt-4">
                Good websites shouldn&apos;t cost 150k.
              </h1>
              <p className="text-zinc-300 text-xl md:text-2xl font-semibold mt-2">
                KRA, contracts, and business docs - sorted fast.
              </p>
              <p className="text-zinc-400 text-base mt-3 max-w-xl">
                WhatsApp us your request. Most services delivered same day.
              </p>
              <p className="text-zinc-500 text-xs mt-4">Last project delivered: 12 March 2026</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Chat on WhatsApp
                </a>
                <a
                  href="#services"
                  className="border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                  See All Services ↓
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-zinc-800 rounded-xl p-5 font-mono text-sm">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Recent Deliveries</p>
                <div className="space-y-2.5">
                  {recentDeliveries.map((delivery) => (
                    <div key={delivery.name} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-300">✓</span>
                        <span className="text-white">{delivery.name}</span>
                      </div>
                      <span className="text-zinc-500">{delivery.time}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-zinc-700 mt-4 pt-3">
                  <p className="text-zinc-600 text-xs">Last delivery: 12 March 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-600 text-white py-3 text-center text-sm font-medium">
        <p>
          📲 Quick order? WhatsApp us directly:{' '}
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-white underline">
            +254 700 000 000
          </a>
        </p>
      </section>

      <section id="services" className="py-12 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-white font-bold text-xl mb-1">Two things we&apos;re good at.</h2>
          <p className="text-zinc-500 text-sm mb-8">
            Websites built properly. Government docs sorted without the runaround.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-100 font-semibold text-base mb-4">Digital Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {digitalServices.map((service) => (
                  <div
                    key={service.name}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 hover:border-zinc-500 hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-zinc-100 font-semibold text-sm">{service.name}</p>
                      {service.note ? (
                        <span className="bg-white text-zinc-900 text-xs px-2 py-0.5 rounded-full">
                          {service.note}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-white font-bold text-base mt-2">{service.price}</p>
                    <p className="text-zinc-400 text-xs mt-1">{service.turnaround}</p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white text-xs font-medium mt-2 inline-block"
                    >
                      Order →
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-zinc-400 text-xs mt-3">
                + 40 more services on the services page{' '}
                <Link to="/services" className="text-white hover:text-zinc-300 underline">
                  /services
                </Link>
              </p>
            </div>

            <div>
              <h3 className="text-zinc-100 font-semibold text-base mb-4">Website Packages</h3>
              <div className="space-y-4">
                {websitePackages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={
                      pkg.popular
                        ? 'bg-zinc-900 text-white rounded-xl px-5 py-7 border-0'
                        : 'bg-zinc-900 border border-zinc-700 rounded-xl p-5'
                    }
                  >
                    {pkg.popular ? (
                      <span className="bg-white text-zinc-900 text-xs px-2 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    ) : null}
                    <div className="flex items-center justify-between mt-2">
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <p className="text-white font-bold">
                        {pkg.price}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {pkg.features.map((feature) => (
                        <span
                          key={feature}
                          className={
                            pkg.popular
                              ? 'bg-white/10 text-zinc-200 text-xs px-2 py-0.5 rounded-full'
                              : 'bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5 rounded-full'
                          }
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-300 text-sm font-medium mt-3 block"
                    >
                      Get This Package →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 items-start">
            <div className="col-span-2 lg:col-span-1 lg:border-r lg:border-zinc-700 lg:pr-8">
              <div className="text-3xl font-bold text-white">47</div>
              <div className="text-zinc-400 text-sm mt-1">Projects Delivered</div>
              <div className="text-zinc-500 text-xs mt-1.5">Nairobi, Mombasa, Kisumu, Nakuru and beyond</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">6 counties</div>
              <div className="text-zinc-500 text-sm mt-1">Counties Served</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">4.2 days</div>
              <div className="text-zinc-500 text-sm mt-1">Avg. Website Delivery</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">Same day</div>
              <div className="text-zinc-500 text-sm mt-1">Most Digital Services</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-white font-bold text-xl mb-8">What people actually said.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 shadow-sm">
                <p className="text-amber-400 text-sm">★★★★★</p>
                <p className="text-zinc-300 text-sm leading-relaxed mt-2">"{t.quote}"</p>
                <p className="text-zinc-100 font-medium text-sm mt-3">— {t.name}</p>
                <p className="text-zinc-400 text-xs">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">Common Questions</p>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`}>
                <AccordionTrigger className="text-zinc-100 text-sm font-medium text-left hover:no-underline hover:text-white data-[state=open]:text-white">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-zinc-800 border-t border-zinc-700 py-12 text-white text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold">Stop putting it off.</h2>
          <p className="text-zinc-400 mt-2 text-base">
            Send a message. We&apos;ll reply today with a straight answer and a price.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Chat on WhatsApp
            </a>
            <Link to="/contact" className="border border-white/30 text-white px-6 py-3 rounded-lg">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
