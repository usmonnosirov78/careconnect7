// ClientRegistered page.
// Shown right after a client successfully registers.

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import "./ClientRegistered.css";

const ClientRegistered = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="cr-page">
      <div className="cr-card">
        <h2 className="cr-title">You have successfully registered</h2>

        <p className="cr-sub">
          Welcome, <b>{user?.username}</b>. Your client account is ready.
        </p>

        <button className="btn btn-primary btn-full" onClick={() => navigate("/booking")}>
          Go to Booking
        </button>

        <button className="btn btn-secondary btn-full" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </section>
  );
};

export default ClientRegistered;