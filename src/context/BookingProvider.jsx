import { useEffect, useState } from "react";
import { BookingContext } from "./bookingContext.js";
import { bookings as initialData } from "../services/bookingDB.js";

const STORAGE_KEY = "careconnect_bookings";

export const BookingProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initialData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addBooking = (payload) => {
    const newBooking = {
      id: Date.now(),
      client: payload.client,
      phone: payload.phone || "",
      service: payload.service,
      address: payload.address || "",
      date: payload.date || "",
      time: payload.time || "",
      notes: payload.notes || "",
      status: "pending",
      provider: "",
    };

    setData((prev) => [...prev, newBooking]);
  };

  const updateStatus = (id, status) => {
    setData((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const adminUpdateStatus = (id, nextStatus) => {
    const allowed = ["pending", "accepted", "rejected", "completed"];
    if (!allowed.includes(nextStatus)) return;

    setData((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;

        if (nextStatus === "pending") {
          return { ...b, status: "pending", provider: "" };
        }

        return { ...b, status: nextStatus };
      })
    );
  };

  const claimBooking = (id, providerUsername) => {
    setData((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        if (b.status !== "pending") return b;
        if (b.provider) return b;
        return { ...b, status: "accepted", provider: providerUsername };
      })
    );
  };

  const completeBooking = (id, providerUsername) => {
    setData((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        if (b.provider !== providerUsername) return b;
        if (b.status !== "accepted") return b;
        return { ...b, status: "completed" };
      })
    );
  };

  const reopenBooking = (id, providerUsername) => {
    setData((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        if (b.provider !== providerUsername) return b;
        if (b.status !== "completed") return b;
        return { ...b, status: "accepted" };
      })
    );
  };

  const cancelBooking = (id, providerUsername) => {
    setData((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        if (b.provider !== providerUsername) return b;
        if (b.status !== "accepted") return b;
        return { ...b, status: "pending", provider: "" };
      })
    );
  };

  return (
    <BookingContext.Provider
      value={{
        data,
        addBooking,
        updateStatus,
        adminUpdateStatus,
        claimBooking,
        completeBooking,
        reopenBooking,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};