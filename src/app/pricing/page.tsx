"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const plans = [
  {
    id: "early_bird",
    name: "Early Bird",
    badge: "LIMITED",
    badgeColor: "bg-amber-500",
    monthly: 39,
    yearly: null,
    locations: "1 location",
    locationDesc: "1 physical address on Google Maps",
    example: "Perfect if you run one pub, restaurant or café.",
    highlight: false,
    features: [
      "1 Google Business location",
      "Unlimited AI-generated responses",
      "Review dashboard",
      "Weekly email report",
      "14-day free trial",
    ],
    cta: "Claim Early Bird deal",
    note: "Only 20 spots available",
  },
  {
    id: "starter",
    name: "Starter",
    badge: null,
    monthly: 79,
    yearly: 790,
    locations: "1 location",
    locationDesc: "1 physical address on Google Maps",
    example: "Perfect if you run one pub, restaurant or café.",
    highlight: false,
    features: [
      "1 Google Business location",
      "Unlimited AI-generated responses",
      "Review dashboard",
      "Weekly email report",
      "14-day free trial",
    ],
    cta: "Start free trial",
    note: null,
  },
  {
    id: "growth",
    name: "Growth",
    badge: "MOST POPULAR",
    badgeColor: "bg-blue-600",
    monthly: 149,
    yearly: 1490,
    locations: "Up to 3 locations",
    locationDesc: "Up to 3 physical addresses on Google Maps",
    example: "Ideal if you own 2–3 restaurants or manage multiple venues.",
    highlight: true,
    features: [
      "Up to 3 Google Business locations",
      "Unlimited AI-generated responses",
      "Review dashboard",
      "Weekly email report",
      "Priority support",
      "14-day free trial",
    ],
    cta: "Start free trial",
    note: null,
  },
  {
    id: "agency",
    name: "Agency",
    badge: null,
    monthly: 299,
    yearly: 2990,
    locations: "Up to 10 locations",
    locationDesc: "Up to 10 physical addresses on Google Maps",
    example: "Built for marketing agencies and large hospitality groups.",
    highlight: false,
    features: [
      "Up to 10 Google Business locations",
      "Unlimited AI-generated responses",
      "Review dashboard",
      "Weekly email report",
      "Priority support",
      "White-label reports",
      "Dedicated account manager",
      "14-day free trial",
    ],
    cta: "Start free trial",
    note: null,
  },
];

