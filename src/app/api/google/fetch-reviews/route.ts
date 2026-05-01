import { google } from "googleapis";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const STAR_RATING: Record<string, number> = {
  ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5,
};

export async function POST() {
  // 1. Pobierz zalogowanego użytkownika z sesji
  const cookieStore = await cookies();
  const supabaseUser = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: { user } } = await supabaseUser.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 2. Pobierz dane biznesu z tokenami Google
  const { data: business } = await supabaseAdmin
    .from("businesses")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!business) {
    return NextResponse.json({ error: "No business connected" }, { status: 404 });
  }

  // 3. Skonfiguruj OAuth z zapisanymi tokenami
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXTAUTH_URL}/api/google/callback`
  );

  oauth2Client.setCredentials({
    access_token: business.google_access_token,
    refresh_token: business.google_refresh_token,
    expiry_date: business.google_token_expiry
      ? new Date(business.google_token_expiry).getTime()
      : undefined,
  });

  // Automatycznie zapisz nowy token jeśli wygasł i został odświeżony
  oauth2Client.on("tokens", async (tokens) => {
    if (tokens.access_token) {
      await supabaseAdmin.from("businesses").update({
        google_access_token: tokens.access_token,
        google_token_expiry: tokens.expiry_date
          ? new Date(tokens.expiry_date).toISOString()
          : null,
      }).eq("user_id", user.id);
    }
  });

  // 4. Pobierz recenzje z Google Business Profile API
  const reviewsApi = google.mybusinessreviews({ version: "v4", auth: oauth2Client });
  const reviewsRes = await reviewsApi.accounts.locations.reviews.list({
    parent: `accounts/${business.google_account_id}/locations/${business.google_location_id}`,
  });

  const reviews = reviewsRes.data.reviews ?? [];

  // 5. Zapisz nowe recenzje do Supabase (pomijaj już istniejące)
  let newCount = 0;
  for (const review of reviews) {
    const googleReviewId = review.reviewId ?? "";

    const { data: existing } = await supabaseAdmin
      .from("reviews")
      .select("id")
      .eq("google_review_id", googleReviewId)
      .single();

    if (!existing) {
      await supabaseAdmin.from("reviews").insert({
        business_id: business.id,
        google_review_id: googleReviewId,
        reviewer_name: review.reviewer?.displayName ?? "Anonymous",
        rating: STAR_RATING[review.starRating ?? ""] ?? 3,
        comment: review.comment ?? "",
        review_date: review.createTime ?? new Date().toISOString(),
        status: "pending",
      });
      newCount++;
    }
  }

  return NextResponse.json({ fetched: reviews.length, new: newCount });
}
