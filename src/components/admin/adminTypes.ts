import type { Amenities } from "@/types/amenityTypes";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  _id: string;
  id?: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  apartment: { _id: string; name: string } | string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  nights: number;
  accommodationPrice?: number;
  cleaningFee: number;
  totalPrice: number;
  status: BookingStatus;
  bookingCode: string;
  notes?: string;
  createdAt?: string;
}

export interface Apartment {
  _id: string;
  id?: string;
  name: string;
  description: string;
  address: string;
  pricePerNight: number;
  maxGuests: number;
  images: string[];
  areaImages: {
    bathroom: string[];
    kitchen: string[];
    bedroom: string[];
    balconyOrTerrace: string[];
  };
  /** Amenities multilingua — ogni voce ha `it` obbligatorio + 5 lingue opzionali */
  amenities: Amenities;
}

export interface Offer {
  _id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validFrom: string;
  validTo: string;
  active: boolean;
}
