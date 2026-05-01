import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const STAR_RATING: Record<string, number> = {
  ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5,
};

export async function GET(req: NextRequest) {
  // Zabezpieczenie — tylko Vercel może wywołać ten endpoint
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Pobierz wszystkie podłączone biznesy
  const { data: businesses } = await supabase
    .from("businesses")
    .select("*")
    .not("google_access_token", "is", null);

  if (!businesses || businesses.length === 0) {
    return NextResponse.json({ message: "No businesses connected" });
  }

  let totalNew = 0;

  for (const business of businesses) {
    try {
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

      // Zapisz odświeżony token jeśli wygasł
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (oauth2Client as any).on("tokens", async (tokens: any) => {
        if (tokens.access_token) {
          await supabase.from("businesses").update({
            google_access_token: tokens.access_token,
            google_token_expiry: tokens.expiry_date
              ? new Date(tokens.expiry_date).toISOString()
              : null,
          }).eq("id", business.id);
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const reviewsApi = (google as any).mybusinessreviews({ version: "v4", auth: oauth2Client });
      const reviewsRes = await reviewsApi.accounts.locations.reviews.list({
        parent: `accounts/${business.google_account_id}/locations/${business.google_location_id}`,
      });

      const reviews = reviewsRes.data.reviews ?? [];

      for (const review of reviews) {
        const googleReviewId = review.reviewId ?? "";

        const { data: existing } = await supabase
          .from("reviews")
          .select("id")
          .eq("google_review_id", googleReviewId)
          .single();

        if (!existing) {
          await supabase.from("reviews").insert({
            business_id: business.id,
            google_review_id: googleReviewId,
            reviewer_name: review.reviewer?.displayName ?? "Anonymous",
            rating: STAR_RATING[review.starRating ?? ""] ?? 3,
            comment: review.comment ?? "",
            review_date: review.createTime ?? new Date().toISOString(),
            status: "pending",
          });
          totalNew++;
        }
      }
    } catch (err) {
      console.error(`Error fetching reviews for business ${business.id}:`, err);
    }
  }

  return NextResponse.json({ businesses: businesses.length, newReviews: totalNew });
}
