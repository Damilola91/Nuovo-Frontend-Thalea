"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import PaymentForm from "../PaymentForm/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {
  selectAvailabilityData,
  selectCompletedData,
  selectCompletedLoading,
  selectCompletedError,
  completeBooking,
} from "../../reducer/bookingSlice";

const stripePromise = loadStripe("pk_test_12345...");

const Booking = () => {
  const dispatch = useDispatch();

  // Recupera i dati persistiti dal CalendarSelector
  const availabilityData = useSelector(selectAvailabilityData);
  const completedData = useSelector(selectCompletedData);
  const completedLoading = useSelector(selectCompletedLoading);
  const completedError = useSelector(selectCompletedError);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!availabilityData.length) {
      return alert("Nessuna disponibilità trovata.");
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

  // Usa il primo elemento disponibile per il riepilogo
  const bookingItem = availabilityData[0];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="container mx-auto mt-20 flex-grow px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#46331d] text-center drop-shadow-lg">
          Prenota il tuo soggiorno
        </h1>

        {/* Form dati utente */}
        <section className="mb-12 max-w-lg mx-auto bg-[#f3f1e7] p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-[#46331d] text-center">
            I tuoi dati
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-medium text-[#46331d]"
              >
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleUserChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#46331d] bg-white"
                placeholder="Mario Rossi"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-[#46331d]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleUserChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#46331d] bg-white"
                placeholder="mario@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-1 font-medium text-[#46331d]"
              >
                Telefono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleUserChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#46331d] bg-white"
                placeholder="+39 123 456 7890"
              />
            </div>
          </form>
        </section>

        {/* Riepilogo prenotazione */}
        {bookingItem && (
          <section className="mb-12 max-w-lg mx-auto bg-[#f3f1e7] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-[#46331d]">
              Riepilogo prenotazione
            </h2>
            <p>
              Appartamento:{" "}
              <span className="font-bold">{bookingItem.apartment.name}</span>
            </p>
            <p>
              Date selezionate:{" "}
              <span className="font-bold">
                {new Date(bookingItem.checkIn).toLocaleDateString()} -{" "}
                {new Date(bookingItem.checkOut).toLocaleDateString()}
              </span>
            </p>
            <p>
              Numero di notti:{" "}
              <span className="font-bold">{bookingItem.nights}</span>
            </p>
            <p>
              Prezzo per notte:{" "}
              <span className="font-bold">
                €{bookingItem.apartment.pricePerNight}
              </span>
            </p>
            <p className="mt-3 text-lg font-bold text-[#46331d]">
              Totale: €{bookingItem.totalPrice}
            </p>
          </section>
        )}

        {/* PaymentForm inserito dentro Elements */}
        <section className="mb-12 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-[#46331d] text-center">
            Pagamento
          </h2>
          <div className="shadow-md rounded-md">
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </div>
        </section>

        {/* Bottone conferma */}
        <div className="text-center mb-12">
          <button
            onClick={handleSubmit}
            className="bg-[#46331d] hover:bg-[#5a4621] text-white font-bold px-8 py-3 rounded-md transition-colors"
          >
            Procedi al pagamento
          </button>
        </div>

        {/* Stato completamento prenotazione */}
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
