export const _getCustomer = async (email: string, name?: string) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // if no email passed, not going to create a customer
  if (!email) return null;
  let customer;
  // try to fetch existing customer
  customer = (await stripe.customers.list({ limit: 1, email })).data[0];

  // customer doesn't exist, create one now
  if (!customer) {
    customer = await stripe.customers.create({
      email: email.toLowerCase(),
      name,
      // description: "",
    });
  }
  return customer;
};
