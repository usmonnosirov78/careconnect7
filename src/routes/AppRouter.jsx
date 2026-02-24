// Central routing configuration.
// Defines navigation structure and page hierarchy.

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Booking from "../pages/Booking.jsx";
import Provider from "../pages/Provider.jsx";
import Admin from "../pages/Admin.jsx";
import BecomeProvider from "../pages/BecomeProvider.jsx";
import BecomeClient from "../pages/BecomeClient.jsx";
import ClientRegistered from "../pages/ClientRegistered.jsx";

// Info pages
import BenefitDetails from "../components/home/BenefitsDetails.jsx";
import HowItWorksDetails from "../components/home/HowItWorksDetails.jsx";
import ServicesDetails from "../components/home/ServicesDetails.jsx"; // ✅ ДОБАВИЛ

import ProtectedRoute from "./ProtectedRoute.jsx";
import { useAuth } from "../hooks/useAuth.js";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="nf">
      <div className="nf-card">
        <h2 className="nf-title">Not Found</h2>
        <p className="nf-sub">This page does not exist.</p>
      </div>
    </section>
  );
};

const GuestOnly = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return children;
};

const BecomeClientGate = ({ children }) => {
  const { user } = useAuth();

  if (user?.role === "client") return <Navigate to="/client-registered" replace />;
  if (user?.role === "provider" || user?.role === "admin") return <Navigate to="/" replace />;

  return children;
};

const BecomeProviderGate = ({ children }) => {
  const { user } = useAuth();

  if (user?.role === "provider" || user?.role === "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* Info pages доступные всем */}
          <Route path="/benefits/:id" element={<BenefitDetails />} />
          <Route path="/how-it-works/:id" element={<HowItWorksDetails />} />
          <Route path="/services/:id" element={<ServicesDetails />} /> {/* ✅ ДОБАВИЛ */}

          {/* Guest only: login */}
          <Route
            path="/login"
            element={
              <GuestOnly>
                <Login />
              </GuestOnly>
            }
          />

          {/* Guest only: client registration */}
          <Route
            path="/become-client"
            element={
              <BecomeClientGate>
                <BecomeClient />
              </BecomeClientGate>
            }
          />

          {/* Client only: success page after registration */}
          <Route
            path="/client-registered"
            element={
              <ProtectedRoute roles={["client"]}>
                <ClientRegistered />
              </ProtectedRoute>
            }
          />

          {/* Guest + Client only: provider registration */}
          <Route
            path="/become-provider"
            element={
              <BecomeProviderGate>
                <BecomeProvider />
              </BecomeProviderGate>
            }
          />

          {/* Protected areas */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute roles={["client"]}>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/provider"
            element={
              <ProtectedRoute roles={["provider"]}>
                <Provider />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;