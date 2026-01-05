import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminRoute;
