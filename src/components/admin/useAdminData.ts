"use client";

import { useState, useEffect, useCallback } from "react";
import type { Booking, Apartment, Offer } from "./adminTypes";

const API = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function normalizeId<T extends { id?: string; _id?: string }>(
  item: T,
): T & { _id: string } {
  return { ...item, _id: item._id ?? item.id ?? "" };
}

export function useAdminData() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [occupiedDates, setOccupiedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookingsRes, apartmentsRes, offersRes, occupiedRes] =
        await Promise.all([
          apiFetch<{ bookings: Booking[] }>("/api/bookings"),
          apiFetch<{ apartments: Apartment[] }>("/api/apartments"),
          apiFetch<{ offers: Offer[] }>("/api/offers"),
          apiFetch<{ occupiedDates: string[] }>("/api/bookings/occupied-dates"),
        ]);

      setBookings((bookingsRes.bookings ?? []).map(normalizeId));
      setApartment(
        (apartmentsRes.apartments ?? []).length > 0
          ? normalizeId(apartmentsRes.apartments[0])
          : null,
      );
      setOffers((offersRes.offers ?? []).map(normalizeId));
      setOccupiedDates(occupiedRes.occupiedDates ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore caricamento dati");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const cancelBooking = async (apartmentId: string, bookingId: string) => {
    await apiFetch(`/api/bookings/${apartmentId}/${bookingId}`, {
      method: "DELETE",
    });
    await fetchAll();
  };

  const updateApartment = async (id: string, data: Partial<Apartment>) => {
    await apiFetch(`/api/apartments/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    await fetchAll();
  };

  const createOffer = async (data: Omit<Offer, "_id">) => {
    await apiFetch("/api/offers", {
      method: "POST",
      body: JSON.stringify(data),
    });
    await fetchAll();
  };

  const updateOffer = async (id: string, data: Partial<Offer>) => {
    await apiFetch(`/api/offers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    await fetchAll();
  };

  const deleteOffer = async (id: string) => {
    await apiFetch(`/api/offers/${id}`, { method: "DELETE" });
    await fetchAll();
  };

  const sendNewsletter = async (subject: string, content: string) => {
    await apiFetch("/api/newsletter/send-newsletter", {
      method: "POST",
      body: JSON.stringify({ subject, content }),
    });
  };

  return {
    bookings,
    apartment,
    offers,
    occupiedDates,
    loading,
    error,
    refresh: fetchAll,
    cancelBooking,
    updateApartment,
    createOffer,
    updateOffer,
    deleteOffer,
    sendNewsletter,
  };
}
