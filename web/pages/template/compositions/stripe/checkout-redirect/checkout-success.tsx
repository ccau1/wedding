import useTheme from "@hooks/useTheme";
import TemplateLayout from "@layouts/templateLayout";
import Chip from "components/chip";
import Divider from "components/divider";
import { GetServerSideProps } from "next";
import { MdPayment } from "react-icons/md";
import { format } from "date-fns";
import { FaCcStripe } from "react-icons/fa";
import { CSSProperties } from "react";
import PaymentBrandIcon from "components/paymentBrandIcon";

interface CheckoutSuccessCompositionPageProps {
  session: any;
  paymentIntent: any;
  paymentMethod: any;
}

const CheckoutSuccessCompositionPage = ({
  session,
  paymentIntent,
  paymentMethod,
}: CheckoutSuccessCompositionPageProps) => {
  const { customer, line_items } = session;
  console.log("customer", customer);
  console.log("session", session);
  console.log("line_items", line_items);
  console.log("paymentIntent", paymentIntent);
  console.log("paymentMethod", paymentMethod);
  const theme = useTheme();

  const paymentStatusTag = () => {
    let color = "gray";
    let text = "pending";
    switch (session.payment_status) {
      case "paid":
        color = "green";
        text = "Success";
        break;
    }
    return <Chip text={text} color={color} />;
  };

  return (
    <TemplateLayout>
      <div className="">
        <div className="flex flex-row items-center text-gray-500">
          <MdPayment size={20} />
          <p className="ml-2">PAYMENT</p>
          {paymentStatusTag()}
        </div>
        <div>
          <h4>
            <span>{session.amount_total / 100}</span>{" "}
            <span className="">{session.currency.toUpperCase()}</span>
          </h4>
        </div>
        <Divider />
        {/* sub-details 1 */}
        <div className="flex flex-row h-20">
          <div>
            <label>Date</label>
            <p>
              {format(new Date(paymentIntent.created * 1000), "LLLL d, yyyy")}
            </p>
          </div>
          <Divider vertical className="mx-4" />
          <div>
            <label>Customer</label>
            <p>{customer.name}</p>
          </div>
          <Divider vertical className="mx-4" />
          <div>
            <label>Payment Method</label>
            <div className="flex flex-row items-center">
              <PaymentBrandIcon
                brand={paymentMethod.card.brand}
                className="mr-3 text-primary-400"
              />
              <p>**** {paymentMethod.card.last4}</p>
            </div>
          </div>
        </div>
        {/* Checkout Summary */}
        <div className="mt-5">
          <h4>Checkout Summary</h4>
          <Divider />
          <div className="grid grid-cols-5">
            <label className="col-span-3 flex flex-row">ITEMS</label>
            <label className="flex justify-end">QTY</label>
            <label className="flex justify-end">UNIT PRICE</label>
          </div>
          <Divider />
          {line_items.data.map((lineItem) => (
            <div key={lineItem.id} className="grid grid-cols-5 py-3">
              <div className="col-span-3 flex flex-row">
                <img className="w-16 h-16 object-contain mr-3" />
                <p>{lineItem.description}</p>
              </div>
              <div className="flex justify-end">{lineItem.quantity}</div>
              <div className="flex justify-end">
                {lineItem.amount_total} {lineItem.currency.toUpperCase()}
              </div>
            </div>
          ))}
          <Divider />
          <label className="flex justify-end">TOTAL</label>
          <Divider />
          <p className="flex justify-end">
            {session.amount_total} {session.currency.toUpperCase()}
          </p>
        </div>
      </div>
    </TemplateLayout>
  );
};

export default CheckoutSuccessCompositionPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.retrieve(query.session_id, {
    expand: ["customer", "line_items"],
  });
  const paymentIntent = await stripe.paymentIntents.retrieve(
    session.payment_intent
  );
  const paymentMethod = await stripe.paymentMethods.retrieve(
    paymentIntent.payment_method
  );

  // TODO: update inventory and order

  return {
    props: {
      paymentIntent,
      session,
      paymentMethod,
    },
  };
};
