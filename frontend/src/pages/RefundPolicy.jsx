// src/pages/RefundPolicy.jsx
import PageHeader from '../components/PageHeader'

export default function RefundPolicy() {
  return (
    <div className="bg-white">
      <PageHeader
        label="Legal"
        title="Refund Policy"
        subtitle="Last updated: 15 April 2026"
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
            <h2 className="text-slate-900 font-bold text-lg mb-3">4. Refund method — same payment channel</h2>
            <p className="mb-3">
              All refunds are issued exclusively through the same payment method used to make the
              original payment. We do not redirect funds to a different account, wallet, or channel
              under any circumstances.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-800">Paid via Paystack (card, Apple Pay, or M-Pesa via Paystack):</strong>{' '}
                Refund will be processed back through Paystack to the original card or mobile wallet.
                Paystack's standard reversal timeline applies (typically 5–10 business days for cards;
                1–3 business days for M-Pesa).
              </li>
              <li>
                <strong className="text-slate-800">Paid via M-Pesa (direct):</strong>{' '}
                Refund will be sent to the same M-Pesa number used for payment within 3 business days.
              </li>
              <li>
                <strong className="text-slate-800">UAE and international clients:</strong>{' '}
                If you paid in AED or another foreign currency, your refund will be processed in KES
                at the exchange rate applied at the time of your original transaction. Draft-It is
                not responsible for any foreign exchange differences, international transfer fees, or
                delays imposed by your bank or card issuer.
              </li>
            </ul>
            <p className="mt-3 text-sm bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-800">
              <strong>Important:</strong> We cannot issue refunds to a different account, phone number,
              or payment method than the one used for the original transaction. Please ensure your
              payment details are correct before completing checkout.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">5. How to request a refund</h2>
            <p>
              Contact us via WhatsApp at <strong className="text-slate-800">+254 726 899 113</strong>{' '}
              or email{' '}
              <a href="mailto:help@draftit.co.ke" className="text-emerald-600 underline">help@draftit.co.ke</a>.
              Include your name, the service ordered, the payment reference, and the reason for the
              request. We will respond within 1 business day and process eligible refunds via the
              original payment method within 3 business days (subject to the processor's own timeline).
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">6. Questions</h2>
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
