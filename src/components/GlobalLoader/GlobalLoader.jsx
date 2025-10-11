"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// 🔹 Selettori slice principali
import {
  selectAvailabilityLoading,
  selectCompletedLoading,
  selectConfirmedLoading,
  selectBookingDetailsLoading,
  selectAllBookingsLoading,
  selectDeletedBookingLoading,
  selectOccupiedDatesLoading,
} from "../../reducer/bookingSlice";

import { selectOrderLoading } from "../../reducer/orderSlice";

const GlobalLoader = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 🔹 Tutti i loading da Redux
  const availabilityLoading = useSelector(selectAvailabilityLoading);
  const completedLoading = useSelector(selectCompletedLoading);
  const confirmedLoading = useSelector(selectConfirmedLoading);
  const bookingDetailsLoading = useSelector(selectBookingDetailsLoading);
  const allBookingsLoading = useSelector(selectAllBookingsLoading);
  const deletedBookingLoading = useSelector(selectDeletedBookingLoading);
  const occupiedDatesLoading = useSelector(selectOccupiedDatesLoading);

  const orderLoading = useSelector(selectOrderLoading);

  // 🔹 Qualsiasi slice sta caricando?
  const loadingRedux =
    availabilityLoading ||
    completedLoading ||
    confirmedLoading ||
    bookingDetailsLoading ||
    allBookingsLoading ||
    deletedBookingLoading ||
    occupiedDatesLoading ||
    orderLoading;

  useEffect(() => {
    let timer;
    if (loadingRedux) {
      setIsVisible(true);
    } else {
      timer = setTimeout(() => setIsVisible(false), 700);
    }
    return () => clearTimeout(timer);
  }, [loadingRedux]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f8f5f0]/90 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center space-y-6 relative"
        >
          {/* Halo luminoso */}
          <motion.div
            className="absolute rounded-full bg-[#46331d]/20"
            style={{ width: 260, height: 260 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo Thălēa animato */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <Image
              src="https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg"
              alt="Thălēa Palermo Apartment"
              width={180}
              height={180}
              className="drop-shadow-md rounded-full"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-[#46331d] font-medium text-lg tracking-wide relative z-10"
          >
            Thălēa is loading...
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalLoader;
