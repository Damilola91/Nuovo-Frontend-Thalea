"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingList from "../../BookingList/BookingList";
import BookingStats from "../../BookingStats/BookingStats";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { fetchAllBookings } from "../../../reducer/bookingSlice";
import { fetchMe, selectUserRole } from "../../../reducer/authSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const role = useSelector(selectUserRole);

  // 🔹 Popola Redux con dati utente
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchAllBookings());
  };

  // 🔹 Controllo rapido accesso admin
  useEffect(() => {
    if (role && role !== "admin") {
      alert("Non hai i permessi per accedere a questa pagina");
      // eventualmente puoi fare un router.push("/") qui
    }
  }, [role]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Contenuto principale */}
      <main className="flex-1 p-4 sm:p-6 bg-gray-50 mt-14">
        <DashboardHeader title="Dashboard Admin" onRefresh={handleRefresh} />
        <BookingStats />
        <BookingList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
