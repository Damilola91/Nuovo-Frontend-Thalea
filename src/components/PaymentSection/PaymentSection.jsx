"use client";

import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../PaymentForm/PaymentForm";

const PaymentSection = ({
  stripePromise,
  scrollToUserForm,
  bookingId,
  onPaymentSuccess,
}) => (
  <section className="mb-12 max-w-lg mx-auto">
    <h2 className="text-2xl font-semibold mb-4 text-[#46331d] text-center">
      Pagamento
    </h2>
    <div className="shadow-md rounded-md">
      <Elements stripe={stripePromise}>
        <PaymentForm
          scrollToUserForm={scrollToUserForm}
          bookingId={bookingId}
          onPaymentSuccess={onPaymentSuccess}
        />
      </Elements>
    </div>
  </section>
);

export default PaymentSection;
