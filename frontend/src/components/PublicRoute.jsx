import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (user && isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;
