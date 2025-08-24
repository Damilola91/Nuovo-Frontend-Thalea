"use client";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

import {
  selectAvailabilityData,
  selectCompletedData,
  selectCompletedLoading,
  selectCompletedError,
  completeBooking,
} from "../../reducer/bookingSlice";
import { selectOrderData } from "../../reducer/orderSlice";

import UserForm from "../UserForm/UserForm";
import BookingSummary from "../BookingSummary/BookingSummary";
import PaymentSection from "../PaymentSection/PaymentSection";
import OAuth from "../OAuth/OAuth";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET);

const Booking = () => {
  const dispatch = useDispatch();

  const availabilityData = useSelector(selectAvailabilityData);
  const completedData = useSelector(selectCompletedData);
  const orderData = useSelector(selectOrderData);

  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [processingOAuth, setProcessingOAuth] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  const userFormRef = useRef(null);
  const bookingItem = availabilityData?.[0];

  const scrollToUserForm = () => {
    if (userFormRef.current) {
      userFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateUserData = () => {
    if (
      !userData.name?.trim() ||
      !userData.email?.trim() ||
      !userData.phone?.trim()
    ) {
      toast.error("Compila tutti i campi del modulo prima di confermare.");
      scrollToUserForm();
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      toast.error("Inserisci un'email valida.");
      scrollToUserForm();
      return false;
    }
    return true;
  };

  const handleCompleteBooking = async () => {
    if (!availabilityData?.length) {
      toast.error("Nessuna disponibilità trovata.");
      scrollToUserForm();
      return;
    }
    if (!validateUserData()) return;

    const item = availabilityData[0];

    try {
      await dispatch(
        completeBooking({
          apartment: item.apartment._id,
          guestName: userData.name,
          guestEmail: userData.email,
          guestPhone: userData.phone,
          checkIn: item.checkIn,
          checkOut: item.checkOut,
          guestsCount: item.guestsCount,
        })
      );
      toast.success("Dati confermati");
    } catch (err) {
      console.error(err);
      toast.error("Errore nel completamento della prenotazione.");
    }
  };

  const handleCheckboxChange = (isChecked) => {
    setCheckboxChecked(isChecked);
    if (isChecked) handleCompleteBooking();
  };

  // Callback per far partire OAuth dopo il pagamento
  const handlePaymentSuccess = (paymentIntentId) => {
    setIsPaymentConfirmed(true);
    setProcessingOAuth(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="container mx-auto mt-20 flex-grow px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#46331d] text-center drop-shadow-lg">
          Prenota il tuo soggiorno
        </h1>

        <UserForm
          ref={userFormRef}
          userData={userData}
          handleUserChange={handleUserChange}
          onCheckboxChange={handleCheckboxChange}
        />

        {bookingItem && <BookingSummary bookingItem={bookingItem} />}

        {completedData && (
          <PaymentSection
            stripePromise={stripePromise}
            scrollToUserForm={scrollToUserForm}
            bookingId={completedData.booking._id}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {isPaymentConfirmed &&
          completedData?.booking?._id &&
          orderData?.paymentIntentId && (
            <OAuth
              bookingId={completedData.booking._id}
              paymentIntentId={orderData.paymentIntentId}
              orderId={orderData.orderId}
              setProcessing={setProcessingOAuth}
              setIsPaymentConfirmed={setIsPaymentConfirmed}
            />
          )}
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
