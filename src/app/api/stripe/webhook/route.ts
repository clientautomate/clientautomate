import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const subscription = event.data.object as Stripe.Subscription;

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated"
  ) {
    const userId = subscription.metadata?.user_id;
    const plan = subscription.metadata?.plan ?? "starter";

    if (userId) {
      await supabase.from("profiles").upsert({
        user_id: userId,
        stripe_subscription_id: subscription.id,
        plan,
        subscription_status: subscription.status,
        trial_ends_at: subscription.trial_end
          ? new Date(subscription.trial_end * 1000).toISOString()
          : null,
      }, { onConflict: "user_id" });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const userId = subscription.metadata?.user_id;
    if (userId) {
      await supabase.from("profiles").update({
        subscription_status: "canceled",
        plan: "trial",
      }).eq("user_id", userId);
    }
  }

  return NextResponse.json({ received: true });
}
