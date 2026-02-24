// BecomeProvider page.
// Creates provider user account + initial provider profile (phone validated).
// After success: redirects to /provider (pending status until admin verifies).

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useProviders } from "../hooks/useProviders.js";
import "./BecomeProvider.css";

const normalizeUzbPhone = (raw) => {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.length === 9) return `998${digits}`;
  if (digits.length === 12 && digits.startsWith("998")) return digits;
  return null;
};

const formatUzbPhone = (digits12) => {
  if (!digits12 || digits12.length !== 12) return "";
  return `+${digits12.slice(0, 3)} ${digits12.slice(3, 5)} ${digits12.slice(
    5,
    8
  )} ${digits12.slice(8, 10)} ${digits12.slice(10, 12)}`;
};

const BecomeProvider = () => {
  const navigate = useNavigate();
  const { registerProviderAccount } = useAuth();
  const { upsertProviderProfile } = useProviders();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [servicesText, setServicesText] = useState("");

  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setOk(false);

    if (!username.trim()) return setError("Username is required.");
    if (!password) return setError("Password is required.");

    if (!companyName.trim()) return setError("Company name is required.");
    if (!location.trim()) return setError("Location is required.");
    if (!phone.trim()) return setError("Phone is required.");

    const normalized = normalizeUzbPhone(phone);
    if (!normalized) {
      return setError("Phone must be a valid Uzbekistan number. Example: +998 90 123 45 67");
    }

    const services = servicesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (services.length === 0) {
      return setError("Please enter at least one service (comma separated).");
    }

    const reg = registerProviderAccount({
      username: username.trim(),
      password,
    });

    if (!reg.ok) {
      setError(reg.error || "Registration failed.");
      return;
    }

    // Create initial provider profile (pending verification by default)
    upsertProviderProfile({
      username: username.trim(),
      companyName: companyName.trim(),
      location: location.trim(),
      phone: formatUzbPhone(normalized),
      services,
    });

    setOk(true);

    // Redirect to provider area (status will show "waiting for approval")
    navigate("/provider");
  };

  return (
    <section className="bp">
      <div className="bp-card">
        <h2 className="bp-title">Become a Provider</h2>
        <p className="bp-sub">
          Create a provider account, fill in company details, then wait for admin verification.
        </p>

        <form className="bp-form" onSubmit={handleSubmit}>
          <div className="bp-grid">
            <label className="field">
              <span className="label">Username</span>
              <input
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. fixpro"
              />
            </label>

            <label className="field">
              <span className="label">Password</span>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </label>

            <label className="field field-full">
              <span className="label">Company name</span>
              <input
                className="input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. FixPro Services"
              />
            </label>

            <label className="field field-full">
              <span className="label">Location</span>
              <input
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Tashkent, Yakkasaray"
              />
            </label>

            <label className="field">
              <span className="label">Phone (Uzbekistan)</span>
              <input
                className="input"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
              />
            </label>

            <label className="field field-full">
              <span className="label">Services (comma separated)</span>
              <input
                className="input"
                value={servicesText}
                onChange={(e) => setServicesText(e.target.value)}
                placeholder="Plumbing, Electrical, Painting"
              />
            </label>
          </div>

          {error && <div className="error">{error}</div>}
          {ok && <div className="bp-ok">Account created. Redirecting…</div>}

          <button className="btn btn-primary btn-full" type="submit">
            Create provider account
          </button>
        </form>
      </div>
    </section>
  );
};

export default BecomeProvider;