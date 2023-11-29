//@ts-nocheck

import Stripe from 'stripe';





export async function POST(req: Request) {


  // Create a new instance of the Stripe class with your API key
const stripe = new Stripe('sk_test_51Gvs9lG8Eb6lvUjg4RzBs2fuVZPaHU1RQBbuGNq4F1gRhdzLRdFFAGEjrf2vboEMg866Hv392EXdzzcEkOlcaeyh00TymnI58x');


      const { lineItems } = req.body;

      // Create a new checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success', // Redirect URL after successful payment
        cancel_url: 'http://localhost:3000/cancel', // Redirect URL after canceled payment
      });

      res.status(200).json({ id: session.id });
   


}
