// ProviderProfile: provider fills company profile.
// Admin reviews profile and verifies/unverifies provider.
// ESLint-friendly: no setState inside useEffect.

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useProviders } from "../../hooks/useProviders.js";
import "./ProviderProfile.css";

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

const ProviderProfile = () => {
  const { user } = useAuth();
  const { upsertProviderProfile, getProviderByUsername } = useProviders();

  const existing = getProviderByUsername(user.username);

  const [companyName, setCompanyName] = useState(() => existing?.companyName || "");
  const [location, setLocation] = useState(() => existing?.location || "");
  const [phone, setPhone] = useState(() => existing?.phone || "");
  const [servicesText, setServicesText] = useState(() =>
    (existing?.services || []).join(", ")
  );

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    setSaved(false);

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

    upsertProviderProfile({
      username: user.username,
      companyName: companyName.trim(),
      location: location.trim(),
      phone: formatUzbPhone(normalized),
      services,
    });

    setPhone(formatUzbPhone(normalized));
    setSaved(true);
  };

  const handleReset = () => {
    const latest = getProviderByUsername(user.username);

    setCompanyName(latest?.companyName || "");
    setLocation(latest?.location || "");
    setPhone(latest?.phone || "");
    setServicesText((latest?.services || []).join(", "));
    setSaved(false);
    setError("");
  };

  return (
    <section className="pp">
      <h3 className="pp-title">Provider Profile</h3>

      {existing?.verified ? (
        <div className="pp-badge ok">Verified: you can work with clients</div>
      ) : (
        <div className="pp-badge warn">Not verified yet: waiting for admin approval</div>
      )}

      <form className="pp-form" onSubmit={handleSave}>
        <label className="field">
          <span className="label">Company name</span>
          <input
            className="input"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. FixPro Services"
          />
        </label>

        <label className="field">
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

        <label className="field">
          <span className="label">Services (comma separated)</span>
          <input
            className="input"
            value={servicesText}
            onChange={(e) => setServicesText(e.target.value)}
            placeholder="Plumbing, Electrical, Painting"
          />
        </label>

        {error && <div className="error">{error}</div>}
        {saved && <div className="pp-saved">Saved successfully.</div>}

        <div className="pp-actions">
          <button className="btn btn-primary btn-full" type="submit">
            Save profile
          </button>

          <button
            className="btn btn-secondary btn-full"
            type="button"
            onClick={handleReset}
          >
            Reset from saved profile
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProviderProfile;