// components/BookingDetails.jsx
"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {
  fetchBookingDetails,
  clearBookingDetails,
  selectBookingDetailsData,
  selectBookingDetailsLoading,
  selectBookingDetailsError,
} from "../../reducer/bookingSlice";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("it-IT", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const currency = (n) =>
  typeof n === "number"
    ? n.toLocaleString("it-IT", { style: "currency", currency: "EUR" })
    : n;

const statusStyle = (status) => {
  switch ((status || "").toLowerCase()) {
    case "confirmed":
    case "pagato":
      return "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200";
    case "pending":
    case "in_attesa":
      return "bg-amber-100 text-amber-800 ring-1 ring-amber-200";
    case "cancelled":
    case "cancellato":
      return "bg-rose-100 text-rose-800 ring-1 ring-rose-200";
    default:
      return "bg-slate-100 text-slate-800 ring-1 ring-slate-200";
  }
};

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700">
    {children}
  </span>
);

const SectionCard = ({ title, children, className = "" }) => (
  <section
    className={`rounded-2xl bg-white/90 backdrop-blur shadow-lg ring-1 ring-black/5 ${className}`}
  >
    <div className="px-6 py-5">
      {title && (
        <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
      )}
      {children}
    </div>
  </section>
);

const BookingDetails = ({ bookingId }) => {
  const dispatch = useDispatch();

  const booking = useSelector(selectBookingDetailsData);
  const loading = useSelector(selectBookingDetailsLoading);
  const error = useSelector(selectBookingDetailsError);

  const apartment = booking?.apartment ?? {};
  const heroImage = apartment?.images?.[0];

  useEffect(() => {
    if (bookingId) dispatch(fetchBookingDetails(bookingId));
    return () => dispatch(clearBookingDetails());
  }, [bookingId, dispatch]);

  const priceBreakdown = useMemo(() => {
    const nights = booking?.nights ?? 0;
    const ppn = apartment?.pricePerNight ?? null;
    const total = booking?.totalPrice ?? null;
    return { nights, ppn, total };
  }, [booking, apartment]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 mt-20">
        {/* Hero */}
        <div className="mx-auto max-w-6xl px-4 pt-8">
          <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
            <div className="relative h-72 w-full md:h-[24rem]">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt={apartment?.name || "Apartment image"}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-200">
                  <span className="text-slate-600">Nessuna immagine</span>
                </div>
              )}

              {/* overlay gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* top-right badges */}
              {booking?.status && (
                <div className="absolute right-4 top-4 flex gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium backdrop-blur ${statusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                  {booking?.bookingCode && (
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-800 ring-1 ring-black/5 backdrop-blur">
                      Codice: {booking.bookingCode}
                    </span>
                  )}
                </div>
              )}

              {/* bottom-left title/address */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <div className="max-w-4xl">
                  <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow md:text-4xl">
                    {apartment?.name || "Appartamento"}
                  </h1>
                  {apartment?.address && (
                    <p className="mt-2 text-sm text-white/90">
                      📍 {apartment.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* left column */}
            <div className="md:col-span-2 space-y-6">
              <SectionCard title="Dettagli soggiorno">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      Check-in
                    </div>
                    <div className="text-gray-900">
                      {booking?.checkIn ? formatDate(booking.checkIn) : "-"}
                      <span className="text-gray-500"> • ore 14:00</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      Check-out
                    </div>
                    <div className="text-gray-900">
                      {booking?.checkOut ? formatDate(booking.checkOut) : "-"}
                      <span className="text-gray-500"> • ore 10:00</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      Ospiti
                    </div>
                    <div className="text-gray-900">
                      {booking?.guestsCount ?? "-"}
                      {apartment?.maxGuests
                        ? ` / max ${apartment.maxGuests}`
                        : ""}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      Notti
                    </div>
                    <div className="text-gray-900">
                      {priceBreakdown.nights || "-"}
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="L’alloggio">
                {apartment?.description && (
                  <p className="mb-4 text-gray-700">{apartment.description}</p>
                )}

                {/* Amenities */}
                {Array.isArray(apartment?.amenities) &&
                  apartment.amenities.length > 0 && (
                    <>
                      <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        Servizi inclusi
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {apartment.amenities.map((a, idx) => (
                          <Pill key={idx}>{a}</Pill>
                        ))}
                      </div>
                    </>
                  )}
              </SectionCard>

              {/* Galleria (se ci sono più immagini) */}
              {Array.isArray(apartment?.images) &&
                apartment.images.length > 1 && (
                  <SectionCard title="Galleria">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {apartment.images.slice(0, 6).map((src, i) => (
                        <div
                          key={i}
                          className="overflow-hidden rounded-xl ring-1 ring-black/5"
                        >
                          <img
                            src={src}
                            alt={`${apartment?.name || "Foto"} ${i + 1}`}
                            className="h-32 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-40"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                )}
            </div>

            {/* right column */}
            <div className="space-y-6">
              <SectionCard title="Riepilogo prezzo" className="sticky top-8">
                <div className="space-y-3 text-gray-800">
                  <div className="flex items-center justify-between">
                    <span>
                      {apartment?.pricePerNight
                        ? `${currency(apartment.pricePerNight)} / notte`
                        : "Prezzo per notte"}
                    </span>
                    <span className="font-semibold">
                      {priceBreakdown.ppn !== null
                        ? currency(priceBreakdown.ppn)
                        : "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Notti</span>
                    <span className="font-semibold">
                      {priceBreakdown.nights || "-"}
                    </span>
                  </div>
                  <hr className="my-3 border-gray-200" />
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Totale</span>
                    <span>
                      {priceBreakdown.total !== null
                        ? currency(priceBreakdown.total)
                        : "-"}
                    </span>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Ospite">
                <div className="space-y-2 text-gray-800">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      Nome
                    </div>
                    <div className="font-medium">
                      {booking?.guestName || "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      Email
                    </div>
                    <div className="break-all">
                      {booking?.guestEmail || "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      Telefono
                    </div>
                    <div>{booking?.guestPhone || "-"}</div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Riferimenti">
                <div className="space-y-2 text-gray-800">
                  <div className="flex items-center justify-between">
                    <span>Codice prenotazione</span>
                    <span className="font-mono text-sm font-semibold">
                      {booking?.bookingCode || "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Stato</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle(
                        booking?.status
                      )}`}
                    >
                      {booking?.status || "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Creato il</span>
                    <span className="text-gray-700">
                      {booking?.createdAt ? formatDate(booking.createdAt) : "-"}
                    </span>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        </div>

        {/* Stati: loading / error / empty */}
        <div className="mx-auto max-w-6xl px-4 py-10">
          {loading && (
            <div className="rounded-2xl bg-white/70 p-6 text-center text-gray-500 shadow ring-1 ring-black/5">
              Caricamento dettagli prenotazione…
            </div>
          )}
          {error && (
            <div className="rounded-2xl bg-rose-50 p-6 text-center font-medium text-rose-700 shadow ring-1 ring-rose-100">
              {error}
            </div>
          )}
          {!loading && !error && !booking && (
            <div className="rounded-2xl bg-white p-6 text-center text-gray-600 shadow ring-1 ring-black/5">
              Nessuna prenotazione trovata.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BookingDetails;
