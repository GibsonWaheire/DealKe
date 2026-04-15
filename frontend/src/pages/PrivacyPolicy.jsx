// src/pages/PrivacyPolicy.jsx
import PageHeader from '../components/PageHeader'
import DownloadPolicyButton from '../components/DownloadPolicyButton'

const Section = ({ title, children }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
    <h2 className="text-slate-900 font-bold text-base">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
  </div>
)

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50">
      <PageHeader
        label="Legal"
        title="Privacy Notice"
        subtitle="Last updated: 15 April 2026"
        images={[{ src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80', alt: 'Documents' }]}
      />

      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 policy-content">

          {/* Print header */}
          <div className="hidden page-header-print">
            <h1 className="text-2xl font-bold">Draft-It — Privacy Notice</h1>
            <p className="text-sm text-slate-500">Last updated: 15 April 2026 · help@draftit.co.ke · +254 726 899 113</p>
          </div>

          <div className="flex items-center justify-between mb-6 no-print">
            <p className="text-xs text-slate-400">Effective: 15 April 2026</p>
            <DownloadPolicyButton label="Download Privacy Notice" />
          </div>

          {/* Intro box */}
          <div className="bg-slate-900 text-white rounded-xl p-6 mb-6 text-sm leading-relaxed">
            This Privacy Notice ("Notice") explains how Draft-It ("Company", "we", "us", "our")
            collects, uses, stores, and protects personal data belonging to individuals ("you",
            "your") who interact with our website at draftit.co.ke or engage our services. This
            Notice is issued in accordance with the Kenya Data Protection Act, 2019 and applicable
            international data protection principles. By using our website or services, you
            acknowledge that you have read and understood this Notice.
          </div>

          <div className="space-y-4">

            <Section title="1. Data Controller">
              <p>
                The data controller responsible for your personal information is Draft-It, a
                sole-proprietorship digital services business based in Nairobi, Kenya.
              </p>
              <ul className="list-none space-y-1">
                <li><strong className="text-slate-800">Email:</strong>{' '}
                  <a href="mailto:help@draftit.co.ke" className="text-emerald-600 underline">help@draftit.co.ke</a>
                </li>
                <li><strong className="text-slate-800">WhatsApp:</strong> +254 726 899 113</li>
                <li><strong className="text-slate-800">Location:</strong> Nairobi, Kenya</li>
              </ul>
            </Section>

            <Section title="2. Personal Data We Collect">
              <p>
                We collect only the personal data that is strictly necessary for the delivery of
                our services. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-slate-800">Identity data:</strong> Full name, as provided
                  when placing an order or making a payment.
                </li>
                <li>
                  <strong className="text-slate-800">Contact data:</strong> Email address and phone
                  number, used to communicate about your order and send confirmations.
                </li>
                <li>
                  <strong className="text-slate-800">Service-specific data:</strong> Information you
                  provide to enable us to perform the service (e.g., ID number for KRA PIN registration,
                  business name for registration services). Such data is shared only with the relevant
                  government or regulatory portal on your behalf.
                </li>
                <li>
                  <strong className="text-slate-800">Payment data:</strong> We do not store your card
                  number or M-Pesa PIN. Payment transactions are processed by Paystack (PCI-DSS Level 1
                  certified) and Safaricom. We retain only the transaction reference number, payment
                  method type, and KES amount for record-keeping and refund purposes.
                </li>
                <li>
                  <strong className="text-slate-800">Currency data (international clients):</strong> For
                  clients paying in a foreign currency (e.g., AED), we record the original currency,
                  the amount entered, and the KES equivalent at the time of transaction, solely for
                  refund calculation purposes.
                </li>
              </ul>
            </Section>

            <Section title="3. Cookies and Tracking">
              <p>
                We use a minimal number of cookies on this website:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-slate-800">Functional cookies (Paystack):</strong> Our
                  payment provider, Paystack, may set cookies required for secure payment processing
                  and fraud prevention. These are strictly necessary and cannot be disabled without
                  disabling the payment feature.
                </li>
                <li>
                  <strong className="text-slate-800">Consent cookie:</strong> We store your cookie
                  consent preference in your browser's local storage so we do not ask again on
                  subsequent visits.
                </li>
              </ul>
              <p>
                We do not use advertising cookies, social media tracking pixels, Google Analytics,
                or any third-party behavioural tracking scripts. You may withdraw your cookie consent
                at any time by clearing your browser's cookies and local storage.
              </p>
            </Section>

            <Section title="4. Legal Basis and Purpose of Processing">
              <p>We process your personal data on the following legal bases:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-slate-800">Performance of a contract:</strong> To process
                  your order, deliver the agreed service, and communicate with you about your project.
                </li>
                <li>
                  <strong className="text-slate-800">Legal obligation:</strong> To retain transaction
                  records as required by Kenyan tax and financial regulations.
                </li>
                <li>
                  <strong className="text-slate-800">Legitimate interests:</strong> To maintain records
                  sufficient to process refunds and resolve disputes fairly.
                </li>
              </ul>
              <p>
                We do not sell, rent, licence, or otherwise transfer your personal data to third
                parties for marketing or commercial purposes.
              </p>
            </Section>

            <Section title="5. Data Sharing">
              <p>
                Your personal data is shared only in the following limited circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-slate-800">Government portals:</strong> Where your service
                  requires submission to a government agency (e.g., KRA iTax, eCitizen, NTSA), only
                  the data necessary for that submission is provided.
                </li>
                <li>
                  <strong className="text-slate-800">Payment processors:</strong> Paystack and
                  Safaricom receive the data required to process your payment. Both operate under
                  their own privacy policies and applicable regulatory frameworks.
                </li>
              </ul>
              <p>
                We do not transfer personal data outside of Kenya except where required by the
                nature of the service (e.g., Paystack's infrastructure). Where such transfers occur,
                we rely on the processor's own compliance with applicable data protection standards.
              </p>
            </Section>

            <Section title="6. Data Retention">
              <p>
                We retain personal data for no longer than is necessary for the purpose for which
                it was collected:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-slate-800">Order and contact records:</strong> Retained for
                  a minimum of 12 months from the date of service delivery, and for as long as required
                  for legal or regulatory compliance.
                </li>
                <li>
                  <strong className="text-slate-800">Service documents:</strong> (e.g., KRA certificates,
                  contracts) are deleted from our devices once delivered to you.
                </li>
                <li>
                  <strong className="text-slate-800">Payment references:</strong> Retained for up to
                  5 years for financial record-keeping purposes.
                </li>
              </ul>
            </Section>

            <Section title="7. Security">
              <p>
                Draft-It implements reasonable technical and organisational measures to protect your
                personal data against unauthorised access, loss, or disclosure. Specific safeguards include:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>WhatsApp communication is end-to-end encrypted by default.</li>
                <li>We do not store full card numbers or M-Pesa PINs at any time.</li>
                <li>Paystack is PCI-DSS Level 1 certified, the highest standard for payment data security.</li>
                <li>Access to client records is restricted to authorised personnel only.</li>
              </ul>
              <p>
                No method of data transmission or storage is completely secure. While we strive to
                protect your data, we cannot guarantee absolute security and disclaim liability for
                any unauthorised access beyond our reasonable control.
              </p>
            </Section>

            <Section title="8. Your Rights">
              <p>
                Under the Kenya Data Protection Act, 2019, you have the following rights in relation
                to your personal data held by Draft-It:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-slate-800">Right of access:</strong> To request a copy of the data we hold about you.</li>
                <li><strong className="text-slate-800">Right to rectification:</strong> To request correction of inaccurate or incomplete data.</li>
                <li><strong className="text-slate-800">Right to erasure:</strong> To request deletion of your data, subject to our legal retention obligations.</li>
                <li><strong className="text-slate-800">Right to object:</strong> To object to processing carried out on the basis of legitimate interests.</li>
              </ul>
              <p>
                To exercise any of the above rights, submit a written request to{' '}
                <a href="mailto:help@draftit.co.ke" className="text-emerald-600 underline">help@draftit.co.ke</a>.
                We will respond within 14 calendar days. We may require you to verify your identity
                before processing your request.
              </p>
            </Section>

            <Section title="9. Changes to This Notice">
              <p>
                Draft-It reserves the right to amend this Privacy Notice at any time. Any material
                changes will be reflected on this page with an updated effective date. We encourage
                you to review this Notice periodically. Your continued use of our website or services
                after any amendment constitutes acceptance of the updated Notice.
              </p>
            </Section>

          </div>
        </div>{/* end policy-content */}
      </section>
    </div>
  )
}
