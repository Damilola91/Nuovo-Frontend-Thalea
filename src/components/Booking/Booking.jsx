"use client";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import UserForm from "../UserForm/UserForm";
import BookingSummary from "../BookingSummary/BookingSummary";
import PaymentSection from "../PaymentSection/PaymentSection";
import TouristTaxInfo from "../TouristTaxInfo/TouristTaxInfo";
import OAuth from "../OAuth/OAuth";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  selectAvailabilityData,
  selectCompletedData,
  completeBooking,
} from "../../reducer/bookingSlice";
import { selectOrderData } from "../../reducer/orderSlice";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET);

const Booking = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const availabilityData = useSelector(selectAvailabilityData) || {};
  const completedData = useSelector(selectCompletedData);
  const orderData = useSelector(selectOrderData);

  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [processingOAuth, setProcessingOAuth] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  const userFormRef = useRef(null);
  const bookingItem = availabilityData?.data?.[0];

  const scrollToUserForm = () => {
    if (userFormRef.current) {
      userFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateUserData = () => {
    if (
      !userData.name?.trim() ||
      !userData.email?.trim() ||
      !userData.phone?.trim()
    ) {
      toast.error(t("booking.fillAllFields"));
      scrollToUserForm();
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      toast.error(t("booking.invalidEmail"));
      scrollToUserForm();
      return false;
    }
    return true;
  };

  const handleCompleteBooking = async () => {
    if (!availabilityData?.data?.length) {
      toast.error(t("booking.noAvailability"));
      scrollToUserForm();
      return;
    }

    if (!validateUserData()) return;

    const item = availabilityData.data[0];

    try {
      await dispatch(
        completeBooking({
          apartment: item.apartment._id,
          guestName: userData.name,
          guestEmail: userData.email,
          guestPhone: userData.phone,
          checkIn: item.checkIn,
          checkOut: item.checkOut,
          guestsCount: item.guestsCount,
        })
      );
      toast.success(t("booking.dataConfirmed"));
    } catch (err) {
      console.error(err);
      toast.error(t("booking.errorComplete"));
    }
  };

  const handleCheckboxChange = (isChecked) => {
    setCheckboxChecked(isChecked);
    if (isChecked) handleCompleteBooking();
  };

  const handlePaymentSuccess = (paymentIntentId) => {
    setIsPaymentConfirmed(true);
    setProcessingOAuth(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="container mx-auto mt-20 flex-grow px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#46331d] text-center drop-shadow-lg">
          {t("booking.title")}
        </h1>

        {bookingItem && <BookingSummary bookingItem={bookingItem} />}

        <UserForm
          ref={userFormRef}
          userData={userData}
          handleUserChange={handleUserChange}
          onCheckboxChange={handleCheckboxChange}
        />

        <TouristTaxInfo />

        <PaymentSection
          stripePromise={stripePromise}
          scrollToUserForm={scrollToUserForm}
          bookingId={completedData?.booking?._id || null}
          onPaymentSuccess={handlePaymentSuccess}
          disabled={
            !completedData?.booking?._id ||
            processingOAuth ||
            isPaymentConfirmed
          }
        />

        {isPaymentConfirmed &&
          completedData?.booking?._id &&
          orderData?.paymentIntentId && (
            <OAuth
              bookingId={completedData.booking._id}
              paymentIntentId={orderData.paymentIntentId}
              orderId={orderData.orderId}
              setProcessing={setProcessingOAuth}
              setIsPaymentConfirmed={setIsPaymentConfirmed}
            />
          )}
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
