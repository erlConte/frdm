import "server-only";
import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Variabile STRIPE_SECRET_KEY mancante");
  }

  stripeClient = new Stripe(secretKey);
  return stripeClient;
}
