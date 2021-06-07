import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import TemplateLayout from "@layouts/templateLayout";
import { useMemo } from "react";
import Button from "components/button";
import Card from "components/card";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import { _getCustomer } from "lib/stripe/stripe";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutFormProps {
  price: number;
  customer: any;
  paymentMethods: any;
}

const CheckoutForm = ({
  price,
  customer,
  paymentMethods,
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  console.log("stripe", customer, paymentMethods);

  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "16px",
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    ["16px"]
  );

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card></Card>
      <Card className="py-4 mt-4">
        <CardElement options={options} />
      </Card>
      <Button
        type="submit"
        disabled={!stripe}
        text="Pay"
        className="w-full mt-6"
      />
    </form>
  );
};

const CheckoutCompositionPage = ({ customer, paymentMethods }) => {
  return (
    <TemplateLayout>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          price={15}
          customer={customer}
          paymentMethods={paymentMethods}
        />
      </Elements>
    </TemplateLayout>
  );
};

export default CheckoutCompositionPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = JSON.parse(nookies.get(ctx).user);
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const customer = await _getCustomer(user.email);

  const paymentMethods = await stripe.paymentMethods.list({
    customer: customer.id,
    type: "card",
  });

  console.log("paymentMethods", paymentMethods);

  return {
    props: {
      customer,
      paymentMethods,
    },
  };
};
