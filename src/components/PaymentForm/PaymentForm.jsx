"use client";

import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { selectCompletedData } from "../../reducer/bookingSlice";
import {
  createPayment,
  selectOrderData,
  selectOrderLoading,
} from "../../reducer/orderSlice";

const PaymentForm = ({
  scrollToUserForm,
  bookingId,
  onPaymentSuccess,
  disabled,
}) => {
  const { t } = useTranslation();

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const completedData = useSelector(selectCompletedData);
  const orderData = useSelector(selectOrderData);
  const loading = useSelector(selectOrderLoading);

  const [cardholderName, setCardholderName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = completedData?.booking?.totalPrice || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookingId) {
      toast.error(t("payment.errors.completeForm"));
      scrollToUserForm?.();
      return;
    }

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const result = await dispatch(
        createPayment({ bookingId, paymentMethod: "card" })
      ).unwrap();

      const clientSecret = result?.clientSecret;
      if (!clientSecret)
        throw new Error(t("payment.errors.missingClientSecret"));

      const cardNumberElement = elements.getElement(CardNumberElement);

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: cardholderName || t("payment.cardholderDefault"),
            },
          },
        });

      if (stripeError) {
        console.error("Stripe error:", stripeError);
        toast.error(stripeError.message || t("payment.errors.generic"));
      } else if (paymentIntent?.status === "succeeded") {
        toast.success(t("payment.success"));
        onPaymentSuccess?.(paymentIntent.id);
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error(t("payment.errors.generic"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="mb-12 max-w-lg mx-auto bg-[#f3f1e7] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-[#46331d]">
        {t("payment.total")}: €{totalPrice}
      </h2>

      <div className="flex flex-wrap items-center justify-start gap-4 mb-4 overflow-hidden">
        {["visa", "mastercard", "amex", "stripe"].map((brand) => (
          <div
            key={brand}
            className="flex-shrink-0 bg-white rounded-lg shadow-sm p-1"
            style={{
              width: "100px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={`/icons/payments/${brand}.svg`}
              alt={brand}
              className="max-w-full max-h-full object-contain"
              style={{ imageRendering: "crisp-edges" }}
            />
          </div>
        ))}
      </div>

      <div className="w-full mb-6">
        <label
          htmlFor="cardholder-name"
          className="block text-sm font-medium text-[#46331d] mb-1"
        >
          {t("payment.cardholder")}
        </label>
        <input
          id="cardholder-name"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="block w-full rounded-md border border-gray-300 p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#46331d] focus:border-[#46331d] transition-all bg-white"
          placeholder={t("payment.cardholderPlaceholder")}
          autoComplete="cc-name"
          required
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#46331d] mb-1">
            {t("payment.cardNumber")}
          </label>
          <div className="border rounded-md p-3 text-sm bg-white">
            <CardNumberElement
              options={{ style: { base: { fontSize: "14px" } } }}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-[#46331d] mb-1">
              {t("payment.expiry")}
            </label>
            <div className="border rounded-md p-3 text-sm bg-white">
              <CardExpiryElement
                options={{ style: { base: { fontSize: "14px" } } }}
              />
            </div>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-[#46331d] mb-1">
              CVC
            </label>
            <div className="border rounded-md p-3 text-sm bg-white">
              <CardCvcElement
                options={{ style: { base: { fontSize: "14px" } } }}
              />
            </div>
          </div>
        </div>

        <hr className="my-6 border-[#46331d]" />

        <div className="md:flex md:justify-between md:space-x-6">
          <div className="md:w-1/2 space-y-3">
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-[#46331d] leading-relaxed">
                <strong>{t("payment.acceptTerms")}</strong>{" "}
                <a href="/terms" className="underline text-blue-600">
                  {t("payment.termsLink")}
                </a>{" "}
                {t("payment.termsDescription")}
              </span>
            </label>
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0 text-sm text-[#46331d] space-y-2">
            <p className="font-semibold">{t("payment.infoTitle")}</p>
            <p>{t("payment.infoDescription")}</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-[#46331d] hover:bg-[#5a4621] text-white font-semibold py-3 px-6 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              disabled ||
              isProcessing ||
              !stripe ||
              !elements ||
              !acceptedTerms ||
              loading
            }
          >
            {isProcessing || loading
              ? t("payment.processing")
              : t("payment.confirm")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PaymentForm;
