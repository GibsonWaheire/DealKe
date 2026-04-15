// src/pages/RefundPolicy.jsx
import PageHeader from '../components/PageHeader'
import DownloadPolicyButton from '../components/DownloadPolicyButton'

const Section = ({ title, children }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
    <h2 className="text-slate-900 font-bold text-base">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
  </div>
)

export default function RefundPolicy() {
  return (
    <div className="bg-slate-50">
      <PageHeader
        label="Legal"
        title="Refund Policy"
        subtitle="Last updated: 15 April 2026"
        images={[{ src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80', alt: 'Documents' }]}
      />

      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 policy-content">

          {/* Print header */}
          <div className="hidden page-header-print">
            <h1 className="text-2xl font-bold">Draft-It — Refund Policy</h1>
            <p className="text-sm text-slate-500">Last updated: 15 April 2026 · help@draftit.co.ke · +254 726 899 113</p>
          </div>

          <div className="flex items-center justify-between mb-6 no-print">
            <p className="text-xs text-slate-400">Effective: 15 April 2026</p>
            <DownloadPolicyButton label="Download Refund Policy" />
          </div>

          {/* Intro box */}
          <div className="bg-slate-900 text-white rounded-xl p-6 mb-6 text-sm leading-relaxed">
            This Refund Policy ("Policy") governs all transactions made with Draft-It ("Company",
            "we", "us", "our"). By completing a payment for any service offered by Draft-It, the
            client ("you", "your") acknowledges and unconditionally agrees to the terms set out
            herein. This Policy forms part of, and should be read together with, our{' '}
            <a href="/terms" className="underline text-slate-300 hover:text-white">Terms &amp; Conditions</a>.
          </div>

          <div className="space-y-4">

            <Section title="1. Refund Method and Payment Channel">
              <p>
                All approved refunds shall be disbursed exclusively through the same payment channel
                and instrument used to originate the transaction. Draft-It shall not, under any
                circumstances, redirect, transfer, or issue refunds to an alternative account,
                mobile number, card, or payment method not associated with the original transaction.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-slate-800">Paystack (card, Apple Pay, or M-Pesa via Paystack):</strong>{' '}
                  Refunds shall be reversed through Paystack to the originating card or mobile wallet.
                  Paystack's standard reversal timelines apply: typically 5–10 business days for card
                  transactions and 1–3 business days for M-Pesa. Draft-It has no control over these
                  timelines once the reversal has been initiated.
                </li>
                <li>
                  <strong className="text-slate-800">M-Pesa (direct transfer):</strong>{' '}
                  Refunds shall be remitted to the same registered M-Pesa number from which the
                  original payment was received, within 3 business days of approval.
                </li>
                <li>
                  <strong className="text-slate-800">UAE and international clients:</strong>{' '}
                  Where payment was made in a foreign currency (including AED), the refund shall be
                  calculated and processed in Kenyan Shillings (KES) at the exchange rate applied at
                  the time of the original transaction. Draft-It shall not be liable for any foreign
                  exchange fluctuations, international wire fees, card scheme conversion charges, or
                  delays imposed by the client's bank or card issuer.
                </li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-800 text-xs">
                <strong>Notice:</strong> It is the client's sole responsibility to ensure that payment
                details entered at checkout are accurate and current. Draft-It shall not be held liable
                for failed or delayed refunds resulting from incorrect payment information provided by
                the client.
              </div>
            </Section>

            <Section title="2. Government Services (KRA, NTSA, eCitizen, NSSF, etc.)">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-slate-800">Service not completed (Company fault):</strong>{' '}
                  Where Draft-It is unable to complete the service due to an error or omission on our
                  part, the client is entitled to a full refund of the service fee paid to Draft-It.
                </li>
                <li>
                  <strong className="text-slate-800">Service completed successfully:</strong>{' '}
                  No refund shall be issued once the service has been duly delivered and confirmed.
                </li>
                <li>
                  <strong className="text-slate-800">Incomplete or inaccurate client information:</strong>{' '}
                  Where work cannot be completed solely because the client provided incorrect or
                  incomplete information, Draft-It reserves the right to issue a partial refund of
                  up to 50% of the service fee, at the Company's sole discretion.
                </li>
                <li>
                  <strong className="text-slate-800">Government system delays:</strong>{' '}
                  Where delays arise from government portal outages, system maintenance, regulatory
                  changes, or any other circumstance beyond Draft-It's reasonable control, no refund
                  shall be issued. The Company shall continue to pursue completion once normal
                  operations resume.
                </li>
              </ul>
            </Section>

            <Section title="3. Document Services (Contracts, Affidavits, Typesetting)">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-slate-800">Prior to commencement of work:</strong>{' '}
                  A full refund shall be issued if the client cancels before any work has begun.
                </li>
                <li>
                  <strong className="text-slate-800">Work in progress:</strong>{' '}
                  A partial refund, proportionate to the work not yet completed, may be issued at
                  Draft-It's discretion.
                </li>
                <li>
                  <strong className="text-slate-800">Following delivery:</strong>{' '}
                  No refund shall be issued once the document has been delivered. Revisions within
                  the originally agreed scope shall be accommodated at no additional charge.
                </li>
              </ul>
            </Section>

            <Section title="4. Website Development">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-slate-800">Deposit paid — client cancels after scope confirmation:</strong>{' '}
                  The deposit shall be deemed non-refundable upon the client's confirmation of project
                  scope and design direction, as it compensates for resources and time already committed.
                </li>
                <li>
                  <strong className="text-slate-800">Cancellation by Draft-It:</strong>{' '}
                  In the event that Draft-It is unable to proceed, a full refund of all amounts paid
                  shall be issued without undue delay.
                </li>
                <li>
                  <strong className="text-slate-800">Following final delivery:</strong>{' '}
                  No refund shall be issued once the completed website has been delivered and accepted
                  by the client. Defects or outstanding issues shall be addressed under the 30-day
                  post-launch support period included with every package.
                </li>
              </ul>
            </Section>

            <Section title="5. Refund Request Procedure">
              <p>
                To initiate a refund request, the client must contact Draft-It within the eligible
                window via WhatsApp at <strong className="text-slate-800">+254 726 899 113</strong>{' '}
                or by email at{' '}
                <a href="mailto:help@draftit.co.ke" className="text-emerald-600 underline">help@draftit.co.ke</a>.
                The request must include the client's full name, the service ordered, the original
                payment reference number, and a clear description of the grounds for the refund.
                Draft-It shall acknowledge the request within one (1) business day and, where approved,
                shall initiate the reversal within three (3) business days, subject to the payment
                processor's own applicable timelines.
              </p>
            </Section>

            <Section title="6. Disputes and Governing Law">
              <p>
                This Policy is governed by and shall be construed in accordance with the laws of Kenya.
                Any dispute arising from or in connection with a refund claim shall first be referred
                to Draft-It for informal resolution. If unresolved within 14 days, the matter shall be
                subject to the exclusive jurisdiction of the competent courts of Kenya. International
                clients, including those based in the UAE or any other jurisdiction, agree that Kenyan
                law governs all transactions and disputes with Draft-It.
              </p>
            </Section>

            <Section title="7. Enquiries">
              <p>
                For any queries regarding this Policy, please contact us prior to placing an order
                and we will provide full clarification. We are committed to resolving all concerns
                fairly and transparently.
              </p>
            </Section>

          </div>
        </div>{/* end policy-content */}
      </section>
    </div>
  )
}
