// Import necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Create a new instance of the Stripe class with your API key
const stripe = new Stripe('sk_test_51Gvs9lG8Eb6lvUjg4RzBs2fuVZPaHU1RQBbuGNq4F1gRhdzLRdFFAGEjrf2vboEMg866Hv392EXdzzcEkOlcaeyh00TymnI58x');

// Define the handler function for the API endpoint
export async function Post(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
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
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

