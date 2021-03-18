import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')(process.env.STRIPE_SK);

type StripeSession = {
  id: string
}

export default async (req: NextApiRequest, res: NextApiResponse<StripeSession>) => {
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body,
    mode: 'payment',
    shipping_address_collection: {allowed_countries:['US']},
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/cancel`,
  });

  res.json({ id: session.id });

};
