// src/pages/Services.jsx
import PageHeader from '../components/PageHeader'
import ServiceCard from '../components/ServiceCard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'

const services = [
  // KRA
  { name: 'KRA PIN Registration', price: 500, turnaround: 'Same day', category: 'KRA', description: 'New PIN via iTax. Send your ID, we handle the rest.', note: 'Most requested' },
  { name: 'KRA PIN Retrieval', price: 300, turnaround: 'Same day', category: 'KRA', description: 'Lost or forgotten your PIN? We locate and resend the certificate.' },
  // Contracts
  { name: 'Car Sale Agreement', price: 800, turnaround: 'Same day', category: 'Contracts', description: 'Legally worded agreement for private vehicle sales.', note: 'Same day' },
  { name: 'Simple Business Contract', price: 1000, turnaround: '1 business day', category: 'Contracts', description: 'General service or supply contract, ready to sign.' },
  { name: 'Affidavit / Statutory Declaration', price: 1200, turnaround: '1 business day', category: 'Contracts', description: 'Sworn statement prepared and ready for the commissioner.' },
  // Business
  { name: 'Business Name Search', price: 400, turnaround: 'Same day', category: 'Business', description: 'Check name availability on eCitizen before you register.' },
]

const tabs = [
  { value: 'all', label: 'All' },
  { value: 'KRA', label: 'KRA' },
  { value: 'Contracts', label: 'Contracts' },
  { value: 'Business', label: 'Business' },
]

const steps = [
  { num: '1', title: 'Pick what you need', detail: 'Choose from the list above. If you\'re not sure, just ask.' },
  { num: '2', title: 'Send your details via WhatsApp', detail: 'We\'ll tell you exactly what we need. Usually just your ID and a few details.' },
  { num: '3', title: 'Get your document', detail: 'We handle it and send you the result — usually the same day.' },
]

export default function Services() {
  return (
    <div>
      <PageHeader
        label="Other Services"
        title="KRA, contracts, and business docs — sorted fast."
        subtitle="Most of these take less than a day. You don't need to visit any office."
      />

      {/* Services tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all">
            <TabsList className="mb-8 bg-zinc-100 p-1 rounded-lg h-auto flex-wrap gap-1">
              {tabs.map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="text-sm px-4 py-1.5 rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((s) => <ServiceCard key={s.name} {...s} />)}
              </div>
            </TabsContent>

            {['KRA', 'Contracts', 'Business'].map((cat) => (
              <TabsContent key={cat} value={cat}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services
                    .filter((s) => s.category === cat)
                    .map((s) => <ServiceCard key={s.name} {...s} />)}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">How it works</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-1">Three steps. That's it.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg mb-4 shrink-0">
                  {step.num}
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-1">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