const faqs = [
  {
    q: "What counts as a location?",
    a: "A location is one physical address listed on Google Maps — for example, one pub, one restaurant, or one shop. If you have three different venues at three different addresses, that counts as three locations.",
  },
  {
    q: "Do I need a credit card for the free trial?",
    a: "No. Your 14-day free trial starts the moment you connect your Google Business Profile. We only ask for payment details when you decide to continue.",
  },
  {
    q: "What happens after the trial ends?",
    a: "If you choose a paid plan, you'll be charged on the day your trial ends. If you don't upgrade, your account is paused — no charges, no surprises.",
  },
  {
    q: "How does the annual discount work?",
    a: "Pay for 10 months upfront and get 12 months of access. That's 2 months completely free — saving you £158 on Starter and £298 on Growth.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "What is the Early Bird plan?",
    a: "Early Bird is a special offer for our first 20 customers — £39/month for a Starter plan, locked in for life as long as your subscription stays active. Once 20 spots are taken, this price is gone.",
  },
  {
    q: "How does the AI generate responses?",
    a: "Our AI reads each review and writes a professional response in British English — warm for positive reviews, empathetic for negative ones. You review every response before it goes live. Nothing is sent without your approval.",
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  async function subscribe(planId: string) {
    if (planId === "early_bird") {
      setLoading(planId);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "starter", earlyBird: true }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else if (res.status === 401) { router.push("/login"); }
      else { setLoading(null); }
      return;
    }

    setLoading(planId);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: planId, billing }),
    });
    const data = await res.json();
    if (data.url) { window.location.href = data.url; }
    else if (res.status === 401) { router.push("/login"); }
    else { setLoading(null); }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-8 py-4 grid grid-cols-3 items-center">
        <div />
        <div className="flex justify-center">
          <a href="/">
            <Image src="/logo.svg" alt="ClientAutomate" width={280} height={63} priority />
          </a>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <a href="/login" className="text-sm text-gray-500 hover:text-gray-900">Sign in</a>
          <a href="/register" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Start free trial
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple pricing for every business
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            14-day free trial on every plan. No credit card required. Cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-medium ${billing === "monthly" ? "text-gray-900" : "text-gray-400"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
              className={`relative flex items-center w-12 h-6 rounded-full transition-colors p-1 ${billing === "yearly" ? "bg-blue-600" : "bg-gray-200"}`}
            >
              <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${billing === "yearly" ? "translate-x-6" : "translate-x-0"}`} />
            </button>
            <span className={`text-sm font-medium ${billing === "yearly" ? "text-gray-900" : "text-gray-400"}`}>
              Yearly
              <span className="ml-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                2 months free
              </span>
            </span>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.highlight
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105"
                  : "bg-white border border-gray-200"
              }`}
            >
              {plan.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap`}>
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h2 className={`text-lg font-bold mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h2>
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    £{billing === "yearly" && plan.yearly
                      ? Math.round(plan.yearly / 10)
                      : plan.monthly}
                  </span>
                  <span className={`text-sm mb-1.5 ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>
                    /month
                  </span>
                </div>
                {billing === "yearly" && plan.yearly && (
                  <p className={`text-xs ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>
                    £{plan.yearly}/year — 2 months free
                  </p>
                )}
                {plan.id === "early_bird" && (
                  <p className="text-xs text-amber-600 font-medium mt-1">{plan.note}</p>
                )}
              </div>

              {/* Location info */}
              <div className={`rounded-xl p-3 mb-5 text-sm ${plan.highlight ? "bg-blue-500" : "bg-gray-50"}`}>
                <p className={`font-semibold mb-0.5 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.locations}
                </p>
                <p className={`text-xs ${plan.highlight ? "text-blue-200" : "text-gray-500"}`}>
                  {plan.locationDesc}
                </p>
                <p className={`text-xs mt-1.5 italic ${plan.highlight ? "text-blue-100" : "text-gray-400"}`}>
                  {plan.example}
                </p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlight ? "text-blue-100" : "text-gray-600"}`}>
                    <span className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "text-white" : "text-green-500"}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => subscribe(plan.id)}
                disabled={loading !== null}
                className={`w-full py-3 rounded-xl font-medium text-sm transition-colors disabled:opacity-50 ${
                  plan.highlight
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : plan.id === "early_bird"
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
              >
                {loading === plan.id ? "Redirecting..." : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* What is a location */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-20 flex flex-col md:flex-row gap-8 items-start">
          <div className="text-4xl">📍</div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">What counts as a location?</h3>
            <p className="text-gray-600 mb-3">
              A <strong>location</strong> is one physical address listed on Google Maps — one pub, one restaurant, one café.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-xl p-4 border border-blue-100">
                <p className="font-semibold text-gray-900 mb-1">1 location</p>
                <p className="text-gray-500">You own one pub on High Street → Starter or Early Bird</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-blue-100">
                <p className="font-semibold text-gray-900 mb-1">2–3 locations</p>
                <p className="text-gray-500">You own a café in town + a restaurant nearby → Growth</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-blue-100">
                <p className="font-semibold text-gray-900 mb-1">4–10 locations</p>
                <p className="text-gray-500">You manage a group of venues or client accounts → Agency</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  <span className={`ml-4 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-400 text-sm">
            Questions? Email us at{" "}
            <a href="mailto:hello@clientautomate.co.uk" className="text-blue-600 hover:underline">
              hello@clientautomate.co.uk
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
