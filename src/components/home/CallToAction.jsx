// CallToAction section.
// Shows different content depending on role.

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import "./CallToAction.css";

const CallToAction = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role;

  // Admin block (clean, no support contacts)
  if (role === "admin") {
    return (
      <section className="cta cta-admin">
        <h2 className="cta-title">Welcome, Admin. </h2>
        <p className="cta-sub">You are logged in successfully. Have a productive day.</p>
      </section>
    );
  }

  // Provider support block
  if (role === "provider") {
    return (
      <section className="cta cta-support">
        <h2 className="cta-title">Need help with your account?</h2>
        <p className="cta-sub">
          If you have issues with verification, profile, or bookings, contact support.
        </p>

        <div className="cta-contact">
          <div>
            <b>Email:</b> support@careconnect.example
          </div>
          <div>
            <b>Phone:</b> +998 90 000 00 00
          </div>
          <div>
            <b>Hours:</b> Mon–Fri, 9:00–18:00
          </div>
        </div>
      </section>
    );
  }

  // Client block with action button
  if (role === "client") {
    return (
      <section className="cta cta-success">
        <h2 className="cta-title">
          Welcome back, <span className="cta-username">{user.username}</span> 👋
        </h2>

        <p className="cta-sub">
          You are already logged in. Thank you for choosing CareConnect.
        </p>

        <div className="cta-actions">
          <button className="cta-btn" onClick={() => navigate("/booking")}>
            Go to My Bookings
          </button>
        </div>

        <div className="cta-contact">
          <div>
            <b>Need help?</b>
          </div>
          <div>
            <b>Email:</b> support@careconnect.example
          </div>
          <div>
            <b>Phone:</b> +998 90 000 00 00
          </div>
        </div>
      </section>
    );
  }

  // Guest CTA
  return (
    <section className="cta">
      <h2 className="cta-title">Ready to book a service?</h2>
      <p className="cta-sub">
        Create an account and start booking trusted professionals.
      </p>

      <button className="cta-btn" onClick={() => navigate("/become-client")}>
        Create Account
      </button>
    </section>
  );
};

export default CallToAction;