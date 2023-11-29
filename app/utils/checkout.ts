//@ts-nocheck

// checkout.ts
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Gvs9lG8Eb6lvUjgp7ZqG8JUUUaEvaui0vLtZSmZSpDepqg5qAvuCCQQ2ZGJ585aOap6Q1qFI1hQzujb0ZqcgWZU00hjoaM10e');

export const checkout = async (cart) => {
  try {
    const lineItems = cart.map((item) => ({
      price: item.id, 
      quantity: item.quantity,
    }));

    const response = await fetch('https://stripe-97ev4apwd-giuseppe-argento.vercel.app/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lineItems }),
    });

    if (!response.ok) {
      throw new Error('Error initiating checkout');
    }

    const session = await response.json();
    const stripe = await stripePromise;

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw new Error(error.message);
      }
    }
  } catch (error) {
    console.error('Checkout error:', error.message);
  }
};
