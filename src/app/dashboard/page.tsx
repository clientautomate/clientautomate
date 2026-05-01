"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Review = {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  review_date: string;
  status: string;
  business_id: string;
};

type Response = {
  review_id: string;
  content: string;
};

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState<Record<string, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUserEmail(user.email ?? "");

      // Sprawdź subskrypcję — przekieruj na pricing jeśli brak aktywnej
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_status, trial_ends_at")
        .eq("user_id", user.id)
        .single();

      const isTrialing = profile?.subscription_status === "trialing" &&
        profile?.trial_ends_at &&
        new Date(profile.trial_ends_at) > new Date();

      const isActive = profile?.subscription_status === "active";

      if (!isTrialing && !isActive) {
        router.push("/pricing");
        return;
      }

      const { data: businesses } = await supabase
        .from("businesses")
        .select("id")
        .eq("user_id", user.id);

      if (businesses && businesses.length > 0) {
        const businessIds = businesses.map((b) => b.id);
        const { data: reviewData } = await supabase
          .from("reviews")
          .select("*")
          .in("business_id", businessIds)
          .eq("status", "pending")
          .order("review_date", { ascending: false });

        setReviews(reviewData ?? []);
      }

      setLoading(false);
    }
    init();
  }, [router]);

  async function generateResponse(review: Review) {
    setGenerating((prev) => ({ ...prev, [review.id]: true }));

    const res = await fetch("/api/generate-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviewerName: review.reviewer_name,
        rating: review.rating,
        comment: review.comment,
      }),
    });

    const data = await res.json();
    setResponses((prev) => ({ ...prev, [review.id]: data.response }));
    setGenerating((prev) => ({ ...prev, [review.id]: false }));
  }

  async function approveResponse(review: Review) {
    setSending((prev) => ({ ...prev, [review.id]: true }));

    await supabase.from("responses").insert({
      review_id: review.id,
      content: responses[review.id],
      status: "sent",
      sent_at: new Date().toISOString(),
    });

    await supabase.from("reviews").update({ status: "responded" }).eq("id", review.id);

    setReviews((prev) => prev.filter((r) => r.id !== review.id));
    setSending((prev) => ({ ...prev, [review.id]: false }));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function renderStars(rating: number) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">ClientAutomate</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{userEmail}</span>
          <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
            Sign out
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Review Manager</h1>
        <p className="text-gray-500 mb-8">
          {reviews.length > 0
            ? `${reviews.length} review${reviews.length > 1 ? "s" : ""} waiting for a response`
            : "All reviews have been responded to."}
        </p>

        {reviews.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <div className="text-5xl mb-4">⭐</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h2>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Connect your Google Business Profile and we'll start generating AI responses to your reviews.
            </p>
            <a
              href="/api/google/connect"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Connect Google Business Profile
            </a>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{review.reviewer_name}</p>
                  <p className="text-yellow-500 text-lg">{renderStars(review.rating)}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(review.review_date).toLocaleDateString("en-GB")}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{review.comment}</p>

              {!responses[review.id] && (
                <button
                  onClick={() => generateResponse(review)}
                  disabled={generating[review.id]}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {generating[review.id] ? "Generating..." : "Generate AI Response"}
                </button>
              )}

              {responses[review.id] && (
                <div className="mt-4 bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-800 mb-2">AI Response:</p>
                  <textarea
                    value={responses[review.id]}
                    onChange={(e) => setResponses((prev) => ({ ...prev, [review.id]: e.target.value }))}
                    className="w-full text-sm text-gray-700 bg-transparent resize-none focus:outline-none"
                    rows={4}
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => approveResponse(review)}
                      disabled={sending[review.id]}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {sending[review.id] ? "Sending..." : "Approve & Send"}
                    </button>
                    <button
                      onClick={() => generateResponse(review)}
                      className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
