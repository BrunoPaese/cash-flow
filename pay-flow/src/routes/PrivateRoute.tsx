import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth/useAuth";
import type { JSX } from "react";
import Spinner from "../components/Spinner";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
