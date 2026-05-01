import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const PRICES: Record<string, string> = {
    starter: process.env.STRIPE_PRICE_STARTER!,
    growth: process.env.STRIPE_PRICE_GROWTH!,
    agency: process.env.STRIPE_PRICE_AGENCY!,
    early_bird: process.env.STRIPE_PRICE_STARTER!,
  };

  const { plan } = await req.json();

  if (!PRICES[plan]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  // Pobierz zalogowanego użytkownika
  const cookieStore = await cookies();
  const supabaseUser = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: { user } } = await supabaseUser.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Pobierz lub utwórz profil z customer ID
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { user_id: user.id },
    });
    customerId = customer.id;

    await supabase.from("profiles").upsert({
      user_id: user.id,
      stripe_customer_id: customerId,
    }, { onConflict: "user_id" });
  }

  // Utwórz sesję checkout z 14-dniowym trialem
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: PRICES[plan], quantity: 1 }],
    subscription_data: {
      trial_period_days: 14,
      metadata: { user_id: user.id, plan },
    },
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?subscribed=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}
