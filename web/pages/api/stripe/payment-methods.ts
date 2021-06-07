import { _getCustomer } from "lib/stripe/stripe";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const cookies = req.headers.cookie.split("; ").reduce((obj, part) => {
        const [_orig, key, value] = part.match(/^([^=]+)=(.+)$/);
        obj[key] = decodeURIComponent(value);
        return obj;
      }, {});
      const user: User = JSON.parse(cookies.user);

      const customer = await _getCustomer(
        user.email,
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.username
      );

      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer.id,
        type: "card",
      });

      res.status(200).json(paymentMethods);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
};
