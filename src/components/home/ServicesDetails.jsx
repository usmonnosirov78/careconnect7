// ServicesDetails page.
// Shows detailed information about a selected service from the Home page.

import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./ServicesDetails.css";

const SERVICES = {
  plumbing: {
    title: "Plumbing",
    lead:
      "From leaking taps to full pipe replacements, CareConnect helps you book verified plumbing specialists with clear scheduling and transparent job tracking.",
    overview: [
      "Fix leaks, dripping taps, and running toilets",
      "Unclog sinks, showers, and drains",
      "Repair or replace pipes, valves, and fittings",
      "Install or service water heaters and boilers",
      "Emergency call-outs for urgent issues (where available)",
    ],
    typicalJobs: [
      "Kitchen/bathroom leak diagnostics",
      "Drain cleaning and blockage removal",
      "Toilet mechanism repair",
      "Shower head / mixer replacement",
      "Pipe insulation and minor renovations support",
    ],
    howCareConnectHelps: [
      "Verified providers: admin-reviewed profiles and service categories",
      "Booking workflow: request → accepted → completed (with reopen support)",
      "Client phone visibility for providers to coordinate arrival time",
      "Notes and address captured to reduce back-and-forth",
    ],
    tips: [
      "Add clear notes (e.g., ‘leak under sink’, ‘low water pressure’).",
      "If possible, mention when the issue started and how often it happens.",
      "For emergencies, include access details (gate code, floor, landmarks).",
    ],
  },

  electrical: {
    title: "Electrical Repair",
    lead:
      "Book qualified electrical repair services for safe troubleshooting, replacements, and small installations—scheduled in minutes and tracked in your dashboard.",
    overview: [
      "Diagnose power issues, short circuits, and breaker trips",
      "Replace switches, sockets, and lighting fixtures",
      "Install basic appliances and electrical accessories",
      "Improve safety with grounded connections and checks",
      "Support small home wiring tasks (non-industrial scope)",
    ],
    typicalJobs: [
      "Socket replacement and testing",
      "Lighting installation (ceiling, wall, LED strips)",
      "Breaker panel checks (basic)",
      "Diagnosing flickering lights",
      "Smart switch / basic device setup",
    ],
    howCareConnectHelps: [
      "Only verified providers can take client jobs once approved",
      "Clear schedule selection helps avoid time conflicts",
      "Providers see client phone to confirm arrival and access",
      "Admin oversight for status changes when needed",
    ],
    tips: [
      "Describe the issue precisely (e.g., ‘breaker trips when kettle is on’).",
      "If you notice burning smell or sparks, treat it as urgent.",
      "List devices involved and recent changes (new appliance, renovation).",
    ],
  },

  cleaning: {
    title: "Cleaning",
    lead:
      "Schedule reliable home cleaning services—from quick refresh to deep cleaning—using a simple request flow and real-time booking status tracking.",
    overview: [
      "Regular cleaning for apartments and houses",
      "Deep cleaning for kitchens, bathrooms, and living areas",
      "Move-in / move-out cleaning support",
      "Optional add-ons depending on provider services",
      "Clear time slots to match your daily schedule",
    ],
    typicalJobs: [
      "Bathroom deep clean (tiles, sink, shower)",
      "Kitchen degreasing and surfaces",
      "Floor cleaning and vacuuming",
      "Dusting and window spot cleaning",
      "Post-renovation dust cleanup (light)",
    ],
    howCareConnectHelps: [
      "Clients can add notes for priorities (e.g., ‘focus on kitchen’)",
      "Providers can accept and confirm the job in the dashboard",
      "Completed jobs can be reopened if issues are found later",
      "Centralized booking history for repeat services",
    ],
    tips: [
      "Mention the approximate size (rooms) and key focus areas.",
      "If you have pets, add a note so the provider comes prepared.",
      "Clarify if cleaning supplies are provided by you or the provider.",
    ],
  },

  appliance: {
    title: "Appliance Fix",
    lead:
      "Get help with common household appliance problems—diagnostics, minor repairs, and basic replacements—booked and tracked through CareConnect.",
    overview: [
      "Basic troubleshooting and diagnostics",
      "Repairs for common appliance issues (where supported)",
      "Replacement of simple parts (filters, hoses, connectors)",
      "Installation assistance for new appliances",
      "Coordination via phone for arrival and access",
    ],
    typicalJobs: [
      "Washing machine not draining",
      "Refrigerator cooling issues (basic checks)",
      "Dishwasher leakage inspection",
      "Microwave door / plate issues (basic)",
      "Oven temperature instability (basic)",
    ],
    howCareConnectHelps: [
      "Notes field helps list model/problem symptoms upfront",
      "Providers can contact you using stored phone number",
      "Booking timeline keeps your request organized",
      "Admin can oversee status updates if needed",
    ],
    tips: [
      "Include appliance brand/model if you know it.",
      "Describe symptoms (noise, leak, error code, smell).",
      "Mention when the problem happens (always / sometimes).",
    ],
  },

  painting: {
    title: "Painting",
    lead:
      "Plan painting jobs with verified providers—schedule a convenient time, provide room details, and track progress through your booking status.",
    overview: [
      "Interior wall painting and touch-ups",
      "Small surface preparation and finishing",
      "Basic protective measures for furniture/floors",
      "Room-by-room planning and scheduling",
      "Suitable for apartment or house projects",
    ],
    typicalJobs: [
      "Single-room repaint (walls/ceiling)",
      "Spot touch-ups after repairs",
      "Accent wall painting",
      "Door/trim repainting (basic)",
      "Small patch and paint finishing",
    ],
    howCareConnectHelps: [
      "Clear booking notes reduce misunderstandings",
      "Providers can confirm arrival time by phone",
      "Status tracking shows if job is pending/accepted/completed",
      "Option to reopen if adjustments are needed",
    ],
    tips: [
      "Mention room size and preferred paint type if known.",
      "Tell the provider if furniture needs moving/protection.",
      "If you want a specific finish, add it in notes (matte, satin).",
    ],
  },

  furniture: {
    title: "Furniture Assembly",
    lead:
      "Book quick furniture assembly support for shelves, desks, beds, and more—ideal for move-ins, office setups, and home upgrades.",
    overview: [
      "Assembly for common furniture types",
      "Mounting support where appropriate (basic)",
      "Adjustment and alignment for stability",
      "Efficient scheduling and status updates",
      "Coordination by phone for access and timing",
    ],
    typicalJobs: [
      "Wardrobe/shelf assembly",
      "Desk and chair assembly",
      "Bed frame setup",
      "TV stand and storage units",
      "Minor tightening and re-alignment fixes",
    ],
    howCareConnectHelps: [
      "You can attach key info in notes (brand/model, number of items)",
      "Providers can call you using stored phone number",
      "Job status is visible in your client dashboard",
      "If something is wrong after completion, job can be reopened",
    ],
    tips: [
      "Mention number of items and approximate complexity.",
      "Prepare the space (clear floor, access to tools if required).",
      "If wall mounting is needed, note wall type if you know it.",
    ],
  },
};

const ServicesDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = useMemo(() => SERVICES[id], [id]);

  if (!item) {
    return (
      <section className="hitd">
        <div className="hitd-card">
          <button className="hitd-back" type="button" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="hitd-head">
            <h1 className="hitd-title">Service not found</h1>
            <p className="hitd-lead">
              The requested service page doesn’t exist. Please go back and select a
              service from the list.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hitd">
      <div className="hitd-card">
        <button className="hitd-back" type="button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="hitd-head">
          <h1 className="hitd-title">{item.title}</h1>
          <p className="hitd-lead">{item.lead}</p>
        </div>

        <div className="hitd-section">
          <h3 className="hitd-subtitle">What this service includes</h3>
          <ul className="hitd-list">
            {item.overview.map((x) => (
              <li key={x} className="hitd-li">
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="hitd-section">
          <h3 className="hitd-subtitle">Typical requests</h3>
          <ul className="hitd-list">
            {item.typicalJobs.map((x) => (
              <li key={x} className="hitd-li">
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="hitd-section">
          <h3 className="hitd-subtitle">How CareConnect supports the workflow</h3>
          <ul className="hitd-list">
            {item.howCareConnectHelps.map((x) => (
              <li key={x} className="hitd-li">
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="hitd-note">
          <div className="hitd-note-title">Client tips (for better results)</div>
          <div className="hitd-note-text">
            <ul className="hitd-list" style={{ marginTop: 10 }}>
              {item.tips.map((x) => (
                <li key={x} className="hitd-li">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesDetails;