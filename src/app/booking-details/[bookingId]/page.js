"use client";

import { useParams } from "next/navigation";
import BookingDetails from "../../../components/BookingDetails/BookingDetails";

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  return <BookingDetails bookingId={bookingId} />;
};

export default BookingDetailsPage;
