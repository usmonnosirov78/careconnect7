import { useContext } from "react";
import { BookingContext } from "../context/bookingContext.js";

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};