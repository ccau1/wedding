import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      // TODO: reserve inventory and create order from shopping cart first

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // TODO: data would be from order
        line_items: [
          {
            price_data: {
              currency: "hkd",
              product_data: {
                name: "T-shirt",
                description:
                  "Happy shirt to wear everyday. Don't need to wash.",
                images: [
                  "https://cdn.shopify.com/s/files/1/0382/4258/2668/products/T-ShirtFinal_860x.jpg?v=1588348788",
                  "https://www.terranovastyle.com/pub/media/catalog/product/s/n/snoopyr-t-shirt-16-sab0045746001s119-kw-t-shirt-mc-kw-rosa_4_2.jpg",
                ],
                metadata: {},
              },
              // NOTE: this product will reoccur every 1 month
              // recurring: {
              //   interval: 'month',
              //   interval_count: 1
              // },
              unit_amount: 2000,
            },
            quantity: 2,
          },
          {
            price_data: {
              currency: "hkd",
              product_data: {
                name: "Short",
                description:
                  "Just a regular pair of short; don't think too much into it",
                images: [
                  "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/83315694-90e5-4c2c-a5ae-d1c816ba9fd6/sportswear-city-edition-woven-shorts-k6l7mQ.png",
                  "https://media.paulsmith.com/dam/products/w_auto,c_scale/q_80/STILL/M1A/M1A-239B-F40992-41/M1A-239B-F40992-41_10.jpg",
                ],
                metadata: {},
              },
              // NOTE: this product will reoccur every 1 month
              // recurring: {
              //   interval: 'month',
              //   interval_count: 1
              // },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        // TODO: specify path for success and cancel url
        success_url: `${process.env.NEXT_PUBLIC_SITE}/template/compositions/checkout-redirect/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE}/template/compositions/checkout-redirect/checkout-cancelled?session_id={CHECKOUT_SESSION_ID}`,
      });
      res.status(200).send({ id: session.id });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
