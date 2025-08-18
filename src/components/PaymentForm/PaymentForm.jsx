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
  selectOrderError,
} from "../../reducer/orderSlice";

const PaymentForm = ({ scrollToUserForm }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const completedData = useSelector(selectCompletedData);
  const orderData = useSelector(selectOrderData);
  const loading = useSelector(selectOrderLoading);
  const error = useSelector(selectOrderError);

  const [cardholderName, setCardholderName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = completedData?.booking?.totalPrice || 0;
  const bookingId = completedData?.booking?._id || null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Se manca l'ID della prenotazione, invito a completare il form utente
    if (!bookingId) {
      toast.error(
        "Completa e conferma i dati del soggiorno nel modulo in alto."
      );
      if (typeof scrollToUserForm === "function") {
        scrollToUserForm();
      }
      return; // la checkbox di PaymentForm rimane invariata
    }

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      await dispatch(
        createPayment({ bookingId, paymentMethod: "card" })
      ).unwrap();
      toast.success("Pagamento avviato con successo!");
    } catch (err) {
      console.error(err);
      toast.error("Errore durante il pagamento.");
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

      {/* Messaggi di errore/successo via toast; niente testo visibile persistente */}
      {/* orderData e error non vengono mostrati qui */}

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

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-[#46331d]">
            Accetto i{" "}
            <a href="/terms" className="underline text-blue-600">
              termini e condizioni
            </a>
          </span>
        </label>

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
