import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/">
            <Image src="/logo.svg" alt="ClientAutomate" width={280} height={63} priority />
          </a>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900 hidden sm:block">
              Pricing
            </Link>
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900">
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          Early Bird — only 20 spots at £39/month
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight mb-6">
          Reply to every Google review.{" "}
          <span className="text-blue-600">Automatically.</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          ClientAutomate reads your Google reviews and writes professional responses in seconds —
          in British English, tailored to each customer. You approve. It sends.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
          >
            Start 14-day free trial
          </Link>
          <Link
            href="/pricing"
            className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-50 transition-colors"
          >
            See pricing →
          </Link>
        </div>
        <p className="text-sm text-gray-400">No credit card required · Cancel anytime</p>
      </section>

      {/* STATS BAR */}
      <section className="bg-gray-50 border-y border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-gray-900">88%</p>
            <p className="text-gray-500 mt-1 text-sm">of customers choose businesses that reply to reviews</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">35%</p>
            <p className="text-gray-500 mt-1 text-sm">average increase in Google Maps clicks</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">5–8h</p>
            <p className="text-gray-500 mt-1 text-sm">saved per month on review management</p>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Most businesses ignore their reviews.<br />
          <span className="text-red-500">That's costing them customers.</span>
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          When a potential customer searches for a restaurant or pub, the first thing they check
          is Google reviews. If you're not responding, you look inactive — even if your food is great.
          Competitors who reply consistently rank higher and win more bookings.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">How it works</h2>
          <p className="text-gray-500 text-center mb-14 text-lg">Set up in under 5 minutes</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-5">1</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Connect Google</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sign in with your Google account and connect your Business Profile. Takes 2 minutes — no technical knowledge needed.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-5">2</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">AI writes the replies</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our AI reads every new review and drafts a professional response in British English — warm for positive, empathetic for negative.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-5">3</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">You approve &amp; send</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Review the draft in your dashboard. Happy with it? Click Approve. It posts directly to Google — nothing leaves without your say.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Everything you need</h2>
        <p className="text-gray-500 text-center mb-14 text-lg">Built for UK restaurants, pubs and cafés</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🤖",
              title: "AI-powered responses",
              desc: "Powered by Claude AI — the same technology trusted by leading UK enterprises. Responses sound human, not robotic.",
            },
            {
              icon: "🇬🇧",
              title: "British English, always",
              desc: "No American spelling, no generic templates. Every response is written in proper UK English with the right tone for your business.",
            },
            {
              icon: "⚡",
              title: "New reviews every morning",
              desc: "We check your Google Business Profile daily at 8am. New reviews are waiting in your dashboard before you open.",
            },
            {
              icon: "👁️",
              title: "You stay in control",
              desc: "Nothing is posted automatically. Every response goes through your approval first — you can edit before sending.",
            },
            {
              icon: "📊",
              title: "Weekly email report",
              desc: "Get a summary every week: new reviews, star rating trend, response rate. Know your reputation at a glance.",
            },
            {
              icon: "📍",
              title: "Multiple locations",
              desc: "Own more than one venue? Manage all your Google Business Profiles from one dashboard. Growth and Agency plans supported.",
            },
          ].map((f) => (
            <div key={f.title} className="border border-gray-200 rounded-2xl p-7 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-amber-400 text-amber-900 text-sm font-bold px-4 py-1.5 rounded-full mb-8">
            LIMITED — 20 spots only
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Early Bird: £39/month — locked in for life
          </h2>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
            Be one of our first 20 customers and get the Starter plan at half price — forever,
            as long as your subscription stays active.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Claim Early Bird — free for 14 days
            </Link>
            <Link
              href="/pricing"
              className="text-blue-200 hover:text-white text-sm underline underline-offset-4"
            >
              See all plans
            </Link>
          </div>
          <p className="text-blue-300 text-sm mt-5">No credit card · Cancel anytime</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Common questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "Does it post replies without me seeing them?",
              a: "Never. Every AI-generated response sits in your dashboard waiting for your approval. You can read it, edit it, and only then send it. Nothing goes live without your click.",
            },
            {
              q: "Do I need technical knowledge to set it up?",
              a: "No. You sign in with your existing Google account, connect your Business Profile, and you're done. The whole setup takes under 5 minutes.",
            },
            {
              q: "What if I have more than one restaurant?",
              a: "Our Growth plan covers up to 3 locations and Agency covers up to 10 — all managed from one dashboard.",
            },
            {
              q: "Is there a free trial?",
              a: "Yes — every plan comes with a 14-day free trial. No credit card required. You won't be charged until the trial ends and you choose to continue.",
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gray-50 border-t border-gray-100 py-20 text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to stop ignoring your reviews?
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          Start your free 14-day trial today. No credit card. No commitment.
        </p>
        <Link
          href="/register"
          className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
        >
          Get started for free
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="ClientAutomate" width={210} height={49} />
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/pricing" className="hover:text-gray-700">Pricing</Link>
            <Link href="/login" className="hover:text-gray-700">Sign in</Link>
            <a href="mailto:hello@clientautomate.co.uk" className="hover:text-gray-700">hello@clientautomate.co.uk</a>
          </div>
          <p className="text-sm text-gray-400">© 2026 ClientAutomate Ltd</p>
        </div>
      </footer>

    </div>
  );
}
