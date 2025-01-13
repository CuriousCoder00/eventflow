import { Routes, Route, Outlet, Navigate } from "react-router";
import { useSession } from "./hooks/use-session";
import LoginPage from "./pages/auth/login";
import RegistrationPage from "./pages/auth/registration";

interface AuthenticatedRouteProps {
  isAuthenticated: boolean;
  [key: string]: any;
}

const AuthenticatedRoute = ({ isAuthenticated }: AuthenticatedRouteProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate replace to="/auth/login" />;
};

const UnauthenticatedRoute = ({ isAuthenticated }: AuthenticatedRouteProps) => {
  return isAuthenticated ? <Navigate replace to="/" /> : <Outlet />;
};

export default function AppRoutes() {
  const { session } = useSession();
  const isAuthenticated = session.isLoggedIn;
  return (
    <Routes>
      <Route element={<AuthenticatedRoute isAuthenticated={isAuthenticated} />}>
        <Route index element={<div>Hello</div>} />
      </Route>
      <Route
        element={<UnauthenticatedRoute isAuthenticated={isAuthenticated} />}
      >
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
}
