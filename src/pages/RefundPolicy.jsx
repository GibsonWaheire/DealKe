// src/pages/RefundPolicy.jsx
import PageHeader from '../components/PageHeader'

export default function RefundPolicy() {
  return (
    <div className="bg-white">
      <PageHeader
        label="Legal"
        title="Refund Policy"
        subtitle="Last updated: 16 March 2026"
        images={[{ src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80', alt: 'Documents' }]}
      />

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-600 space-y-8">

          <div>
            <p className="text-slate-700">
              We want every client to be satisfied with the work delivered. Below is our refund
              policy for each service category.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">1. Government services (KRA, NTSA, eCitizen, NSSF, etc.)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-800">Service not completed:</strong> If we are unable
                to complete the service due to a fault on our end (e.g., error in processing), you
                are entitled to a full refund of our service fee.
              </li>
              <li>
                <strong className="text-slate-800">Service completed successfully:</strong> No refund
                is issued once the service has been delivered.
              </li>
              <li>
                <strong className="text-slate-800">Incomplete information from client:</strong> If
                work cannot be completed because you provided incorrect or incomplete details, a
                50% refund may be issued at our discretion.
              </li>
              <li>
                <strong className="text-slate-800">Government system delays:</strong> If the delay is
                caused by government portal outages or policy changes outside our control, no refund
                is issued — but we will continue the work once systems are restored.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">2. Document services (contracts, affidavits, typesetting)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-800">Before work begins:</strong> Full refund.
              </li>
              <li>
                <strong className="text-slate-800">Work in progress:</strong> Partial refund based
                on work completed, at our discretion.
              </li>
              <li>
                <strong className="text-slate-800">After delivery:</strong> No refund. Revisions
                within the agreed scope are handled at no extra cost.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">3. Website development</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-800">Before work begins (deposit paid):</strong> The
                deposit is non-refundable if you cancel after confirming scope and design direction,
                as it covers time already committed to the project.
              </li>
              <li>
                <strong className="text-slate-800">If we cancel:</strong> Full refund of any amount
                paid.
              </li>
              <li>
                <strong className="text-slate-800">After delivery:</strong> No refund once the final
                website is delivered and accepted. Any issues will be resolved under the 30-day
                post-launch support included in every package.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">4. How to request a refund</h2>
            <p>
              Contact us via WhatsApp at <strong className="text-slate-800">+254 726 899 113</strong>{' '}
              or email{' '}
              <a href="mailto:hello@dealke.co.ke" className="text-emerald-600 underline">hello@dealke.co.ke</a>.
              Include your name, the service ordered, and the reason for the request. We will
              respond within 1 business day and process eligible refunds via M-Pesa within 3
              business days.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">5. Questions</h2>
            <p>
              If you have any questions about this policy, get in touch before placing an order and
              we will clarify everything upfront.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
