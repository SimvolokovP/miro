import { ROUTES } from "@/shared/model/routes";
import { useSessionStore } from "@/shared/model/session";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { session } = useSessionStore();

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}
