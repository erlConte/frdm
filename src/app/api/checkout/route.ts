import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { getShopListingById } from "@/lib/data/shop";

export async function POST(request: NextRequest) {
  let body: { listingId?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const listingId = body.listingId;
  if (!listingId) {
    return NextResponse.json({ error: "Missing listingId" }, { status: 400 });
  }

  const listing = await getShopListingById(listingId);

  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  if (listing.status === "venduto") {
    return NextResponse.json({ error: "Listing already sold" }, { status: 409 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;

  try {
    const stripe = getStripeClient();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: listing.price_cents,
            product_data: {
              name: listing.title,
              description: listing.description ?? undefined,
              images: listing.images.slice(0, 1),
            },
          },
        },
      ],
      metadata: { listingId: listing.id },
      success_url: `${siteUrl}/shop/${listing.id}?checkout=success`,
      cancel_url: `${siteUrl}/shop/${listing.id}?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("checkout POST error", error);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
