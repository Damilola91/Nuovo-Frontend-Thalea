"use client";

import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import PaymentForm from "../PaymentForm/PaymentForm";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_12345...");

const Booking = () => {
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const dayCount =
    (selectedRange.endDate - selectedRange.startDate) / (1000 * 60 * 60 * 24) +
    1;
  const pricePerDay = 70;
  const totalPrice = dayCount * pricePerDay;

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Procedi con il pagamento");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="container mx-auto mt-20 flex-grow px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#46331d] text-center drop-shadow-lg">
          Prenota il tuo soggiorno
        </h1>

        {/* Calendario */}
        <section className="mb-12 max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4 text-[#46331d]">
            Seleziona le date
          </h2>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setSelectedRange(item.selection)}
            moveRangeOnFirstSelection={false}
            ranges={[selectedRange]}
            minDate={new Date()}
            rangeColors={["#46331d"]}
            className="mx-auto"
          />
        </section>

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
        <section className="mb-12 max-w-lg mx-auto bg-[#f3f1e7] p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-[#46331d]">
            Riepilogo prenotazione
          </h2>
          <p>
            Date selezionate:{" "}
            <span className="font-bold">
              {selectedRange.startDate.toLocaleDateString()} -{" "}
              {selectedRange.endDate.toLocaleDateString()}
            </span>
          </p>
          <p>
            Numero di notti: <span className="font-bold">{dayCount}</span>
          </p>
          <p>
            Prezzo per notte: <span className="font-bold">€{pricePerDay}</span>
          </p>
          <p className="mt-3 text-lg font-bold text-[#46331d]">
            Totale: €{totalPrice}
          </p>
        </section>

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

        {/* Bottone conferma per ora solo alert */}
        <div className="text-center mb-12">
          <button
            onClick={handleSubmit}
            className="bg-[#46331d] hover:bg-[#5a4621] text-white font-bold px-8 py-3 rounded-md transition-colors"
          >
            Procedi al pagamento
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
