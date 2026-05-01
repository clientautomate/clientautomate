import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL}/api/google/callback`
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=google_denied`);
  }

  try {
    // Odczytaj sesję zalogowanego użytkownika z ciasteczka
    const cookieStore = await cookies();
    const supabaseUser = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll() } }
    );

    const { data: { user } } = await supabaseUser.auth.getUser();
    if (!user) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);
    }

    // Wymień kod na tokeny Google
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Pobierz konta Google Business
    const mybusiness = google.mybusinessaccountmanagement({ version: "v1", auth: oauth2Client });
    const accountsRes = await mybusiness.accounts.list();
    const accounts = accountsRes.data.accounts ?? [];

    if (accounts.length === 0) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=no_business`);
    }

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

    // Zapisz do Supabase (service role omija RLS)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabaseAdmin.from("businesses").upsert({
      user_id: user.id,
      name: location.title ?? "My Business",
      google_account_id: accountId,
      google_location_id: locationId,
      google_access_token: tokens.access_token,
      google_refresh_token: tokens.refresh_token,
      google_token_expiry: tokens.expiry_date
        ? new Date(tokens.expiry_date).toISOString()
        : null,
    }, { onConflict: "user_id" });

    const redirectUrl = new URL(`${process.env.NEXTAUTH_URL}/dashboard`);
    redirectUrl.searchParams.set("connected", "true");
    redirectUrl.searchParams.set("business", location.title ?? "Your Business");

    return NextResponse.redirect(redirectUrl.toString());
  } catch (err) {
    console.error("Google callback error:", err);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=google_error`);
  }
}
