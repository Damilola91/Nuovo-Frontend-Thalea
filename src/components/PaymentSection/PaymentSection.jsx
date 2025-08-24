"use client";

import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../PaymentForm/PaymentForm";
import { useTranslation } from "react-i18next";

const PaymentSection = ({
  stripePromise,
  scrollToUserForm,
  bookingId,
  onPaymentSuccess,
}) => {
  const { t } = useTranslation();

  return (
    <section className="mb-12 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-[#46331d] text-center">
        {t("paymentSection.title")}
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
};

export default PaymentSection;
