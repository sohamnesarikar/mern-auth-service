import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!user && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
