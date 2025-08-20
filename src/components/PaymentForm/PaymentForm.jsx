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

import { selectCompletedData } from "../../reducer/bookingSlice";
import {
  createPayment,
  selectOrderData,
  selectOrderLoading,
} from "../../reducer/orderSlice";

const PaymentForm = ({ scrollToUserForm, bookingId, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const completedData = useSelector(selectCompletedData);
  const orderData = useSelector(selectOrderData); // lasciato com’è
  const loading = useSelector(selectOrderLoading);

  const [cardholderName, setCardholderName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = completedData?.booking?.totalPrice || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookingId) {
      toast.error(
        "Completa e conferma i dati del soggiorno nel modulo in alto."
      );
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
      if (!clientSecret) throw new Error("Manca il clientSecret dal server.");

      const cardNumberElement = elements.getElement(CardNumberElement);

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardNumberElement,
            billing_details: { name: cardholderName || "Cliente" },
          },
        });

      if (stripeError) {
        console.error("Errore Stripe:", stripeError);
        toast.error(stripeError.message || "Errore durante il pagamento.");
      } else if (paymentIntent?.status === "succeeded") {
        toast.success("✅ Pagamento completato con successo!");
        onPaymentSuccess?.(paymentIntent.id);
      }
    } catch (err) {
      console.error("Errore durante il pagamento:", err);
      toast.error("Si è verificato un errore durante l'elaborazione.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="mb-12 max-w-lg mx-auto bg-[#f3f1e7] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-[#46331d]">
        Totale da pagare: €{totalPrice}
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
          Nome del titolare
        </label>
        <input
          id="cardholder-name"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="block w-full rounded-md border border-gray-300 p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#46331d] focus:border-[#46331d] transition-all bg-white"
          placeholder="Mario Rossi"
          autoComplete="cc-name"
          required
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#46331d] mb-1">
            Numero carta
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
              Scadenza
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

        {/* BLOCCO INFERIORE: Termini + Info (stile descrittivo a due colonne) */}
        <div className="md:flex md:justify-between md:space-x-6">
          {/* Colonna sinistra: checkbox + testo */}
          <div className="md:w-1/2 space-y-3">
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-[#46331d] leading-relaxed">
                <strong>Ho letto e accetto</strong> le{" "}
                <a href="/terms" className="underline text-blue-600">
                  Condizioni Generali
                </a>{" "}
                di <strong>Thalea Apartment</strong>, incluse le politiche di
                prenotazione, pagamento, cancellazione e le regole della casa.
                Confermo di aver compreso orari di check-in (14:00) e check-out
                (10:00) e le eventuali penali applicabili in caso di no-show o
                cancellazione tardiva.
              </span>
            </label>
          </div>

          {/* Colonna destra: box informativo */}
          <div className="md:w-1/2 mt-6 md:mt-0 text-sm text-[#46331d] space-y-2">
            <p className="font-semibold">Informazioni importanti</p>
            <p>
              Eventuali richieste di modifica devono essere comunicate
              tempestivamente; l’accettazione è soggetta a disponibilità. Per
              assistenza, contattaci rispondendo alla mail di conferma della
              prenotazione.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-[#46331d] hover:bg-[#5a4621] text-white font-semibold py-3 px-6 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              isProcessing || !stripe || !elements || !acceptedTerms || loading
            }
          >
            {isProcessing || loading
              ? "Sto processando..."
              : "Conferma pagamento"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PaymentForm;
