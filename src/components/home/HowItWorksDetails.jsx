import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./HowItWorksDetails.css";

const DATA = {
  "choose-service": {
    title: "Choose a service",
    lead: "Start by describing what you need and where the work should be done.",
    bullets: [
      "Select the service type (e.g., plumbing, electrical, painting).",
      "Provide the address and any important notes for the provider.",
      "Choose a date and time that fits your schedule.",
      "Submit the request — it becomes visible to providers.",
    ],
    note:
      "Tip: The more specific your notes are (e.g., “leak under kitchen sink”), the faster a provider can confirm the job.",
  },
  "pick-provider": {
    title: "Pick a provider",
    lead: "Providers review open requests and can claim a job if they are available.",
    bullets: [
      "Only providers can accept jobs from the Provider Dashboard.",
      "Once a provider claims a request, other providers can only view it as taken.",
      "Admin verification helps ensure providers are trusted and accountable.",
      "You can track who accepted your booking inside your account.",
    ],
    note:
      "CareConnect is designed to reduce admin overload — providers claim jobs themselves, while the admin focuses on verification and oversight.",
  },
  "schedule-time": {
    title: "Schedule a time",
    lead: "Scheduling is built into the booking form for a smooth experience.",
    bullets: [
      "Choose a valid date/time (the system blocks bookings in the past).",
      "Your booking stays pending until a provider accepts it.",
      "All booking details are stored consistently so both client and provider see the same information.",
      "Statuses help keep the workflow clear and structured.",
    ],
    note:
      "If your device language is Russian, the browser date/time inputs may display in Russian — this is normal and depends on system settings.",
  },
  "track-booking": {
    title: "Track the booking",
    lead: "Stay informed as your request moves through each stage.",
    bullets: [
      "Pending: created by the client and waiting for a provider.",
      "Accepted: a provider claimed the job and can manage it.",
      "Completed: the provider finished the job (can be reopened if needed).",
      "Rejected/Cancelled: handled when the job cannot be completed.",
    ],
    note:
      "CareConnect supports real-world scenarios: if issues happen after completion, providers can reopen the job to continue work properly.",
  },
};

const HowItWorksDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = useMemo(() => DATA[id], [id]);

  if (!item) {
    return (
      <section className="hitd">
        <div className="hitd-card">
          <button className="hitd-back" type="button" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} /> Back
          </button>

          <h1 className="hitd-title">Not found</h1>
          <p className="hitd-lead">
            This step does not exist. Please go back and choose another item.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="hitd">
      <div className="hitd-card">
        <button className="hitd-back" type="button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        <div className="hitd-head">
          <h1 className="hitd-title">{item.title}</h1>
          <p className="hitd-lead">{item.lead}</p>
        </div>

        <div className="hitd-section">
          <h2 className="hitd-subtitle">What happens in this step</h2>
          <ul className="hitd-list">
            {item.bullets.map((x) => (
              <li key={x} className="hitd-li">
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="hitd-note">
          <div className="hitd-note-title">Quick note</div>
          <div className="hitd-note-text">{item.note}</div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksDetails;