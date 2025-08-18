"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  confirmBooking,
  selectConfirmedData,
  selectConfirmedLoading,
  selectConfirmedError,
} from "../../reducer/bookingSlice";

const OAuth = ({
  bookingId,
  paymentIntentId,
  orderId,
  setProcessing,
  setIsPaymentConfirmed,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [status, setStatus] = useState("loading");

  const confirmedData = useSelector(selectConfirmedData);
  const confirmBookingLoading = useSelector(selectConfirmedLoading);
  const confirmBookingError = useSelector(selectConfirmedError);

  useEffect(() => {
    if (paymentIntentId && orderId) {
      setProcessing(true);
      console.log(paymentIntentId);
      dispatch(confirmBooking({ paymentIntentId, orderId }))
        .unwrap()
        .then(() => {
          setStatus("success");
          setIsPaymentConfirmed(true);

          // Redirect immediato
          router.push(`/booking-details/${bookingId}`);
        })
        .catch((error) => {
          console.error("Errore nella conferma della prenotazione:", error);
          setStatus("error");
        })
        .finally(() => {
          setProcessing(false);
        });
    }
  }, [
    bookingId,
    paymentIntentId,
    orderId,
    dispatch,
    router,
    setProcessing,
    setIsPaymentConfirmed,
  ]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#f3f1e7] rounded-lg shadow-md text-center mb-12">
      {status === "loading" || confirmBookingLoading ? (
        <p className="text-[#46331d] font-medium">
          Conferma pagamento in corso...
        </p>
      ) : status === "success" ? (
        <div className="text-[#46331d]">
          <h2 className="text-2xl font-semibold mb-2">Pagamento confermato!</h2>
          <p className="text-base">
            Verrai reindirizzato ai dettagli della prenotazione.
          </p>
        </div>
      ) : status === "error" || confirmBookingError ? (
        <div className="text-red-600">
          <h2 className="text-2xl font-semibold mb-2">Errore nel pagamento</h2>
          <p className="text-base">
            {confirmBookingError ||
              "Si è verificato un problema durante la conferma."}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default OAuth;
