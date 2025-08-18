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

  // stato della checkbox del form utente
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  // ref per scrollare all'inizio del form utente
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

  // Validazione semplice dei campi
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
    // controllino email semplice
    const emailOk = /\S+@\S+\.\S+/.test(userData.email);
    if (!emailOk) {
      toast.error("Inserisci un'email valida.");
      scrollToUserForm();
      return false;
    }
    return true;
  };

  // Chiamata che deve partire quando l'utente spunta la checkbox in UserForm
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
      // Non tocchiamo lo stato della checkbox: rimane selezionata
      toast.success("Dati confermati, prenotazione creata.");
    } catch (err) {
      console.error(err);
      toast.error("Errore nel completamento della prenotazione.");
    }
  };

  // viene chiamato da UserForm a ogni cambio della checkbox
  const handleCheckboxChange = (isChecked) => {
    setCheckboxChecked(isChecked);
    if (isChecked) {
      // al primo click su true parte la prenotazione
      handleCompleteBooking();
    }
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

        <PaymentSection
          stripePromise={stripePromise}
          scrollToUserForm={scrollToUserForm}
        />

        {completedLoading && (
          <p className="text-center">Completamento prenotazione in corso...</p>
        )}
        {completedError && (
          <p className="text-center text-red-500">Errore: {completedError}</p>
        )}
        {completedData && (
          <p className="text-center text-green-600">
            Prenotazione creata, procedi al pagamento.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
