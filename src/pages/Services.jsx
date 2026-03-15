// src/pages/Services.jsx
import PageHeader from '../components/PageHeader'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'

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

  { name: 'Car Sale Agreement', price: 'KES 800', turnaround: 'Same day', category: 'Documents', note: 'Same day' },
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

  { name: 'Starter Website Package', price: 'KES 15,000', turnaround: '5-7 days', category: 'Websites' },
  { name: 'Business Website Package', price: 'KES 35,000', turnaround: '7-10 days', category: 'Websites' },
  { name: 'Premium Website Package', price: 'KES 65,000', turnaround: '10-14 days', category: 'Websites' },
]

const tabs = [
  { value: 'all', label: 'All' },
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

const getOrderLink = (serviceName) =>
  `https://wa.me/254700000000?text=${encodeURIComponent(`Hi, I need ${serviceName}`)}`

export default function Services() {
  return (
    <div>
      <PageHeader
        label="Other Services"
        title="KRA, contracts, and business docs — sorted fast."
        subtitle="Most of these take less than a day. You don't need to visit any office."
      />

      <section className="py-16 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all">
            <TabsList className="mb-8 bg-zinc-900 p-1 rounded-lg h-auto flex-wrap gap-1">
              {tabs.map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="text-sm px-4 py-1.5 rounded-md bg-zinc-800 text-zinc-400 hover:text-white data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-none"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 hover:border-zinc-500 hover:shadow-sm transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-zinc-100 font-semibold text-sm">{service.name}</p>
                      {service.note ? (
                        <span className="bg-white text-zinc-900 text-xs px-2 py-0.5 rounded-full">
                          {service.note}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex justify-between items-center gap-3 mt-2">
                      <p className="text-white font-bold">{service.price}</p>
                      <span className="bg-zinc-700 text-zinc-300 text-xs px-2 py-0.5 rounded-full">
                        {service.turnaround}
                      </span>
                    </div>
                    <a
                      href={getOrderLink(service.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-300 hover:text-white text-xs font-medium mt-3 block"
                    >
                      Order via WhatsApp →
                    </a>
                  </div>
                ))}
              </div>
            </TabsContent>

            {tabs
              .filter((tab) => tab.value !== 'all')
              .map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services
                      .filter((service) => service.category === tab.value)
                      .map((service) => (
                        <div
                          key={service.name}
                          className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 hover:border-zinc-500 hover:shadow-sm transition"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-zinc-100 font-semibold text-sm">{service.name}</p>
                            {service.note ? (
                              <span className="bg-white text-zinc-900 text-xs px-2 py-0.5 rounded-full">
                                {service.note}
                              </span>
                            ) : null}
                          </div>
                          <div className="flex justify-between items-center gap-3 mt-2">
                            <p className="text-white font-bold">{service.price}</p>
                            <span className="bg-zinc-700 text-zinc-300 text-xs px-2 py-0.5 rounded-full">
                              {service.turnaround}
                            </span>
                          </div>
                          <a
                            href={getOrderLink(service.name)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-300 hover:text-white text-xs font-medium mt-3 block"
                          >
                            Order via WhatsApp →
                          </a>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
          </Tabs>
        </div>
      </section>

      <section className="bg-zinc-900 py-8 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-zinc-300 text-sm">
            Don&apos;t see what you need? We handle more than what&apos;s listed here.
          </p>
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-green-500 text-white mt-4 px-5 py-2.5 rounded-lg font-medium"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
