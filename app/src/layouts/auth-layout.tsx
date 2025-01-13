import { useLocation } from "react-router";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div
      className={`flex items-center justify-center w-svw h-dvh md:px-20 ${
        path === "/auth/login" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="w-full max-md:hidden p-4 h-full flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-semibold text-center text-slate-800 dark:text-white">
          The New Way to Manage Events
        </h1>
        <ul className="flex flex-col items-start justify-center space-y-3 text-lg text-slate-600 dark:text-white">
          <li>Manage Events</li>
          <li>Get Notified</li>
          <li>Stay Connected</li>
        </ul>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
