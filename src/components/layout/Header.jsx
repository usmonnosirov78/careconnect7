import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">CARECONNECT</div>

      <nav className="header-nav">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>

        {!user && (
          <NavLink className="nav-link nav-primary" to="/login">
            Login
          </NavLink>
        )}

        {user?.role === "client" && (
          <NavLink className="nav-link" to="/booking">
            Booking
          </NavLink>
        )}

        {user?.role === "provider" && (
          <NavLink className="nav-link" to="/provider">
            Provider
          </NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink className="nav-link" to="/admin">
            Admin
          </NavLink>
        )}

        {user && (
          <button className="nav-link nav-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;