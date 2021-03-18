import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')(process.env.STRIPE_SK);
const YOUR_DOMAIN = 'http://localhost:4242';

type Session = {
  id: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Session>) => {
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/cancel`,
  });

  res.json({ id: session.id });

};
