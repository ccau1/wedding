import { buffer } from "micro";
import Stripe from "stripe";

// instantiate stripe variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export default async (req, res) => {
  if (req.method === "POST") {
    // translate req into buffer
    const buf = await buffer(req);
    // get stripe signature
    const sig = req.headers["stripe-signature"];
    // hold stripe event object
    let stripeEvent: Stripe.Event;

    try {
      // attempt to get stripe event
      stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      console.log("stripeEvent", stripeEvent);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // based on stripe event type, take action
    switch (stripeEvent.type) {
      case "checkout.session.completed":
        const session = stripeEvent.data.object;
        console.log("payment success", session);
        // Do something here on payment success, like update order etc.
        break;
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
