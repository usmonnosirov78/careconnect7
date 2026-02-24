import { useNavigate } from "react-router-dom";
import {
  Wrench,
  Zap,
  Sparkles,
  Settings,
  Paintbrush,
  Sofa,
} from "lucide-react";

import "./Services.css";

const Services = () => {
  const navigate = useNavigate();

  const items = [
    { name: "Plumbing", id: "plumbing", icon: <Wrench size={20} /> },
    { name: "Electrical Repair", id: "electrical", icon: <Zap size={20} /> },
    { name: "Cleaning", id: "cleaning", icon: <Sparkles size={20} /> },
    { name: "Appliance Fix", id: "appliance", icon: <Settings size={20} /> },
    { name: "Painting", id: "painting", icon: <Paintbrush size={20} /> },
    { name: "Furniture Assembly", id: "furniture", icon: <Sofa size={20} /> },
  ];

  return (
    <section className="services">
      <h2>Popular Services</h2>

      <div className="services-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="service-card"
            onClick={() => navigate(`/services/${item.id}`)}
          >
            <div className="service-head">
              <div className="service-icon">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;