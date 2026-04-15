// src/pages/TermsOfService.jsx
import PageHeader from '../components/PageHeader'
import DownloadPolicyButton from '../components/DownloadPolicyButton'

const Section = ({ title, children }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
    <h2 className="text-slate-900 font-bold text-base">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
  </div>
)

export default function TermsOfService() {
  return (
    <div className="bg-slate-50">
      <PageHeader
        label="Legal"
        title="Terms &amp; Conditions"
        subtitle="Last updated: 15 April 2026"
        images={[{ src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80', alt: 'Documents' }]}
      />

      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 policy-content">

          {/* Print header */}
          <div className="hidden page-header-print">
            <h1 className="text-2xl font-bold">Draft-It — Terms &amp; Conditions</h1>
            <p className="text-sm text-slate-500">Last updated: 15 April 2026 · help@draftit.co.ke · +254 726 899 113</p>
          </div>

          <div className="flex items-center justify-between mb-6 no-print">
            <p className="text-xs text-slate-400">Effective: 15 April 2026</p>
            <DownloadPolicyButton label="Download Terms" />
          </div>

          {/* Intro box */}
          <div className="bg-slate-900 text-white rounded-xl p-6 mb-6 text-sm leading-relaxed">
            These Terms and Conditions ("Agreement") constitute a legally binding contract between
            you ("Client", "you", "your") and Draft-It ("Company", "we", "us", "our"), a digital
            services business registered and operating in Nairobi, Kenya. By accessing this website,
            requesting a quote, or completing any payment transaction with Draft-It, you unconditionally
            accept and agree to be bound by the terms set out herein. If you do not agree with any
            part of this Agreement, you must not use our services.
          </div>

          <div className="space-y-4">

            <Section title="1. Parties and Agreement">
              <p>
                This Agreement is entered into between Draft-It (sole proprietorship, Nairobi, Kenya)
                and the Client. It governs all services procured through our website at draftit.co.ke,
                via WhatsApp, or through any other channel through which Draft-It receives a service
                request or payment.
              </p>
              <p>
                By proceeding with a purchase, the Client confirms they have read, understood, and
                agreed to this Agreement in its entirety, including the{' '}
                <a href="/refund" className="text-emerald-400 underline">Refund Policy</a> and{' '}
                <a href="/privacy" className="text-emerald-400 underline">Privacy Notice</a>, which
                are incorporated herein by reference.
              </p>
            </Section>

            <Section title="2. Scope of Services">
              <p>
                Draft-It provides the following categories of services, the full details of which are
                set out on our Services and Packages pages:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Website design and development (landing pages, business sites, e-commerce)</li>
                <li>KRA PIN registration, eTIMS registration, and iTax services</li>
                <li>Government agency assistance: NTSA, eCitizen, NSSF, SHA, TSC, HELB/HEF</li>
                <li>Business name and company registration</li>
                <li>Document drafting: contracts, affidavits, CVs, proposals, technical writing</li>
                <li>IT support, CCTV installation, POS system setup, and Odoo ERP</li>
                <li>Digital shop products and passport photo services</li>
              </ul>
              <p>
                All prices are quoted in Kenyan Shillings (KES) unless otherwise stated. Prices are
                subject to change without prior notice; the price applicable to your order is the
                price displayed at the time your payment is confirmed.
              </p>
            </Section>

            <Section title="3. Payment Obligations">
              <p>
                Payment is due in full (or as a confirmed deposit) prior to commencement of any work,
                unless a separate written arrangement has been agreed. Draft-It shall not be obligated
                to commence or continue any service until payment has been received and verified.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-slate-800">Accepted methods:</strong> Paystack (card, Apple Pay,
                  M-Pesa via Paystack) and direct M-Pesa transfer. All transactions are settled in KES.
                </li>
                <li>
                  <strong className="text-slate-800">International clients (UAE and other):</strong> Where
                  payment is entered in AED or another foreign currency, the equivalent KES amount is
                  calculated using the live exchange rate at the time of transaction. Draft-It is not
                  responsible for currency fluctuations between quote and payment.
                </li>
                <li>
                  <strong className="text-slate-800">Website deposits:</strong> A minimum deposit of 50%
                  is required before work commences on any website project. The remaining balance is
                  payable upon delivery of the completed project.
                </li>
                <li>
                  <strong className="text-slate-800">Government fees:</strong> Statutory fees charged by
                  government agencies (e.g., KRA, NTSA) are separate from Draft-It's service fee and
                  are not included in quoted prices unless explicitly stated in writing.
                </li>
              </ul>
            </Section>

            <Section title="4. Refunds">
              <p>
                All refunds are governed by Draft-It's{' '}
                <a href="/refund" className="text-emerald-600 underline">Refund Policy</a>, which forms
                part of this Agreement. Where an approved refund is due, it shall be returned exclusively
                via the same payment channel used for the original transaction. Draft-It shall not
                redirect refunds to any alternative account, number, or payment method. International
                clients should note that currency conversion differences and any fees imposed by their
                card issuer or bank are non-reimbursable by Draft-It.
              </p>
            </Section>

            <Section title="5. Turnaround Times and Delays">
              <p>
                Turnaround times published on this website are reasonable estimates based on normal
                operating conditions (Monday–Saturday, 8:00 am–8:00 pm EAT). They do not constitute
                guaranteed delivery dates. Draft-It shall not be held in breach of this Agreement
                solely on account of delays attributable to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Government portal outages, system downtime, or policy changes</li>
                <li>Incomplete, inaccurate, or late submission of required information by the Client</li>
                <li>Public holidays, force majeure events, or other circumstances beyond our control</li>
              </ul>
              <p>
                Draft-It shall notify the Client of any material delay and shall take reasonable steps
                to complete the service as soon as practicable.
              </p>
            </Section>

            <Section title="6. Client Obligations">
              <p>By engaging Draft-It, the Client agrees to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide accurate, complete, and truthful information required for service delivery</li>
                <li>Respond to queries from Draft-It within a reasonable time to avoid project delays</li>
                <li>Use Draft-It's services solely for lawful purposes and in compliance with all applicable laws of Kenya</li>
                <li>Not misrepresent any service description or project details at the time of ordering</li>
              </ul>
              <p>
                Draft-It reserves the right to suspend or terminate service delivery without refund
                if the Client is found to have provided false information or to be using the service
                for unlawful purposes.
              </p>
            </Section>

            <Section title="7. Intellectual Property">
              <p>
                Upon receipt of final payment in full, all intellectual property rights in the
                deliverables produced for the Client (including website code, design assets, and
                documents) are assigned to the Client. Draft-It retains no ongoing licence to use
                such materials, save that the Company reserves the right to display completed work
                in its portfolio unless the Client provides written objection within 14 days of
                delivery.
              </p>
              <p>
                Third-party software, frameworks, fonts, and libraries incorporated into deliverables
                remain subject to their respective licence terms, which are separate from this Agreement.
              </p>
            </Section>

            <Section title="8. Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, Draft-It's total aggregate liability
                to the Client under or in connection with this Agreement shall not exceed the total fees
                paid by the Client for the specific service giving rise to the claim.
              </p>
              <p>
                Draft-It shall not be liable for any indirect, consequential, special, or punitive
                damages, including but not limited to loss of revenue, loss of data, loss of business
                opportunity, or reputational damage, whether arising in contract, tort, or otherwise,
                even if Draft-It has been advised of the possibility of such damages.
              </p>
              <p>
                Draft-It expressly excludes liability for delays, errors, or failures caused by
                government systems, third-party platforms (including Paystack, Safaricom, or Google),
                or the Client's own acts or omissions.
              </p>
            </Section>

            <Section title="9. Cookies and Third-Party Tools">
              <p>
                This website uses cookies and third-party tools to enhance your browsing experience,
                enable secure payments, and protect your privacy. We do not use advertising cookies
                or behavioural tracking scripts. By accepting our cookie notice, you consent to the
                use of these functional cookies. You may withdraw consent at any time by clearing your
                browser cookies and local storage. See our{' '}
                <a href="/privacy" className="text-emerald-600 underline">Privacy Notice</a> for full details.
              </p>
            </Section>

            <Section title="10. Governing Law and Dispute Resolution">
              <p>
                This Agreement shall be governed by and construed in accordance with the laws of Kenya.
                Any dispute, controversy, or claim arising out of or in connection with this Agreement
                shall first be referred to Draft-It for informal resolution. If not resolved within
                14 days, the matter shall be subject to the exclusive jurisdiction of the competent
                courts of Kenya.
              </p>
              <p>
                International clients, including those located in the UAE, Gulf Cooperation Council
                (GCC) states, or any other jurisdiction, expressly agree that Kenyan law governs
                all transactions and disputes with Draft-It, and waive any objection to Kenyan
                jurisdiction on grounds of inconvenience or otherwise.
              </p>
            </Section>

            <Section title="11. Amendments">
              <p>
                Draft-It reserves the right to amend this Agreement at any time. The version published
                on this page at the date of your order shall be the version that governs your transaction.
                Continued use of the website or services after any amendment constitutes acceptance of
                the revised terms.
              </p>
            </Section>

            <Section title="12. Contact">
              <p>
                For any questions, disputes, or notices under this Agreement, contact Draft-It at:
              </p>
              <ul className="list-none space-y-1">
                <li><strong className="text-slate-800">Email:</strong>{' '}
                  <a href="mailto:help@draftit.co.ke" className="text-emerald-600 underline">help@draftit.co.ke</a>
                </li>
                <li><strong className="text-slate-800">WhatsApp:</strong> +254 726 899 113</li>
                <li><strong className="text-slate-800">Location:</strong> Nairobi, Kenya</li>
              </ul>
            </Section>

          </div>
        </div>{/* end policy-content */}
      </section>
    </div>
  )
}
