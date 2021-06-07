import Button from "components/button";
import { loadStripe } from "@stripe/stripe-js";
import TemplateLayout from "@layouts/templateLayout";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutRedirectCompositionPage = () => {
  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await axios.post(
      "/api/stripe/create-checkout-session",
      {}
    );

    const session = await response.data;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <TemplateLayout>
      <div className="flex items-center justify-center h-full">
        <Button onClick={handleClick} text="Checkout" />
      </div>
    </TemplateLayout>
  );
};

export default CheckoutRedirectCompositionPage;
