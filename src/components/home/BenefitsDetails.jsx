import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./BenefitsDetails.css";

const DATA = {
  "verified-providers": {
    title: "Verified Providers",
    description:
      "CareConnect ensures that service providers are verified before they can accept real client requests.",
    details: [
      "Identity and profile checks help reduce fraud and improve overall trust.",
      "Verification status is clearly displayed so clients can make informed decisions.",
      "Only verified providers are allowed to accept bookings in the provider dashboard.",
      "This creates a safer marketplace and improves service consistency.",
    ],
    why: "Trust is critical in on-demand service platforms. Verification reduces uncertainty and increases reliability.",
  },
  "automated-scheduling": {
    title: "Automated Scheduling",
    description:
      "The platform helps clients pick a suitable date and time while avoiding common scheduling mistakes.",
    details: [
      "Prevents invalid bookings (e.g., booking in the past).",
      "Improves user experience by guiding clients step-by-step.",
      "Reduces admin workload by keeping booking data structured.",
      "Creates cleaner workflows for providers to accept and complete jobs.",
    ],
    why: "Scheduling is one of the biggest friction points in service booking. Automation minimizes conflicts and errors.",
  },
  "secure-data": {
    title: "Secure Data Handling",
    description:
      "CareConnect stores only necessary user data and keeps it isolated by user role and permissions.",
    details: [
      "Clients can only see their own bookings.",
      "Providers see only the relevant booking details they need to complete a job.",
      "Admin has oversight to manage verification and support operations.",
      "Phone numbers are validated and normalized to reduce incorrect entries.",
    ],
    why: "Data protection improves credibility and reduces privacy risks, especially in systems handling contact information.",
  },
  "scalable-architecture": {
    title: "Scalable Architecture",
    description:
      "The project is structured with separation of concerns to support future growth and new features.",
    details: [
      "Auth, booking, and provider logic are separated into hooks/contexts.",
      "Role-based routing makes it easy to add new protected areas.",
      "Reusable UI sections (Hero, Benefits, CTA) keep the home page modular.",
      "LocalStorage-based mock backend can later be replaced with a real API.",
    ],
    why: "A scalable structure reduces refactoring time when new requirements appear during development or deployment.",
  },
};

const BenefitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = useMemo(() => DATA[id], [id]);

  if (!item) {
    return (
      <section className="bd">
        <div className="bd-container">
          <button className="bd-back" type="button" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="bd-card">
            <h1 className="bd-title">Not found</h1>
            <p className="bd-text">This benefit does not exist.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bd">
      <div className="bd-container">
        <button className="bd-back" type="button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bd-card">
          <div className="bd-brand">CareConnect</div>

          <h1 className="bd-title">{item.title}</h1>
          <p className="bd-text">{item.description}</p>

          <h3 className="bd-h">Key Points</h3>
          <ul className="bd-list">
            {item.details.map((x) => (
              <li key={x} className="bd-li">
                {x}
              </li>
            ))}
          </ul>

          <div className="bd-divider" />

          <h3 className="bd-h">Why it matters</h3>
          <p className="bd-text">{item.why}</p>
        </div>
      </div>
    </section>
  );
};

export default BenefitDetails;