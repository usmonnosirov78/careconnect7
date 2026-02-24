// ProtectedRoute component.
// Blocks access if user is not logged in or doesn't have required role(s).

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  // Not logged in -> go login
  if (!user) return <Navigate to="/login" replace />;

  // If roles are specified, check role access
  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;