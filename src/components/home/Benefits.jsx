import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CalendarCheck,
  Lock,
  Layers
} from "lucide-react";

import "./Benefits.css";

const Benefits = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "Verified providers",
      id: "verified-providers",
      icon: ShieldCheck,
    },
    {
      title: "Automated scheduling",
      id: "automated-scheduling",
      icon: CalendarCheck,
    },
    {
      title: "Secure data handling",
      id: "secure-data",
      icon: Lock,
    },
    {
      title: "Scalable architecture",
      id: "scalable-architecture",
      icon: Layers,
    },
  ];

  return (
    <section className="benefits">
      <h2>Why CARECONNECT?</h2>

      <ul className="benefits-list">
        {benefits.map((b) => {
          const Icon = b.icon;

          return (
            <li
              key={b.id}
              className="benefit-item"
              onClick={() => navigate(`/benefits/${b.id}`)}
            >
              <div className="benefit-content">
                <Icon className="benefit-icon" size={20} />
                <span>{b.title}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Benefits;