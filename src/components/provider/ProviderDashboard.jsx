// ProviderDashboard: provider sees available jobs + his jobs.
// Shows client phone in booking details.
// If booking.phone is missing (old bookings), it falls back to client profile phone.

import { useAuth } from "../../hooks/useAuth.js";
import { useBooking } from "../../hooks/useBooking.js";
import "./ProviderDashboard.css";

const ProviderDashboard = () => {
  const { user, getUserByUsername } = useAuth();
  const { data, claimBooking, completeBooking, reopenBooking, cancelBooking } =
    useBooking();

  const username = user?.username;

  const available = data.filter((b) => b.status === "pending" && !b.provider);
  const myJobs = data.filter((b) => b.provider === username);
  const takenByOthers = data.filter(
    (b) => b.provider && b.provider !== username
  );

  const handleAccept = (id) => claimBooking(id, username);
  const handleComplete = (id) => completeBooking(id, username);
  const handleReopen = (id) => reopenBooking(id, username);
  const handleCancel = (id) => cancelBooking(id, username);

  const renderPhone = (b) => {
    if (b?.phone && String(b.phone).trim()) return b.phone;

    const client = getUserByUsername?.(b?.client);
    if (client?.phone && String(client.phone).trim()) return client.phone;

    return "—";
  };

  return (
    <section className="pd">
      <div className="pd-top">
        <div>
          <h3 className="pd-title">Provider Dashboard</h3>
          <div className="pd-sub">
            Logged in as <b>{username}</b>
          </div>
        </div>

        <div className="pd-stats">
          <div className="pd-stat">
            <div className="pd-stat-label">Available</div>
            <div className="pd-stat-val">{available.length}</div>
          </div>
          <div className="pd-stat">
            <div className="pd-stat-label">My jobs</div>
            <div className="pd-stat-val">{myJobs.length}</div>
          </div>
          <div className="pd-stat">
            <div className="pd-stat-label">Taken</div>
            <div className="pd-stat-val">{takenByOthers.length}</div>
          </div>
        </div>
      </div>

      <div className="pd-grid">
        <div className="pd-card">
          <div className="pd-card-title">Available requests</div>

          {available.length === 0 ? (
            <div className="pd-empty">No available requests right now.</div>
          ) : (
            <div className="pd-list">
              {available.map((b) => (
                <div key={b.id} className="pd-item">
                  <div className="pd-item-head">
                    <div>
                      <div className="pd-item-title">{b.service}</div>
                      <div className="pd-item-meta">
                        <span className="pd-badge pd-badge-warn">pending</span>
                        <span className="pd-dot">•</span>
                        Client: <b>{b.client}</b>
                      </div>
                    </div>

                    <button
                      className="pd-btn pd-btn-primary"
                      type="button"
                      onClick={() => handleAccept(b.id)}
                    >
                      Accept job
                    </button>
                  </div>

                  <div className="pd-item-body">
                    <div>
                      <b>Phone:</b> {renderPhone(b)}
                    </div>
                    <div>
                      <b>Address:</b> {b.address || "—"}
                    </div>
                    <div>
                      <b>Date:</b> {b.date || "—"}{" "}
                      <span className="pd-dot">•</span> <b>Time:</b>{" "}
                      {b.time || "—"}
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
          )}
        </div>

        <div className="pd-card">
          <div className="pd-card-title">My jobs</div>

          {myJobs.length === 0 ? (
            <div className="pd-empty">You have no jobs yet.</div>
          ) : (
            <div className="pd-list">
              {myJobs.map((b) => (
                <div key={b.id} className="pd-item">
                  <div className="pd-item-head">
                    <div>
                      <div className="pd-item-title">{b.service}</div>
                      <div className="pd-item-meta">
                        <span
                          className={`pd-badge ${
                            b.status === "completed"
                              ? "pd-badge-ok"
                              : "pd-badge-info"
                          }`}
                        >
                          {b.status}
                        </span>
                        <span className="pd-dot">•</span>
                        Client: <b>{b.client}</b>
                      </div>
                    </div>

                    {b.status === "accepted" ? (
                      <div className="pd-actions">
                        <button
                          className="pd-btn pd-btn-success"
                          type="button"
                          onClick={() => handleComplete(b.id)}
                        >
                          Complete
                        </button>
                        <button
                          className="pd-btn pd-btn-danger"
                          type="button"
                          onClick={() => handleCancel(b.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : b.status === "completed" ? (
                      <div className="pd-actions">
                        <button
                          className="pd-btn pd-btn-secondary"
                          type="button"
                          onClick={() => handleReopen(b.id)}
                        >
                          Reopen
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <div className="pd-item-body">
                    <div>
                      <b>Phone:</b> {renderPhone(b)}
                    </div>
                    <div>
                      <b>Address:</b> {b.address || "—"}
                    </div>
                    <div>
                      <b>Date:</b> {b.date || "—"}{" "}
                      <span className="pd-dot">•</span> <b>Time:</b>{" "}
                      {b.time || "—"}
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
          )}
        </div>
      </div>

      <div className="pd-card pd-card-full">
        <div className="pd-card-title">Taken by other providers</div>

        {takenByOthers.length === 0 ? (
          <div className="pd-empty">No taken jobs to display.</div>
        ) : (
          <div className="pd-list">
            {takenByOthers.map((b) => (
              <div key={b.id} className="pd-item">
                <div className="pd-item-head">
                  <div>
                    <div className="pd-item-title">{b.service}</div>
                    <div className="pd-item-meta">
                      <span className="pd-badge pd-badge-muted">taken</span>
                      <span className="pd-dot">•</span>
                      Assigned to: <b>{b.provider}</b>
                    </div>
                  </div>
                </div>

                <div className="pd-item-body">
                  <div>
                    <b>Client:</b> {b.client || "—"}
                  </div>
                  <div>
                    <b>Phone:</b> {renderPhone(b)}
                  </div>
                  <div>
                    <b>Address:</b> {b.address || "—"}
                  </div>
                  <div>
                    <b>Date:</b> {b.date || "—"}{" "}
                    <span className="pd-dot">•</span> <b>Time:</b>{" "}
                    {b.time || "—"}
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
        )}
      </div>
    </section>
  );
};

export default ProviderDashboard;