// Provider page (route: /provider).
// Access is controlled by ProtectedRoute.
// Provider can login even if not verified.
// Only verified providers can see the dashboard.

import ProviderProfile from "../components/provider/ProviderProfile.jsx";
import ProviderDashboard from "../components/provider/ProviderDashboard.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useProviders } from "../hooks/useProviders.js";
import "./BecomeProvider.css"; 

const Provider = () => {
  const { user } = useAuth();
  const { getProviderByUsername } = useProviders();

  const profile = getProviderByUsername(user?.username);

  const profileCompleted =
    !!profile?.companyName?.trim() &&
    !!profile?.location?.trim() &&
    !!profile?.phone?.trim();

  const isVerified = !!profile?.verified;
  const canSeeDashboard = profileCompleted && isVerified;

  return (
    <section style={{ width: "100%" }}>
      <div style={{ padding: "18px 40px 0" }}>
        <h2 style={{ margin: 0, color: "#111827" }}>Provider Area</h2>

        {!profile ? (
          <div style={{ marginTop: 12 }}>
            Please complete your profile to submit it for admin review.
          </div>
        ) : !profileCompleted ? (
          <div style={{ marginTop: 12 }}>
            Please complete all required fields and save your profile.
          </div>
        ) : !isVerified ? (
          <div style={{ marginTop: 12 }}>
            Profile submitted. Waiting for admin approval.
          </div>
        ) : (
          <div style={{ marginTop: 12 }}>
            Verified. You can now accept bookings.
          </div>
        )}
      </div>

      <ProviderProfile />

      {canSeeDashboard ? <ProviderDashboard /> : null}
    </section>
  );
};

export default Provider;