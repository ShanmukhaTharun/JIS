import express from 'express';
import Stripe from 'stripe';
import Activity from '../models/Activity.js';

const router = express.Router();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const FRONTEND_BASE = process.env.FRONTEND_BASE || 'http://localhost:5173';

if (!STRIPE_SECRET_KEY) {
  console.warn('[payments] Missing STRIPE_SECRET_KEY; payment endpoints will error until set');
}

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

// Create a Stripe Checkout Session for booking a lawyer
router.post('/checkout', async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ error: 'Payments not configured' });
    const { caseId, lawyer, amount, currency = 'usd', customerEmail } = req.body || {};
    if (!caseId || !lawyer || !amount) {
      return res.status(400).json({ error: 'caseId, lawyer and amount are required' });
    }

  const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: Math.round(Number(amount) * 100),
            product_data: {
              name: `Lawyer Booking: ${lawyer}`,
              description: `Case ${caseId}`,
            },
          },
        },
      ],
      success_url: `${FRONTEND_BASE}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_BASE}/payment/cancel`,
      metadata: { caseId, lawyer },
    });

  await Activity.create({ actorId: customerEmail || 'User', actorRole: 'User', action: 'PAYMENT_SESSION_CREATED', targetType: 'Case', targetId: caseId, details: { lawyer, amount, currency } });
  res.json({ id: session.id, url: session.url });
  } catch (err) {
    res.status(500).json({ error: err?.message || 'Failed to create checkout session' });
  }
});

// Retrieve a session (used by success page to show summary)
router.get('/session/:id', async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ error: 'Payments not configured' });
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err?.message || 'Failed to retrieve session' });
  }
});

export default router;
