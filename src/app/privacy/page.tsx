import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — ClientAutomate",
  description: "Privacy Policy for ClientAutomate Ltd, compliant with UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <nav className="border-b border-gray-100 px-8 py-4 grid grid-cols-3 items-center">
        <div />
        <div className="flex justify-center">
          <Link href="/">
            <Image src="/logo.svg" alt="ClientAutomate" width={280} height={63} priority />
          </Link>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900">Sign in</Link>
          <Link href="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Start free trial
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: 1 May 2026 &nbsp;·&nbsp; Effective: 1 May 2026</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction and Identity of the Data Controller</h2>
            <p>
              This Privacy Policy sets out how <strong>ClientAutomate Ltd</strong> ("<strong>we</strong>", "<strong>us</strong>", "<strong>our</strong>") collects, uses, stores and protects personal data in connection with the provision of our software-as-a-service platform available at <strong>clientautomate.co.uk</strong> (the "<strong>Service</strong>").
            </p>
            <p className="mt-3">
              ClientAutomate Ltd is the <strong>Data Controller</strong> for the purposes of the UK General Data Protection Regulation ("<strong>UK GDPR</strong>") and the Data Protection Act 2018. We are in the process of registering with the Information Commissioner's Office ("<strong>ICO</strong>") as required under UK data protection law. Our ICO registration number will be published on this page upon completion of registration.
            </p>
            <p className="mt-3">
              Any questions regarding this Policy or our data processing activities should be directed to:{" "}
              <a href="mailto:privacy@clientautomate.co.uk" className="text-blue-600 hover:underline">
                privacy@clientautomate.co.uk
              </a>
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Scope of This Policy</h2>
            <p>
              This Policy applies to all individuals who access or use our Service, including business owners, authorised users, and visitors to our website. It does not apply to third-party websites or services linked from our platform, which are governed by their own privacy policies.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Personal Data We Collect</h2>
            <p>We collect and process the following categories of personal data:</p>

            <div className="mt-4 space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Account and Identity Data</p>
                <p className="text-sm">Email address, password (stored in hashed form), and account registration date. Collected when you create an account.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Google Business Profile Data</p>
                <p className="text-sm">OAuth2 access tokens, refresh tokens, Google account identifiers, and business location identifiers. Collected when you connect your Google Business Profile to the Service.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Review and Response Data</p>
                <p className="text-sm">Google reviews associated with your business, including reviewer names, ratings, review text, and review dates. AI-generated response drafts created by the Service. This data is fetched directly from Google's Business Profile API on your behalf.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Billing and Subscription Data</p>
                <p className="text-sm">Subscription plan, billing status, trial expiry date, and Stripe customer identifier. Full payment card details are processed exclusively by Stripe and are never stored on our systems.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Technical and Usage Data</p>
                <p className="text-sm">IP address, browser type, device information, pages visited, and timestamps of actions taken within the Service. Collected automatically via server logs and session management.</p>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Legal Basis for Processing</h2>
            <p>We process your personal data on the following legal bases under UK GDPR Article 6:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
              <li><strong>Performance of a Contract (Art. 6(1)(b)):</strong> Processing necessary to provide the Service you have subscribed to, including fetching reviews, generating AI responses, and managing your account.</li>
              <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> Processing necessary for fraud prevention, service security, product improvement, and the sending of service-related communications.</li>
              <li><strong>Legal Obligation (Art. 6(1)(c)):</strong> Processing required to comply with applicable laws, including financial record-keeping obligations.</li>
              <li><strong>Consent (Art. 6(1)(a)):</strong> Where we rely on your consent, for example for optional marketing communications. You may withdraw consent at any time.</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. How We Use Your Personal Data</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
              <li>To create and manage your account and subscription</li>
              <li>To connect to your Google Business Profile and retrieve your reviews on your behalf</li>
              <li>To generate AI-powered response drafts using your review content</li>
              <li>To publish approved responses to Google on your behalf</li>
              <li>To send weekly summary reports and service notifications by email</li>
              <li>To process payments and manage billing through Stripe</li>
              <li>To provide customer support</li>
              <li>To detect and prevent fraudulent or unauthorised use of the Service</li>
              <li>To comply with legal and regulatory obligations</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Third-Party Data Processors</h2>
            <p>
              We engage the following third-party processors who may process your personal data on our behalf. Each processor is bound by appropriate data processing agreements and provides adequate safeguards for your data:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">Processor</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 font-medium">Supabase</td><td className="px-4 py-3 text-gray-500">Database hosting and user authentication</td><td className="px-4 py-3 text-gray-500">EU / USA</td></tr>
                  <tr><td className="px-4 py-3 font-medium">Vercel</td><td className="px-4 py-3 text-gray-500">Application hosting and deployment</td><td className="px-4 py-3 text-gray-500">USA</td></tr>
                  <tr><td className="px-4 py-3 font-medium">Stripe</td><td className="px-4 py-3 text-gray-500">Payment processing and subscription management</td><td className="px-4 py-3 text-gray-500">USA</td></tr>
                  <tr><td className="px-4 py-3 font-medium">Anthropic</td><td className="px-4 py-3 text-gray-500">AI generation of review responses via Claude API</td><td className="px-4 py-3 text-gray-500">USA</td></tr>
                  <tr><td className="px-4 py-3 font-medium">Google LLC</td><td className="px-4 py-3 text-gray-500">Google Business Profile API — review retrieval and response publishing</td><td className="px-4 py-3 text-gray-500">USA</td></tr>
                  <tr><td className="px-4 py-3 font-medium">Resend</td><td className="px-4 py-3 text-gray-500">Transactional email delivery</td><td className="px-4 py-3 text-gray-500">USA</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Where data is transferred outside the United Kingdom, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) or adequacy decisions, as required under UK GDPR Chapter V.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Data Retention</h2>
            <p>We retain your personal data only for as long as necessary for the purposes for which it was collected:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
              <li><strong>Account data:</strong> Retained for the duration of your subscription and deleted within 30 days of account closure upon request.</li>
              <li><strong>Review and response data:</strong> Retained for the duration of your subscription to provide the Service.</li>
              <li><strong>Billing records:</strong> Retained for 7 years in accordance with HMRC financial record-keeping requirements.</li>
              <li><strong>Google OAuth tokens:</strong> Deleted immediately upon disconnection of your Google Business Profile or account closure.</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Your Rights Under UK GDPR</h2>
            <p>As a data subject, you have the following rights. To exercise any of these rights, please contact us at{" "}
              <a href="mailto:privacy@clientautomate.co.uk" className="text-blue-600 hover:underline">privacy@clientautomate.co.uk</a>.
              We will respond within <strong>one calendar month</strong> as required by law.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
              <li><strong>Right of Access (Art. 15):</strong> To receive a copy of the personal data we hold about you.</li>
              <li><strong>Right to Rectification (Art. 16):</strong> To correct inaccurate or incomplete personal data.</li>
              <li><strong>Right to Erasure (Art. 17):</strong> To request deletion of your personal data, subject to legal retention obligations.</li>
              <li><strong>Right to Restriction of Processing (Art. 18):</strong> To restrict how we process your data in certain circumstances.</li>
              <li><strong>Right to Data Portability (Art. 20):</strong> To receive your data in a structured, machine-readable format.</li>
              <li><strong>Right to Object (Art. 21):</strong> To object to processing based on legitimate interests.</li>
              <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time without affecting prior lawful processing.</li>
            </ul>
            <p className="mt-4 text-sm">
              You also have the right to lodge a complaint with the <strong>Information Commissioner's Office (ICO)</strong> at{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ico.org.uk</a>{" "}
              or by telephone on 0303 123 1113.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Cookies and Tracking Technologies</h2>
            <p>
              We use essential session cookies to maintain your authenticated session and to ensure the secure operation of the Service. These cookies are strictly necessary and do not require your consent under UK PECR.
            </p>
            <p className="mt-3">
              We do not currently use advertising, tracking, or profiling cookies. Should we introduce non-essential cookies in the future, we will update this Policy and implement appropriate consent mechanisms.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, accidental loss, destruction, or disclosure. These measures include:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
              <li>All data transmitted between your browser and our servers is encrypted using TLS (HTTPS)</li>
              <li>Passwords are stored using industry-standard hashing algorithms via Supabase Auth</li>
              <li>API keys and secrets are stored exclusively as environment variables, never in source code</li>
              <li>Access to production databases is restricted to authorised personnel only</li>
              <li>Google OAuth tokens are stored encrypted and scoped to minimum necessary permissions</li>
            </ul>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. Where changes are material, we will notify you by email at least 14 days before the changes take effect. Continued use of the Service following notification constitutes acceptance of the revised Policy.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Contact</h2>
            <p>All data protection enquiries should be addressed to:</p>
            <div className="mt-3 bg-gray-50 rounded-xl p-5 border border-gray-200 text-sm space-y-1">
              <p className="font-semibold text-gray-900">ClientAutomate Ltd</p>
              <p className="text-gray-500">Data Protection Enquiries</p>
              <p><a href="mailto:privacy@clientautomate.co.uk" className="text-blue-600 hover:underline">privacy@clientautomate.co.uk</a></p>
              <p className="text-gray-500">United Kingdom</p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 mt-10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© 2026 ClientAutomate Ltd</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-700 font-medium text-gray-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-700">Terms of Service</Link>
            <Link href="/" className="hover:text-gray-700">Home</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
