// ── Auth ──────────────────────────────────────────────────────────────────
export interface AuthState {
  isAuthenticated: boolean;
  role: "admin" | "user" | null;
}

// ── Apartment ─────────────────────────────────────────────────────────────
export interface Apartment {
  _id: string;
  name: string;
  description: string;
  address: string;
  pricePerNight: number;
  maxGuests: number;
  images: string[];
  bookedDates: BookedDate[];
  amenities: ApartmentAmenities;
  areaImages: ApartmentAreaImages;
}

export interface BookedDate {
  _id: string;
  start: string;
  end: string;
}

export interface ApartmentAmenities {
  general: string[];
  kitchen: string[];
  bathroom: string[];
  outdoor: string[];
  laundry: string[];
}

export interface ApartmentAreaImages {
  bathroom: string[];
  kitchen: string[];
  bedroom: string[];
  balconyOrTerrace: string[];
}

// ── Booking ───────────────────────────────────────────────────────────────
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  _id: string;
  apartment: Apartment | string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  nights: number;
  accommodationPrice: number;
  cleaningFee: number;
  totalPrice: number;
  status: BookingStatus;
  notes?: string;
  bookingCode: string;
  createdAt?: string;
}

export interface AvailabilityResult {
  apartment: Apartment;
  nights: number;
  accommodationPrice: number;
  cleaningFee: number;
  totalPrice: number;
  guestsCount: number;
  checkIn: string;
  checkOut: string;
  status: "available" | "unavailable";
}

export interface AvailabilityResponse {
  results?: AvailabilityResult[];
  availabilityCheck?: {
    lodgify: string;
    internalDatabase: string;
    period: { startDate: string; endDate: string };
    lodgifyError?: string;
  };
  available?: false;
  message?: string;
  source?: string;
}

// id invece di _id — il BE restituisce id dal bookingMapper
export interface CompletedBooking {
  booking: {
    id: string;
    bookingCode: string;
    nights: number;
    accommodationPrice: number;
    cleaningFee: number;
    totalPrice: number;
    checkIn: string;
    checkOut: string;
    guestsCount: number;
    guestName: string;
    guestEmail: string;
  };
}

export interface CompleteBookingPayload {
  apartment: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  notes?: string;
}

// ── Order ─────────────────────────────────────────────────────────────────
export type OrderStatus = "pending" | "paid" | "failed";

export interface Order {
  orderId: string;
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  status: OrderStatus;
}

// ── Stepper booking ───────────────────────────────────────────────────────
export interface BookingFormData {
  checkIn: Date | null;
  checkOut: Date | null;
  guestsCount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes: string;
}
