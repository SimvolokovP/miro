import { Header } from "@/features/header";
import { ROUTES } from "@/shared/model/routes";
import { Outlet, useLocation } from "react-router-dom";
import { Providers } from "./providers";

export function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER;

  return (
    <Providers>
      <div>
        {!isAuthPage && <Header />}
        <Outlet />
      </div>
    </Providers>
  );
}
