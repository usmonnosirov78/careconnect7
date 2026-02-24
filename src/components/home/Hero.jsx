import { useAuth } from "../../hooks/useAuth.js";
import "./Hero.css";

const Hero = ({ onBookService, onBecomeProvider }) => {
  const { user } = useAuth();

  const isGuest = !user;
  const isProvider = user?.role === "provider";
  const isAdmin = user?.role === "admin";

  return (
    <section className="hero">
      <h1>Book Verified Home Repair Pros</h1>

      <p>
        CareConnect helps you find trusted specialists, schedule services, and
        track bookings in one place.
      </p>

      {/* Welcome */}
      {user && (
        <div className="hero-welcome">
          Welcome back, <b>{user.username}</b>
        </div>
      )}

      {/* Actions ONLY for guests */}
      {isGuest && (
        <div className="hero-actions">
          <button className="btn-primary" onClick={onBookService}>
            Book a Service
          </button>

          <button className="btn-secondary" onClick={onBecomeProvider}>
            Become a Provider
          </button>
        </div>
      )}

      {/* Provider/Admin note */}
      {(isProvider || isAdmin) && (
        <div className="hero-note">
          Manage your dashboard using the navigation above.
        </div>
      )}
    </section>
  );
};

export default Hero;