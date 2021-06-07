import {
  loadStripe,
  PaymentMethod,
  StripeCardElement,
} from "@stripe/stripe-js";
import TemplateLayout from "@layouts/templateLayout";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Card from "components/card";
import { _getCustomer } from "lib/stripe/stripe";
import { useMemo, useRef } from "react";
import PaymentBrandIcon, { PaymentBrand } from "components/paymentBrandIcon";
import Button from "components/button";
import axios from "axios";
import useSWR, { mutate } from "swr";
import ApiErrorAlert from "components/project/apiErrorAlert";
import extractApiErrors from "lib/extractApiErrors";
import { FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MotionCard = motion(Card);

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const StripeCardsCompositionPageInner = ({}) => {
  const stripe = useStripe();
  const elements = useElements();
  const cardElementRef = useRef<StripeCardElement>(null);
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

  const { data: paymentMethods, error } = useSWR<Array<PaymentMethod>>(
    `${process.env.NEXT_PUBLIC_SITE}/api/stripe/payment-methods`,
    async (url) => (await axios.get(url)).data.data
  );

  const onSubmitAddCard = async (event) => {
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

    const newPaymentMethod = await axios.post(
      `${process.env.NEXT_PUBLIC_SITE}/api/stripe/attach-customer-payment-method`,
      {
        paymentMethod: paymentMethod.id,
      }
    );

    mutate(
      `${process.env.NEXT_PUBLIC_SITE}/api/stripe/payment-methods`,
      [newPaymentMethod.data, ...paymentMethods],
      false
    );

    cardElementRef.current.clear();

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  const onRemoveCard = async (paymentMethod: PaymentMethod) => {
    console.log("paymentMethod", paymentMethod);
    const newPaymentMethod = await axios.post(
      `${process.env.NEXT_PUBLIC_SITE}/api/stripe/detach-customer-payment-method`,
      {
        paymentMethod: paymentMethod.id,
      }
    );

    mutate(
      `${process.env.NEXT_PUBLIC_SITE}/api/stripe/payment-methods`,
      paymentMethods.filter((pm) => pm.id !== paymentMethod.id),
      false
    );
  };

  return (
    <TemplateLayout>
      <ApiErrorAlert errors={extractApiErrors(error)} />
      <Card className="py-4 mt-4">
        <form onSubmit={onSubmitAddCard}>
          <CardElement
            onReady={(ele) => (cardElementRef.current = ele)}
            options={options}
          />
          <Button
            type="submit"
            disabled={!stripe}
            text="Add"
            className="w-full mt-6"
          />
        </form>
      </Card>
      {paymentMethods && (
        <motion.div
          className="grid grid-cols-1 gap-3 mt-3"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {paymentMethods.map((paymentMethod) => (
              <MotionCard
                key={paymentMethod.id}
                className="hover:shadow-xl transition-shadow duration-700 py-4"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.5 },
                  },
                  exit: {
                    opacity: 0,
                    height: 0,
                  },
                }}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.div
                  className="flex"
                  variants={{
                    hidden: { translateX: -30 },
                    show: { translateX: 0 },
                  }}
                >
                  <PaymentBrandIcon
                    size={30}
                    brand={paymentMethod.card.brand as PaymentBrand}
                    className="text-gray-600"
                  />
                  <div className="ml-4">
                    <p className="text-gray-600">
                      **** **** **** {paymentMethod.card.last4}
                    </p>
                    <small className="text-gray-500 block">
                      {paymentMethod.card.exp_month.toString().padStart(2, "0")}{" "}
                      / {paymentMethod.card.exp_year.toString().slice(-2)}
                    </small>
                    <p className="text-gray-500">
                      {paymentMethod.billing_details.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-end flex-1">
                    <a
                      onClick={() => onRemoveCard(paymentMethod)}
                      className="p-3 hover:bg-gray-50 rounded-full cursor-pointer transition-colors active:bg-gray-100"
                    >
                      <FaTrashAlt size={20} className="text-red-600" />
                    </a>
                  </div>
                </motion.div>
              </MotionCard>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      <div className="grid grid-cols-1 gap-3 mt-3">
        {!paymentMethods && (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border border-blue-50 shadow rounded-md px-4 py-7 w-full bg-white"
              >
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-sm bg-blue-200 h-5 w-7"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-blue-200 rounded w-36"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-blue-200 rounded w-12"></div>
                      <div className="h-4 bg-blue-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </TemplateLayout>
  );
};

const StripeCardsCompositionPage = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeCardsCompositionPageInner {...props} />
    </Elements>
  );
};

export default StripeCardsCompositionPage;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const user = JSON.parse(nookies.get(ctx).user);
//   const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//   const customer = await _getCustomer(
//     user.email,
//     user.firstName && user.lastName
//       ? `${user.firstName} ${user.lastName}`
//       : user.username
//   );

//   const paymentMethods = await stripe.paymentMethods.list({
//     customer: customer.id,
//     type: "card",
//   });

//   console.log("customer", customer, paymentMethods);

//   return {
//     props: {
//       customer,
//       paymentMethods,
//     },
//   };
// };
