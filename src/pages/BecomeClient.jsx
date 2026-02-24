// BecomeClient page.
// Guest registers a client account and is redirected to success page via auth state.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import "./BecomeClient.css";

const BecomeClient = () => {
  const { user, registerClientAccount } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") navigate("/admin", { replace: true });
    else if (user.role === "provider") navigate("/provider", { replace: true });
    else navigate("/client-registered", { replace: true });
  }, [user, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const u = username.trim();
    if (!u) return setError("Username is required.");
    if (!phone.trim()) return setError("Phone is required.");
    if (!password) return setError("Password is required.");

    const res = registerClientAccount({ username: u, phone, password });
    if (!res.ok) {
      setError(res.error || "Registration failed.");
      return;
    }
  };

  return (
    <section className="ca-page">
      <div className="ca-card">
        <h2 className="ca-title">Become a Client</h2>
        <p className="ca-sub">Create a client account to book home services.</p>

        <form className="ca-form" onSubmit={handleRegister}>
          <label className="field">
            <span className="label">Username</span>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. client"
            />
          </label>

          <label className="field">
            <span className="label">Phone (Uzbekistan)</span>
            <input
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 90 123 45 67"
            />
          </label>

          <label className="field">
            <span className="label">Password</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button className="btn btn-primary btn-full" type="submit">
            Create client account
          </button>
        </form>

        <div className="ca-divider" />

        <div className="ca-actions">
          <button className="btn btn-secondary btn-full" type="button" onClick={() => navigate("/login")}>
            I already have an account (Login)
          </button>

          <button className="btn btn-secondary btn-full" type="button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default BecomeClient;