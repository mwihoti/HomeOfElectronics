import Stripe from './stripe';
import { NextResponse, NextRequest } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { name, phone, location, totalPrice, cart } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ paymentUrl: session.url });
  } catch (error) {
    console.error('Stripe payment error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
