"use client";

import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { usePaymentStore } from "@/store/bookingStore";

const CARD_STYLE = {
  style: {
    base: {
      fontSize: "14px",
      color: "#2e3d2f",
      "::placeholder": { color: "#5a6b5b" },
    },
  },
};

interface StepPaymentProps {
  totalPrice: number;
  onSuccess: () => void;
}

export function StepPayment({ totalPrice, onSuccess }: StepPaymentProps) {
  const t = useTranslations("booking");
  const stripe = useStripe();
  const elements = useElements();
  const { clientSecret } = usePaymentStore();

  const [cardholderName, setCardholderName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setIsProcessing(true);
    try {
      const cardEl = elements.getElement(CardNumberElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardEl!,
            billing_details: { name: cardholderName || "Ospite" },
          },
        },
      );

      if (error) {
        toast.error(error.message ?? t("payment.errors.generic"));
        return;
      }

      // succeeded o requires_capture sono entrambi stati di pagamento riuscito
      const successStatuses = ["succeeded", "requires_capture"];
      if (paymentIntent && successStatuses.includes(paymentIntent.status)) {
        toast.success(t("payment.success"));
        onSuccess();
      } else {
        toast.error(t("payment.errors.generic"));
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("payment.errors.generic"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl text-[#2e3d2f]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {t("stepPayment.title")}
        </h2>
        <p className="mt-1 text-sm text-[#5a6b5b]">
          {t("stepPayment.subtitle")} — <strong>€ {totalPrice}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2e3d2f]">
            {t("payment.cardholder")}
          </label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder={t("payment.cardholderPlaceholder")}
            className="w-full rounded-lg border border-[#e8e3d8] bg-white px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2e3d2f]">
            {t("payment.cardNumber")}
          </label>
          <div className="rounded-lg border border-[#e8e3d8] bg-white px-3 py-2.5">
            <CardNumberElement options={CARD_STYLE} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#2e3d2f]">
              {t("payment.expiry")}
            </label>
            <div className="rounded-lg border border-[#e8e3d8] bg-white px-3 py-2.5">
              <CardExpiryElement options={CARD_STYLE} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#2e3d2f]">
              CVC
            </label>
            <div className="rounded-lg border border-[#e8e3d8] bg-white px-3 py-2.5">
              <CardCvcElement options={CARD_STYLE} />
            </div>
          </div>
        </div>

        <hr className="border-[#e8e3d8]" />

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 accent-[#4a6741]"
          />
          <span className="text-sm leading-relaxed text-[#5a6b5b]">
            {t("payment.acceptTerms")}{" "}
            <Link href="/terms" className="text-[#4a6741] underline underline-offset-2">
              {t("payment.termsLink")}
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={!stripe || !acceptedTerms || isProcessing || !clientSecret}
          className="w-full rounded-full bg-[#4a6741] py-3 text-sm font-medium text-[#f7f4ee] transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
        >
          {isProcessing
            ? t("payment.processing")
            : `${t("payment.confirm")} · € ${totalPrice}`}
        </button>
      </form>
    </div>
  );
}