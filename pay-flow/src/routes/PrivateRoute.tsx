import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth/useAuth";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};
