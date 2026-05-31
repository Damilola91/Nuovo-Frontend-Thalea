"use client";

import { useState, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import { BookingSummary } from "./BookingSummmary";
import { StepDates } from "./StepDates";
import { StepGuests } from "./StepGuests";
import { StepDetails, type GuestData } from "./StepDetails";
import { StepPayment } from "./StepPayment";
import { StepConfirm } from "./StepConfirm";
import {
  checkAvailabilityAction,
  completeBookingAction,
  createPaymentAction,
} from "@/actions/bookingActions";
import type { CompletedBooking, AvailabilityResult } from "@/types/index";
import { usePaymentStore } from "@/store/bookingStore";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const STEPS = ["Date", "Ospiti", "Dati", "Pagamento", "Conferma"] as const;

const initialGuest: GuestData = {
  guestName: "",
  guestEmail: "",
  guestPhone: "",
  notes: "",
};

interface BookingStepperProps {
  occupiedDates: string[];
}

export function BookingStepper({ occupiedDates }: BookingStepperProps) {
  const t = useTranslations("booking");
  const { clientSecret, setPayment } = usePaymentStore();

  const [step, setStep] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guestsCount, setGuestsCount] = useState(2);
  const [guestData, setGuestData] = useState<GuestData>(initialGuest);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [completedBooking, setCompletedBooking] = useState<CompletedBooking | null>(null);
  const [loading, setLoading] = useState(false);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, Math.round((+checkOut - +checkIn) / 86_400_000));
  }, [checkIn, checkOut]);

  const pricePerNight = availability?.apartment.pricePerNight ?? 130;
  const cleaningFee = availability?.cleaningFee ?? 35;
  const accommodationPrice = availability?.accommodationPrice ?? Math.round(nights * pricePerNight * 100) / 100;
  const totalPrice = availability?.totalPrice ?? (nights > 0 ? accommodationPrice + cleaningFee : 0);

  const canNext = useMemo(() => {
    switch (step) {
      case 0: return nights >= 2 && !!checkIn && !!checkOut;
      case 1: return guestsCount >= 1 && guestsCount <= 2;
      case 2:
        return (
          guestData.guestName.trim().length > 0 &&
          /\S+@\S+\.\S+/.test(guestData.guestEmail) &&
          guestData.guestPhone.trim().length > 0
        );
      default: return true;
    }
  }, [step, nights, checkIn, checkOut, guestsCount, guestData]);

  const handleNext = async () => {
    if (step === 0) {
      setLoading(true);
      try {
        const ci = checkIn!.toISOString().split("T")[0];
        const co = checkOut!.toISOString().split("T")[0];
        const res = await checkAvailabilityAction(ci, co, guestsCount);
        if (res.available === false || !res.results?.length) {
          toast.error(res.message ?? t("notAvailable"));
          return;
        }
        const result = res.results.find((r) => r.status === "available");
        if (!result) { toast.error(t("notAvailable")); return; }
        setAvailability(result);
      } catch {
        toast.error(t("availabilityError"));
        return;
      } finally {
        setLoading(false);
      }
    }

    if (step === 2) {
      setLoading(true);
      try {
        const ci = checkIn!.toISOString().split("T")[0];
        const co = checkOut!.toISOString().split("T")[0];

        const booking = await completeBookingAction({
          apartment: availability!.apartment._id,
          guestName: guestData.guestName,
          guestEmail: guestData.guestEmail,
          guestPhone: guestData.guestPhone || undefined,
          checkIn: ci,
          checkOut: co,
          guestsCount,
          notes: guestData.notes || undefined,
        });
        setCompletedBooking(booking);

        // Usa booking.booking.id — il mapper BE usa id non _id
        const payment = await createPaymentAction(booking.booking.id);
        setPayment({
          clientSecret: payment.clientSecret,
          orderId: payment.orderId,
          paymentIntentId: payment.paymentIntentId,
        });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : t("errorComplete"));
        return;
      } finally {
        setLoading(false);
      }
    }

    setStep((s) => s + 1);
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <span className="text-xs uppercase tracking-[0.3em] text-[#5a6b5b]">
        {t("label")}
      </span>
      <h1
        className="mt-3 text-4xl text-[#2e3d2f] md:text-5xl"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {t("title")}
      </h1>

      <ol className="mt-10 flex items-center gap-2">
       {STEPS.map((label, i) => (
  <li key={label} className="flex flex-1 items-center gap-2">
    <div
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs transition-colors ${
        i < step || step === STEPS.length - 1  // ← aggiunto
          ? "border-[#4a6741] bg-[#4a6741] text-[#f7f4ee]"
          : i === step
            ? "border-[#4a6741] text-[#4a6741]"
            : "border-[#e8e3d8] text-[#5a6b5b]"
      }`}
    >
      {i < step || step === STEPS.length - 1 ? "✓" : i + 1}
    </div>
            <span className={`hidden text-xs md:inline ${i === step ? "text-[#2e3d2f]" : "text-[#5a6b5b]"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`h-px flex-1 transition-colors ${i < step ? "bg-[#4a6741]" : "bg-[#e8e3d8]"}`} />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_300px]">
        <div key={step} className="animate-fade-up">
          {step === 0 && (
            <StepDates
              checkIn={checkIn}
              checkOut={checkOut}
              occupiedDates={occupiedDates}
              onChange={(ci, co) => { setCheckIn(ci); setCheckOut(co); }}
            />
          )}
          {step === 1 && (
            <StepGuests value={guestsCount} onChange={setGuestsCount} />
          )}
          {step === 2 && (
            <StepDetails data={guestData} onChange={setGuestData} />
          )}
          {step === 3 && completedBooking && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StepPayment
                totalPrice={totalPrice}
                onSuccess={() => setStep(4)}
              />
            </Elements>
          )}
          {step === 4 && completedBooking && (
            <StepConfirm booking={completedBooking.booking} />
          )}

          {step < 4 && (
            <div className="mt-10 flex justify-between">
              <button
                disabled={step === 0}
                onClick={() => setStep((s) => s - 1)}
                className="rounded-full border border-[#e8e3d8] px-6 py-2.5 text-sm transition-colors hover:bg-[#eee9de] disabled:opacity-30"
              >
                {t("back")}
              </button>
              {step < 3 && (
                <button
                  disabled={!canNext || loading}
                  onClick={handleNext}
                  className="rounded-full bg-[#4a6741] px-6 py-2.5 text-sm font-medium text-[#f7f4ee] transition-transform hover:scale-[1.03] disabled:opacity-40 disabled:hover:scale-100"
                >
                  {loading ? t("loading") : t("continue")}
                </button>
              )}
            </div>
          )}
        </div>

        <BookingSummary
          data={{
            checkIn,
            checkOut,
            guestsCount,
            nights,
            pricePerNight,
            accommodationPrice,
            cleaningFee,
            totalPrice,
          }}
        />
      </div>
    </section>
  );
}