import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

import Hero from "../components/home/Hero.jsx";
import Services from "../components/home/Services.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import Benefits from "../components/home/Benefits.jsx";
import CallToAction from "../components/home/CallToAction.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBooking = () => {
    // Guest -> go to Become Client
    if (!user) {
      navigate("/become-client");
      return;
    }

    // Logged in -> go by role
    if (user.role === "admin") navigate("/admin");
    else if (user.role === "provider") navigate("/provider");
    else navigate("/booking");
  };

  const handleBecomeProvider = () => {
    // Guest or client can register provider
    navigate("/become-provider");
  };

  return (
    <>
      <Hero onBookService={handleBooking} onBecomeProvider={handleBecomeProvider} />
      <Services />
      <HowItWorks />
      <Benefits />
      <CallToAction />
    </>
  );
};

export default Home;