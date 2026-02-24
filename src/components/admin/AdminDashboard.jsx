import { useAuth } from "../../hooks/useAuth.js";
import { useBooking } from "../../hooks/useBooking.js";
import { useProviders } from "../../hooks/useProviders.js";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const {
    getUserByUsername,
    adminListAccounts,
    adminResetPassword,
    adminDeleteAccount,
  } = useAuth();

  const { data, adminUpdateStatus } = useBooking();
  const { list, setProviderVerified } = useProviders();

  const total = data.length;
  const pending = data.filter((b) => b.status === "pending").length;
  const accepted = data.filter((b) => b.status === "accepted").length;
  const completed = data.filter((b) => b.status === "completed").length;
  const rejected = data.filter((b) => b.status === "rejected").length;

  const accounts = adminListAccounts?.() || [];
  const clients = accounts.filter((a) => a.role === "client");
  const providers = accounts.filter((a) => a.role === "provider");

  const handleResetPassword = (username) => {
    const res = adminResetPassword(username);
    if (!res?.ok) return alert(res?.error || "Failed to reset password.");
    alert(`Temporary password for ${username}: ${res.tempPassword}`);
  };

  const handleDelete = (username) => {
    const res = adminDeleteAccount(username);
    if (!res?.ok) return alert(res?.error || "Failed to delete user.");
    alert(`Deleted: ${username}`);
  };

  const getClientPhone = (booking) => {
    if (booking.phone) return booking.phone;
    const u = getUserByUsername?.(booking.client);
    return u?.phone || "—";
  };

  return (
    <section className="admin">
      <h2>Admin Dashboard</h2>

      <div className="admin-stats">
        <div className="stat">
          Total: <b>{total}</b>
        </div>
        <div className="stat">
          Pending: <b>{pending}</b>
        </div>
        <div className="stat">
          Accepted: <b>{accepted}</b>
        </div>
        <div className="stat">
          Completed: <b>{completed}</b>
        </div>
        <div className="stat">
          Rejected: <b>{rejected}</b>
        </div>
      </div>

      <div className="admin-block">
        <h3>Provider Verification</h3>

        {list.length === 0 ? (
          <div className="empty">No providers available yet.</div>
        ) : (
          <div className="admin-grid">
            {list.map((p) => (
              <div key={p.id} className="card">
                <div className="card-title">
                  {p.companyName?.trim() ? p.companyName : "Company not set yet"}
                </div>

                <div className="card-meta">@{p.username}</div>

                <div className="admin-provider-info">
                  <div>
                    <b>Location:</b> {p.location || "—"}
                  </div>
                  <div>
                    <b>Phone:</b> {p.phone || "—"}
                  </div>
                  <div>
                    <b>Services:</b>{" "}
                    {p.services?.length ? p.services.join(", ") : "—"}
                  </div>
                </div>

                <div className={`badge ${p.verified ? "ok" : "warn"}`}>
                  {p.verified ? "Verified" : "Unverified"}
                </div>

                <div className="admin-actions">
                  {!p.verified ? (
                    <button
                      className="btn btn-primary btn-full"
                      type="button"
                      onClick={() => setProviderVerified(p.id, true)}
                    >
                      Verify provider
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary btn-full"
                      type="button"
                      onClick={() => setProviderVerified(p.id, false)}
                    >
                      Unverify
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-block">
        <h3>User Management</h3>

        {accounts.length === 0 ? (
          <div className="empty">No registered users yet.</div>
        ) : (
          <div className="admin-grid">
            {clients.map((u) => (
              <div key={`client-${u.username}`} className="card">
                <div className="card-title">Client</div>
                <div className="card-meta">@{u.username}</div>

                <div className="admin-provider-info">
                  <div>
                    <b>Phone:</b> {u.phone || "—"}
                  </div>
                </div>

                <div className="admin-actions">
                  <button
                    className="btn btn-secondary btn-full"
                    type="button"
                    onClick={() => handleResetPassword(u.username)}
                  >
                    Reset password
                  </button>
                  <button
                    className="btn btn-danger btn-full"
                    type="button"
                    onClick={() => handleDelete(u.username)}
                  >
                    Delete account
                  </button>
                </div>
              </div>
            ))}

            {providers.map((u) => (
              <div key={`provider-${u.username}`} className="card">
                <div className="card-title">Provider</div>
                <div className="card-meta">@{u.username}</div>

                <div className="admin-actions">
                  <button
                    className="btn btn-secondary btn-full"
                    type="button"
                    onClick={() => handleResetPassword(u.username)}
                  >
                    Reset password
                  </button>
                  <button
                    className="btn btn-danger btn-full"
                    type="button"
                    onClick={() => handleDelete(u.username)}
                  >
                    Delete account
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-block">
        <h3>Booking Oversight</h3>

        <div className="admin-list">
          {data.length === 0 && <div className="empty">No bookings yet.</div>}

          {data.map((b) => (
            <div key={b.id} className="booking-row booking-row-col">
              <div className="row-top">
                <div>
                  <div className="row-title">{b.service}</div>

                  <div className="row-meta">
                    Client: <b>{b.client}</b> • Phone:{" "}
                    <b>{getClientPhone(b)}</b> •{" "}
                    <span className={`status status-${b.status}`}>
                      {b.status}
                    </span>
                    {b.provider ? (
                      <>
                        {" "}
                        • Taken by <b>@{b.provider}</b>
                      </>
                    ) : null}
                  </div>
                </div>

                <select
                  className="select"
                  value={b.status}
                  onChange={(e) => adminUpdateStatus(b.id, e.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="accepted">accepted</option>
                  <option value="rejected">rejected</option>
                  <option value="completed">completed</option>
                </select>
              </div>

              <div className="row-details">
                <div>
                  <b>Address:</b> {b.address || "—"}
                </div>
                <div>
                  <b>Date:</b> {b.date || "—"} • <b>Time:</b> {b.time || "—"}
                </div>
                {b.notes ? (
                  <div>
                    <b>Notes:</b> {b.notes}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;