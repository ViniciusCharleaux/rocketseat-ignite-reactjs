import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import Stripe from "stripe";
import { stripe } from "../../services/stripe";

async function buffer(readeble: Readable) {
    const chunks = [];

    for await (const chunk of readeble) {
        chunks.push(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chunks)
}

export const config = {
    api: {
        bodyParser: false,
    }
}

const relevantEvents = new Set([
    'checkout.session.completed'
])

export default async function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const buf = await buffer(req);
        const secret = req.headers['stripe-signature']

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            return res.status(400).send("Webhook error: " + err.message)
        }

        //stripe listen --forward-to localhost:3000/api/webhooks

        const { type } = event;

        if (!relevantEvents.has(type)) {
            console.log('Evento recebido', type)
        }

        res.json({ received: true })    //padrão 200 envia JSON

    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }


}