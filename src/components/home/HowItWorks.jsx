import { useNavigate } from "react-router-dom";
import {
  Search,
  UserCheck,
  CalendarCheck,
  ClipboardList,
} from "lucide-react";
import "./HowItWorks.css";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: "choose-service",
      title: "Choose a service",
      desc: "Select what you need in a few clicks.",
      icon: <Search size={22} />,
    },
    {
      id: "pick-provider",
      title: "Pick a provider",
      desc: "Browse verified professionals.",
      icon: <UserCheck size={22} />,
    },
    {
      id: "schedule-time",
      title: "Schedule a time",
      desc: "Automation helps avoid conflicts.",
      icon: <CalendarCheck size={22} />,
    },
    {
      id: "track-booking",
      title: "Track the booking",
      desc: "See status and updates in your account.",
      icon: <ClipboardList size={22} />,
    },
  ];

  return (
    <section className="how">
      <h2>How It Works</h2>

      <div className="how-grid">
        {steps.map((s) => (
          <div
            key={s.id}
            className="how-card how-card-click"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/how-it-works/${s.id}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(`/how-it-works/${s.id}`);
              }
            }}
          >
            <div className="how-head">
              <div className="how-icon">{s.icon}</div>
              <h3>{s.title}</h3>
            </div>

            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;