// src/pages/TermsOfService.jsx
import PageHeader from '../components/PageHeader'

export default function TermsOfService() {
  return (
    <div className="bg-white">
      <PageHeader
        label="Legal"
        title="Terms of Service"
        subtitle="Last updated: 16 March 2026"
        images={[{ src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80', alt: 'Documents' }]}
      />

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-600 space-y-8">

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">1. Agreement</h2>
            <p>
              By using this website or engaging DealKe for any service, you agree to these Terms of
              Service. DealKe is operated by a sole proprietor based in Nairobi, Kenya.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">2. Services</h2>
            <p>
              DealKe provides website development, KRA registration, government agency assistance
              (NTSA, eCitizen, NSSF, SHA, TSC, HELB/HEF), business registration, document drafting,
              and related digital services. Prices and service details are as listed on our Services
              and Packages pages. All prices are quoted in Kenyan Shillings (KES).
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">3. Payment</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Payment is accepted via M-Pesa, bank transfer, or cash (in-person).</li>
              <li>Website projects require a 50% deposit before work begins; the balance is due on delivery.</li>
              <li>Government service fees (e.g., KRA application charges) are separate and not included in our service fee unless explicitly stated.</li>
              <li>Work will not commence until payment is confirmed.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">4. Turnaround times</h2>
            <p>
              Turnaround times listed on the website are estimates based on normal working conditions
              (Monday–Saturday, 8am–8pm). Times may be affected by government system outages,
              incomplete information from the client, or public holidays. We will communicate any
              delays promptly.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">5. Client responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Provide accurate and complete information required to deliver the service.</li>
              <li>Respond to queries within a reasonable time to avoid project delays.</li>
              <li>Use our services only for lawful purposes.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">6. Intellectual property</h2>
            <p>
              For website projects, full ownership of the completed website is transferred to you
              upon final payment. DealKe retains the right to display completed work in a portfolio
              unless you request otherwise in writing.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">7. Limitation of liability</h2>
            <p>
              DealKe is not liable for delays or failures caused by government system outages,
              changes in government policy, incorrect information provided by the client, or
              circumstances beyond our reasonable control. Our liability is limited to the fee
              paid for the specific service in question.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">8. Governing law</h2>
            <p>
              These terms are governed by the laws of Kenya. Any disputes will be resolved under
              Kenyan jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">9. Contact</h2>
            <p>
              Questions about these terms?{' '}
              <a href="mailto:hello@dealke.co.ke" className="text-emerald-600 underline">hello@dealke.co.ke</a>
              {' '}· +254 726 899 113
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
