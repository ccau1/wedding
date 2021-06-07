import { _getCustomer } from "lib/stripe/stripe";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const cookies = req.headers.cookie.split("; ").reduce((obj, part) => {
        const [_orig, key, value] = part.match(/^([^=]+)=(.+)$/);
        obj[key] = decodeURIComponent(value);
        return obj;
      }, {});
      const user: User = JSON.parse(cookies.user);
      console.log("user", user);

      const customer = await _getCustomer(user.email);
      const { paymentMethod: paymentMethodId } = req.body;
      // attach to customer
      let paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      });
      // update payment method info using user info
      paymentMethod = await stripe.paymentMethods.update(paymentMethodId, {
        billing_details: {
          ...(!paymentMethod.billing_details.name
            ? {
                name:
                  user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.username,
              }
            : {}),
          email: user.email,
        },
      });

      res.status(200).json(paymentMethod);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
