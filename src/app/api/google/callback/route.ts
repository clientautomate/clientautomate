import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL}/api/google/callback`
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=google_denied`);
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Pobierz listę kont Google Business
    const mybusiness = google.mybusinessaccountmanagement({ version: "v1", auth: oauth2Client });
    const accountsRes = await mybusiness.accounts.list();
    const accounts = accountsRes.data.accounts ?? [];

    if (accounts.length === 0) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=no_business`);
    }

    // Pobierz użytkownika z Supabase
    const authHeader = req.headers.get("cookie") ?? "";
    const account = accounts[0];
    const accountId = account.name?.split("/")[1] ?? "";

    // Pobierz lokalizacje
    const businessInfo = google.mybusinessbusinessinformation({ version: "v1", auth: oauth2Client });
    const locationsRes = await businessInfo.accounts.locations.list({
      parent: account.name!,
      readMask: "name,title",
    });

    const locations = locationsRes.data.locations ?? [];
    const location = locations[0];

    if (!location) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=no_location`);
    }

    const locationId = location.name?.split("/")[1] ?? "";

    // Zapisz tokeny i biznes w bazie (używamy service role żeby ominąć RLS)
    // Tutaj docelowo będziemy zapisywać do tabeli businesses
    const redirectUrl = new URL(`${process.env.NEXTAUTH_URL}/dashboard`);
    redirectUrl.searchParams.set("connected", "true");
    redirectUrl.searchParams.set("business", location.title ?? "Your Business");

    return NextResponse.redirect(redirectUrl.toString());
  } catch (err) {
    console.error("Google callback error:", err);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=google_error`);
  }
}
