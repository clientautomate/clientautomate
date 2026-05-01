import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service — ClientAutomate",
  description: "Terms of Service for ClientAutomate Ltd.",
};

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-sm text-gray-400">Last updated: 1 May 2026 &nbsp;·&nbsp; Effective: 1 May 2026</p>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Parties and Agreement</h2>
            <p>
              These Terms of Service ("<strong>Terms</strong>") constitute a legally binding agreement between <strong>ClientAutomate Ltd</strong> ("<strong>we</strong>", "<strong>us</strong>", "<strong>our</strong>", the "<strong>Company</strong>") and the individual or legal entity registering for or using the Service ("<strong>you</strong>", "<strong>your</strong>", the "<strong>Customer</strong>").
            </p>
            <p className="mt-3">
              By creating an account, accessing, or using the Service, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not use the Service.
            </p>
            <p className="mt-3">
              Where you are registering on behalf of a business, you warrant that you have authority to bind that business to these Terms.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of the Service</h2>
            <p>
              ClientAutomate is a software-as-a-service platform that connects to your Google Business Profile via Google's official API, retrieves customer reviews, generates AI-powered response drafts using large language model technology, and — upon your explicit approval — publishes those responses to your Google Business Profile on your behalf.
            </p>
            <p className="mt-3">
              The Service is intended for use by business owners and authorised representatives operating in the United Kingdom. Use of the Service is subject to your compliance with Google's Terms of Service and Google Business Profile policies.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Free Trial</h2>
            <p>
              We offer a <strong>14-day free trial</strong> to new Customers. The trial commences on the date you create your account and connect your Google Business Profile. No payment card is required to commence the trial.
            </p>
            <p className="mt-3">
              At the end of the trial period, your access will be paused unless you have selected and activated a paid subscription plan. You will not be charged automatically at the conclusion of the trial. No charges will be applied without your explicit consent.
            </p>
            <p className="mt-3">
              We reserve the right to modify trial terms, including duration, for future registrations at our sole discretion.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Subscription Plans and Pricing</h2>
            <p>
              Following the free trial, continued access to the Service requires a paid subscription. Current plans and pricing are set out on our{" "}
              <Link href="/pricing" className="text-blue-600 hover:underline">Pricing page</Link>.
            </p>
            <p className="mt-3">
              Subscriptions are billed on a recurring monthly or annual basis as selected by you. All prices are stated in <strong>Pounds Sterling (GBP)</strong> and are inclusive of any applicable VAT unless otherwise stated.
            </p>
            <p className="mt-3">
              <strong>Early Bird pricing:</strong> Where a Customer subscribes under a promotional Early Bird rate, that rate is locked in for the lifetime of their continuous subscription. The Early Bird rate is forfeited if the subscription is cancelled and later reactivated, or if payment fails and is not remedied within the grace period.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Payment Terms</h2>
            <p>
              Payment is processed by <strong>Stripe</strong>, our third-party payment processor. By providing payment details, you authorise Stripe to charge your nominated payment method on a recurring basis in accordance with your chosen subscription plan.
            </p>
            <p className="mt-3">
              In the event of a failed payment, we will notify you by email. You will have a <strong>7-day grace period</strong> to update your payment details. If payment is not received within this period, your account will be suspended. Access will be restored upon successful payment.
            </p>
            <p className="mt-3">
              All sales are final. We do not offer refunds for partial subscription periods except where required by applicable consumer protection law or at our sole discretion.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cancellation</h2>
            <p>
              You may cancel your subscription at any time via your account settings or by contacting us at{" "}
              <a href="mailto:hello@clientautomate.co.uk" className="text-blue-600 hover:underline">hello@clientautomate.co.uk</a>.
            </p>
            <p className="mt-3">
              Cancellation takes effect at the end of the current billing period. You will retain full access to the Service until that date. We do not provide pro-rata refunds for unused portions of a billing period.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Acceptable Use</h2>
            <p>You agree that you will not use the Service to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
              <li>Publish false, misleading, defamatory, or fraudulent review responses</li>
              <li>Violate Google's Terms of Service, Business Profile policies, or any applicable law</li>
              <li>Attempt to gain unauthorised access to any system, account, or data</li>
              <li>Reverse engineer, decompile, or attempt to extract the source code of the Service</li>
              <li>Use the Service to process data on behalf of third parties without their consent</li>
              <li>Resell, sublicense, or white-label the Service without our express written permission</li>
            </ul>
            <p className="mt-3">
              We reserve the right to suspend or terminate accounts found to be in breach of this clause without notice.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. AI-Generated Content and Your Responsibility</h2>
            <p>
              The Service uses artificial intelligence to generate draft review responses. You acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
              <li>All AI-generated responses are <strong>drafts only</strong> and require your explicit approval before publication</li>
              <li>You are solely responsible for the content of any response you approve and publish to Google</li>
              <li>We do not warrant that AI-generated responses will be accurate, appropriate, or suitable for your business in every instance</li>
              <li>You must review each response before approving it and ensure it complies with applicable laws and Google's policies</li>
            </ul>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Intellectual Property</h2>
            <p>
              All intellectual property rights in the Service, including its software, design, and documentation, are owned by ClientAutomate Ltd or our licensors. Nothing in these Terms transfers any ownership of such rights to you.
            </p>
            <p className="mt-3">
              We grant you a limited, non-exclusive, non-transferable licence to access and use the Service during your subscription period, solely for your internal business purposes.
            </p>
            <p className="mt-3">
              You retain all ownership of your business data, review content, and Google Business Profile. By using the Service, you grant us a limited licence to process that data solely for the purpose of delivering the Service to you.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Service Availability and Modifications</h2>
            <p>
              We endeavour to maintain high availability of the Service but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.
            </p>
            <p className="mt-3">
              We reserve the right to modify, suspend, or discontinue any feature of the Service at any time. Where modifications materially affect the Service, we will provide at least <strong>30 days' notice</strong> by email. Your continued use following that notice constitutes acceptance of the changes.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
              <li>The Service is provided <strong>"as is"</strong> without warranties of any kind, whether express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement</li>
              <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or business opportunities</li>
              <li>Our total aggregate liability to you under these Terms shall not exceed the <strong>total fees paid by you in the 3 months preceding the claim</strong></li>
            </ul>
            <p className="mt-3 text-sm">
              Nothing in these Terms limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded under English law.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless ClientAutomate Ltd, its directors, employees, and agents from and against any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from your use of the Service, your breach of these Terms, or your violation of any third-party rights, including Google's Terms of Service.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">13. Data Protection</h2>
            <p>
              Our collection and use of personal data in connection with the Service is governed by our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>, which forms part of these Terms. By using the Service, you confirm that you have read and understood our Privacy Policy.
            </p>
            <p className="mt-3">
              Where you provide us with personal data relating to your customers (including reviewer names and review content), you warrant that you have a lawful basis to share such data with us for the purposes of providing the Service.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">14. Termination</h2>
            <p>
              Either party may terminate this agreement at any time. You may terminate by cancelling your subscription as described in clause 6. We may terminate your account immediately upon written notice if you materially breach these Terms and, where the breach is capable of remedy, fail to remedy it within 14 days of notice.
            </p>
            <p className="mt-3">
              Upon termination, your access to the Service will cease and we will delete your data in accordance with our Privacy Policy, subject to legal retention obligations.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">15. Governing Law and Jurisdiction</h2>
            <p>
              These Terms and any dispute or claim arising out of or in connection with them (including non-contractual disputes) shall be governed by and construed in accordance with the <strong>laws of England and Wales</strong>.
            </p>
            <p className="mt-3">
              The parties irrevocably agree that the courts of <strong>England and Wales</strong> shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">16. General</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between the parties regarding the Service.</li>
              <li><strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.</li>
              <li><strong>Waiver:</strong> Our failure to enforce any provision of these Terms shall not constitute a waiver of our right to enforce it in the future.</li>
              <li><strong>Assignment:</strong> You may not assign your rights under these Terms without our prior written consent. We may assign our rights in connection with a merger, acquisition, or sale of assets.</li>
            </ul>
          </section>

          {/* 17 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">17. Contact</h2>
            <p>All legal enquiries and notices should be addressed to:</p>
            <div className="mt-3 bg-gray-50 rounded-xl p-5 border border-gray-200 text-sm space-y-1">
              <p className="font-semibold text-gray-900">ClientAutomate Ltd</p>
              <p className="text-gray-500">Legal Notices</p>
              <p><a href="mailto:hello@clientautomate.co.uk" className="text-blue-600 hover:underline">hello@clientautomate.co.uk</a></p>
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
            <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-700 font-medium text-gray-700">Terms of Service</Link>
            <Link href="/" className="hover:text-gray-700">Home</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
