import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
