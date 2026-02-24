// Client booking page.
// ProtectedRoute already handles access control (no Navigate needed here).
// Includes client profile: phone can be updated after registration.

import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useBooking } from "../hooks/useBooking.js";
import "./Booking.css";

const Booking = () => {
  const { user, updateClientPhone } = useAuth();
  const { data, addBooking } = useBooking();

  const [service, setService] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const [phone, setPhone] = useState(() => user?.phone || "");
  const [phoneMsg, setPhoneMsg] = useState("");

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!phone.trim()) return setError("Please enter your phone number first.");
    if (!service.trim()) return setError("Please enter a service name.");
    if (!address.trim()) return setError("Please enter an address.");
    if (!date) return setError("Please select a date.");
    if (!time) return setError("Please select a time.");

    const selected = new Date(`${date}T${time}`);
    const now = new Date();

    if (selected.getTime() < now.getTime()) {
      return setError("You cannot create a booking in the past.");
    }

    addBooking({
      client: user.username,
      phone: phone.trim(),
      service: service.trim(),
      address: address.trim(),
      date,
      time,
      notes: notes.trim(),
    });

    setService("");
    setAddress("");
    setDate("");
    setTime("");
    setNotes("");
  };

  const handlePhoneSave = (e) => {
    e.preventDefault();
    setPhoneMsg("");

    const res = updateClientPhone(phone);

    if (!res?.ok) {
      setPhoneMsg(res?.error || "Failed to update phone.");
      return;
    }

    setPhoneMsg("Phone updated successfully.");
  };

  const myBookings = data.filter((b) => b.client === user.username);

  return (
    <section className="booking-page">
      <div className="booking-card booking-wide">
        <h2 className="booking-title">Booking</h2>

        <p className="booking-sub">
          Logged in as <b>{user.username}</b>
        </p>

        <div className="booking-profile">
          <h3 className="booking-profile-title">Client Profile</h3>

          <form className="booking-profile-form" onSubmit={handlePhoneSave}>
            <label className="field">
              <span className="label">Phone</span>
              <input
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
              />
            </label>

            {phoneMsg && <div className="booking-profile-msg">{phoneMsg}</div>}

            <button className="btn btn-secondary btn-full" type="submit">
              Save phone
            </button>
          </form>
        </div>

        <form className="booking-form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span className="label">Service</span>
            <input
              className="input"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="label">Address</span>
            <input
              className="input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="label">Date</span>
            <input
              className="input"
              type="date"
              min={minDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="label">Time</span>
            <input
              className="input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>

          <label className="field field-full">
            <span className="label">Notes</span>
            <textarea
              className="input textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>

          {error && <div className="error field-full">{error}</div>}

          <button className="btn btn-primary btn-full field-full" type="submit">
            Create Booking
          </button>
        </form>

        <h3 className="booking-list-title">My Requests</h3>

        {myBookings.length === 0 ? (
          <div className="booking-empty">No bookings yet.</div>
        ) : (
          <div className="booking-list">
            {myBookings.map((b) => (
              <div key={b.id} className="booking-item booking-item-col">
                <div className="booking-item-top">
                  <div className="booking-item-title">{b.service}</div>
                  <div className={`booking-status status-${b.status}`}>
                    {b.status}
                  </div>
                </div>

                <div className="booking-meta">
                  <div>
                    <b>Address:</b> {b.address}
                  </div>
                  <div>
                    <b>Date:</b> {b.date} • <b>Time:</b> {b.time}
                  </div>
                  {b.notes && (
                    <div>
                      <b>Notes:</b> {b.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Booking;