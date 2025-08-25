"use client";

import BookingList from "../../BookingList/BookingList";
import BookingStats from "../../BookingStats/BookingStats";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { useDispatch } from "react-redux";
import { fetchAllBookings } from "../../../reducer/bookingSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(fetchAllBookings());
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Contenuto principale */}
      <main className="flex-1 p-6 bg-gray-50 mt-14">
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
