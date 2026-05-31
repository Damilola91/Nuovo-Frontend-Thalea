"use server";

import type {
  AvailabilityResponse,
  CompleteBookingPayload,
  CompletedBooking,
} from "@/types/index";

const API = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const checkAvailabilityAction = async (
  checkIn: string,
  checkOut: string,
  guestsCount: number,
): Promise<AvailabilityResponse> => {
  const res = await fetch(`${API}/api/bookings/check-availability`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ checkIn, checkOut, guestsCount }),
    cache: "no-store",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? "Errore nel controllo disponibilità");
  }
  return res.json();
};

export const fetchOccupiedDatesAction = async (): Promise<{
  occupiedDates: string[];
}> => {
  const res = await fetch(`${API}/api/bookings/occupied-dates`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Errore nel recupero delle date occupate");
  return res.json();
};

export const completeBookingAction = async (
  payload: CompleteBookingPayload,
): Promise<CompletedBooking> => {
  const res = await fetch(`${API}/api/bookings/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? "Errore nella prenotazione");
  }
  return res.json();
};

export const createPaymentAction = async (
  bookingId: string,
): Promise<{
  clientSecret: string;
  orderId: string;
  paymentIntentId: string;
}> => {
  const res = await fetch(`${API}/api/orders/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingId, paymentMethod: "card" }),
    cache: "no-store",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? "Errore nella creazione del pagamento");
  }
  return res.json();
};
