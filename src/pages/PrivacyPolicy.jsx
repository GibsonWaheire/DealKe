// src/pages/PrivacyPolicy.jsx
import PageHeader from '../components/PageHeader'

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      <PageHeader
        label="Legal"
        title="Privacy Policy"
        subtitle="Last updated: 16 March 2026"
      />

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-sm text-slate-600 space-y-8">

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">1. Who we are</h2>
            <p>
              DealKe is a sole-proprietor digital services business based in Nairobi, Kenya.
              We provide website development, KRA services, eCitizen services, and related digital
              assistance. Contact: <a href="mailto:hello@dealke.co.ke" className="text-emerald-600 underline">hello@dealke.co.ke</a> · +254 726 899 113.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">2. Information we collect</h2>
            <p>We only collect information you give us directly, including:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your name, email address, and phone number when you contact us or fill in our quote form.</li>
              <li>Service-specific details you share via WhatsApp (e.g., ID number for KRA PIN registration).</li>
              <li>Payment confirmation details (M-Pesa transaction reference) where applicable.</li>
            </ul>
            <p className="mt-3">We do not use cookies, analytics trackers, or third-party advertising scripts on this website.</p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">3. How we use your information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To process and deliver the service you requested.</li>
              <li>To communicate with you about your order or enquiry.</li>
              <li>To send an invoice or payment confirmation.</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or share your personal information with third parties, except where required to complete a service on your behalf (e.g., submitting your details to KRA iTax).</p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">4. Data retention</h2>
            <p>
              We retain your contact and order details for a minimum of 12 months for record-keeping
              purposes. Service-specific documents (e.g., KRA certificates) are deleted from our
              devices once delivered to you. You may request deletion of your data at any time by
              emailing <a href="mailto:hello@dealke.co.ke" className="text-emerald-600 underline">hello@dealke.co.ke</a>.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">5. Security</h2>
            <p>
              We take reasonable precautions to protect your information. Communication through
              WhatsApp is end-to-end encrypted. We do not store payment card details at any time —
              all payments are made through M-Pesa.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">6. Your rights</h2>
            <p>
              You have the right to access, correct, or request deletion of any personal data we
              hold about you. To exercise any of these rights, contact us at{' '}
              <a href="mailto:hello@dealke.co.ke" className="text-emerald-600 underline">hello@dealke.co.ke</a>.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-bold text-lg mb-3">7. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The current version will always be
              available on this page with the date of last update.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
