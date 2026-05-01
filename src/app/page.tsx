import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <span className="text-xl font-bold text-gray-900">ClientAutomate</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
            Sign in
          </Link>
          <Link
            href="/register"
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start free trial
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center flex-1 px-8 py-24 text-center">
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-6">
          AI-powered review management for UK businesses
        </span>
        <h1 className="text-5xl font-bold text-gray-900 max-w-2xl leading-tight mb-6">
          More customers.<br />Less admin.<br />
          <span className="text-blue-600">Powered by AI.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mb-10">
          88% of customers choose businesses that respond to reviews. ClientAutomate replies to your Google reviews automatically — in seconds, not hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start 14-day free trial
          </Link>
          <Link
            href="/login"
            className="border border-gray-200 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Sign in
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">No credit card required</p>
      </main>

      {/* Stats */}
      <section className="border-t border-gray-100 py-16 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-gray-900">88%</p>
            <p className="text-gray-500 mt-1">of customers pick businesses that respond to reviews</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">35%</p>
            <p className="text-gray-500 mt-1">average increase in Google Maps clicks</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">5-8h</p>
            <p className="text-gray-500 mt-1">saved per month on review management</p>
          </div>
        </div>
      </section>
    </div>
  );
}
