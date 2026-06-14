"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useAdminData } from "./useAdminData";
import { AdminStats } from "./AdminStats";
import { AdminCalendar } from "./AdminCalendar";
import { AdminBookingList } from "./AdminBookingList";
import { AdminApartment } from "./AdminApartment";
import { AdminOffers } from "./AdminOffers";
import { AdminNewsletter } from "./AdminNewsletter";
import { RefreshCw } from "lucide-react";

type Tab = "prenotazioni" | "calendario" | "appartamento" | "offerte" | "newsletter";

const TABS: { key: Tab; label: string }[] = [
  { key: "prenotazioni", label: "Prenotazioni" },
  { key: "calendario", label: "Calendario" },
  { key: "appartamento", label: "Appartamento" },
  { key: "offerte", label: "Offerte" },
  { key: "newsletter", label: "Newsletter" },
];

export function AdminDashboard() {
  const { role } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>("prenotazioni");
  const {
    bookings, apartment, offers, occupiedDates,
    loading, error, refresh,
    cancelBooking, updateApartment,
    createOffer, updateOffer, deleteOffer,
    sendNewsletter,
  } = useAdminData();

  if (role && role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-[#5a6b5b]">Accesso non autorizzato.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#5a6b5b]">Admin</span>
          <h1 className="mt-2 text-3xl text-[#2e3d2f]" style={{ fontFamily: "Outfit, sans-serif" }}>
            Dashboard
          </h1>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-2 rounded-full border border-[#e8e3d8] px-4 py-2 text-sm text-[#5a6b5b] transition-colors hover:bg-[#f7f4ee] disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Aggiorna
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="mb-8">
        <AdminStats bookings={bookings} />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-[#e8e3d8] bg-[#f7f4ee] p-1">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm transition-colors ${
              activeTab === key
                ? "bg-white font-medium text-[#2e3d2f] shadow-sm"
                : "text-[#5a6b5b] hover:text-[#2e3d2f]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Contenuto tab */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <p className="text-sm text-[#5a6b5b]">Caricamento…</p>
        </div>
      ) : (
        <>
          {activeTab === "prenotazioni" && (
            <AdminBookingList bookings={bookings} onCancel={cancelBooking} />
          )}
          {activeTab === "calendario" && (
            <AdminCalendar occupiedDates={occupiedDates} />
          )}
          {activeTab === "appartamento" && (
            <AdminApartment apartment={apartment} onUpdate={updateApartment} />
          )}
          {activeTab === "offerte" && (
            <AdminOffers
              offers={offers}
              onCreate={createOffer}
              onUpdate={updateOffer}
              onDelete={deleteOffer}
            />
          )}
          {activeTab === "newsletter" && (
            <AdminNewsletter onSend={sendNewsletter} />
          )}
        </>
      )}
    </div>
  );
}