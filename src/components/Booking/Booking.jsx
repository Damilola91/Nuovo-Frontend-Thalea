"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { loadStripe } from "@stripe/stripe-js";

import {
  selectAvailabilityData,
  selectCompletedData,
  selectCompletedLoading,
  selectCompletedError,
  completeBooking,
} from "../../reducer/bookingSlice";

import UserForm from "../UserForm/UserForm";
import BookingSummary from "../BookingSummary/BookingSummary";
import PaymentSection from "../PaymentSection/PaymentSection";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET);

const Booking = () => {
  const dispatch = useDispatch();

  const availabilityData = useSelector(selectAvailabilityData);
  const completedData = useSelector(selectCompletedData);
  const completedLoading = useSelector(selectCompletedLoading);
  const completedError = useSelector(selectCompletedError);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleValidatedSubmit = async () => {
    if (!availabilityData.length) {
      return alert("Nessuna disponibilità trovata.");
    }

    if (!checkboxChecked) {
      alert("Devi accettare i termini per completare la prenotazione.");
      return;
    }

    const bookingItem = availabilityData[0];

    await dispatch(
      completeBooking({
        apartment: bookingItem.apartment._id,
        guestName: userData.name,
        guestEmail: userData.email,
        guestPhone: userData.phone,
        checkIn: bookingItem.checkIn,
        checkOut: bookingItem.checkOut,
        guestsCount: bookingItem.guestsCount,
      })
    );
  };

  const bookingItem = availabilityData[0];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="container mx-auto mt-20 flex-grow px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#46331d] text-center drop-shadow-lg">
          Prenota il tuo soggiorno
        </h1>

        <UserForm
          userData={userData}
          handleUserChange={handleUserChange}
          onCheckboxChange={setCheckboxChecked} // passa al padre lo stato
          onValidSubmit={handleValidatedSubmit} // chiamata quando checkbox selezionata
        />

        {bookingItem && <BookingSummary bookingItem={bookingItem} />}

        <PaymentSection
          stripePromise={stripePromise}
          onAttemptPayment={handleValidatedSubmit} // chiama la validazione anche se scroll
        />

        {completedLoading && <p>Completamento prenotazione in corso...</p>}
        {completedError && (
          <p className="text-red-500">Errore: {completedError}</p>
        )}
        {completedData && (
          <p className="text-green-500">Prenotazione completata!</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
