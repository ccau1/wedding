import { _getCustomer } from "lib/stripe/stripe";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const cookies = req.headers.cookie.split("; ").reduce((obj, part) => {
        const [_orig, key, value] = part.match(/^([^=]+)=(.+)$/);
        obj[key] = decodeURIComponent(value);
        return obj;
      }, {});
      const user: User = JSON.parse(cookies.user);

      const customer = await _getCustomer(user.email);
      const { paymentMethod: paymentMethodId } = req.body;
      const origPaymentMethod = await stripe.paymentMethods.retrieve(
        paymentMethodId
      );
      if (origPaymentMethod.customer !== customer.id)
        throw new Error("this card does not belong to you");
      // detach to customer
      const paymentMethod = await stripe.paymentMethods.detach(paymentMethodId);

      res.status(200).json(paymentMethod);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
