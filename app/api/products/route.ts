//@ts-nocheck
import Stripe from "stripe";

export async function GET() {
  const stripe = new Stripe('sk_test_51Gvs9lG8Eb6lvUjg4RzBs2fuVZPaHU1RQBbuGNq4F1gRhdzLRdFFAGEjrf2vboEMg866Hv392EXdzzcEkOlcaeyh00TymnI58x');

  try {
    const { data: prices } = await stripe.prices.list({
      active: true,
      limit: 10,
      expand: ['data.product'],
    });

    // Assuming Response is a global object or imported from somewhere
    return Response.json({ data: prices });
  } catch (error) {
    console.error("Error fetching prices:", error);
    return Response.json({ error: "Error fetching prices" }, { status: 500 });
  }
}

      