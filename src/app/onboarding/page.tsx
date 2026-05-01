"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function OnboardingPage() {
  const [loading, setLoading] = useState(true);
  const [trialEnds, setTrialEnds] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      await fetch("/api/onboarding/init", { method: "POST" });

      const { data: profile } = await supabase
        .from("profiles")
        .select("trial_ends_at")
        .eq("user_id", user.id)
        .single();

      if (profile?.trial_ends_at) {
        const d = new Date(profile.trial_ends_at);
        setTrialEnds(d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
      }

      setLoading(false);
    }
    init();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Setting up your account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <Image src="/logo.svg" alt="ClientAutomate" width={160} height={36} />
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm max-w-lg w-full p-10">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Your free trial has started!
            </h1>
            {trialEnds && (
              <p className="text-sm text-gray-500">
                You have full access until <strong className="text-gray-900">{trialEnds}</strong>. No credit card needed.
              </p>
            )}
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-4 mb-10">
            {/* Step 1 - done */}
            <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Account created</p>
                <p className="text-xs text-gray-500">You're in — 14-day free trial active</p>
              </div>
            </div>

            {/* Step 2 - active */}
            <div className="flex items-center gap-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-xl">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Connect Google Business Profile</p>
                <p className="text-xs text-gray-500">So we can fetch your reviews and post responses</p>
              </div>
            </div>

            {/* Step 3 - pending */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl opacity-60">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Start managing your reviews</p>
                <p className="text-xs text-gray-500">AI-generated responses, ready to approve</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="/api/google/connect"
            className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Connect Google Business Profile
          </a>
          <p className="text-center text-xs text-gray-400 mt-3">
            Takes 2 minutes · Secure OAuth2 · We never post without your approval
          </p>
        </div>
      </main>
    </div>
  );
}
