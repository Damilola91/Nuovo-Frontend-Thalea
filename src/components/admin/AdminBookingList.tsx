"use client";

import { useState } from "react";
import type { Booking, BookingStatus } from "./adminTypes";

interface AdminBookingListProps {
  bookings: Booking[];
  onCancel: (apartmentId: string, bookingId: string) => Promise<void>;
}

const STATUS_LABELS: Record<BookingStatus, string> = {
  confirmed: "Confermata",
  pending: "In attesa",
  cancelled: "Cancellata",
};

const STATUS_COLORS: Record<BookingStatus, string> = {
  confirmed: "bg-[#4a6741]/15 text-[#4a6741]",
  pending: "bg-[#8a7a5b]/15 text-[#8a7a5b]",
  cancelled: "bg-red-100 text-red-600",
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" });
}

export function AdminBookingList({ bookings, onCancel }: AdminBookingListProps) {
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [cancelling, setCancelling] = useState<string | null>(null);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const handleCancel = async (b: Booking) => {
    if (!confirm(`Cancellare la prenotazione di ${b.guestName}?`)) return;
    setCancelling(b._id);
    try {
      const aptId = typeof b.apartment === "string" ? b.apartment : b.apartment._id;
      await onCancel(aptId, b._id);
    } finally {
      setCancelling(null);
    }
  };

  return (
    <div className="rounded-xl border border-[#e8e3d8] bg-white">
      {/* Filtri */}
      <div className="flex flex-wrap gap-2 border-b border-[#e8e3d8] p-4">
        {(["all", "confirmed", "pending", "cancelled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
              filter === s
                ? "bg-[#2e3d2f] text-[#f7f4ee]"
                : "border border-[#e8e3d8] text-[#5a6b5b] hover:bg-[#f7f4ee]"
            }`}
          >
            {s === "all" ? "Tutte" : STATUS_LABELS[s]}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#5a6b5b] self-center">{filtered.length} prenotazioni</span>
      </div>

      {/* Tabella */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8e3d8] text-xs text-[#5a6b5b]">
              <th className="px-4 py-3 text-left font-medium">Ospite</th>
              <th className="px-4 py-3 text-left font-medium">Check-in</th>
              <th className="px-4 py-3 text-left font-medium">Check-out</th>
              <th className="px-4 py-3 text-left font-medium">Notti</th>
              <th className="px-4 py-3 text-left font-medium">Totale</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Codice</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b._id} className="border-b border-[#e8e3d8] hover:bg-[#f7f4ee] transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-[#2e3d2f]">{b.guestName}</p>
                  <p className="text-xs text-[#5a6b5b]">{b.guestEmail}</p>
                </td>
                <td className="px-4 py-3 text-[#2e3d2f]">{fmt(b.checkIn)}</td>
                <td className="px-4 py-3 text-[#2e3d2f]">{fmt(b.checkOut)}</td>
                <td className="px-4 py-3 text-[#2e3d2f]">{b.nights}</td>
                <td className="px-4 py-3 font-medium text-[#2e3d2f]">€{b.totalPrice}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[b.status]}`}>
                    {STATUS_LABELS[b.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-[#5a6b5b] font-mono">{b.bookingCode.slice(0, 8)}…</td>
                <td className="px-4 py-3">
                  {b.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(b)}
                      disabled={cancelling === b._id}
                      className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                    >
                      {cancelling === b._id ? "…" : "Cancella"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-[#5a6b5b]">
                  Nessuna prenotazione
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}