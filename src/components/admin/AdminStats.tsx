"use client";

import type { Booking } from "./adminTypes";

interface AdminStatsProps {
  bookings: Booking[];
}

export function AdminStats({ bookings }: AdminStatsProps) {
  const total = bookings.length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;

  const now = new Date();
  const monthlyRevenue = bookings
    .filter((b) => {
      const d = new Date(b.createdAt ?? b.checkIn);
      return b.status === "confirmed" &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const stats = [
    { label: "Totale prenotazioni", value: total, color: "bg-[#2e3d2f]" },
    { label: "Confermate", value: confirmed, color: "bg-[#4a6741]" },
    { label: "In attesa", value: pending, color: "bg-[#8a7a5b]" },
    { label: "Cancellate", value: cancelled, color: "bg-[#8b4444]" },
    { label: "Ricavo mensile", value: `€${monthlyRevenue}`, color: "bg-[#2e3d2f]" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {stats.map(({ label, value, color }) => (
        <div key={label} className={`${color} rounded-xl p-5 text-[#f7f4ee]`}>
          <p className="text-2xl font-medium" style={{ fontFamily: "Outfit, sans-serif" }}>
            {value}
          </p>
          <p className="mt-1 text-xs text-[#f7f4ee]/70">{label}</p>
        </div>
      ))}
    </div>
  );
}