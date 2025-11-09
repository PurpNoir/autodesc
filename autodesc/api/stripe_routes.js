import express from 'express';
import Stripe from 'stripe';
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  const { success_url, cancel_url } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: process.env.PRICE_ID_MONTHLY, quantity: 1 }],
      success_url: success_url || (process.env.NEXT_PUBLIC_BASE_URL + '/success'),
      cancel_url: cancel_url || (process.env.NEXT_PUBLIC_BASE_URL + '/cancel'),
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Webhook endpoint (note: verify signature in production)
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  // In production: verify with stripe.webhooks.constructEvent
  // const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  // For this template, we'll accept the raw body
  const event = req.body;
  console.log('Stripe event received', event.type || '(no type in template)');
  // Handle subscription created / payment succeeded events to grant access
  res.json({ received: true });
});

export default router;
