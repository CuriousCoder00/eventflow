import { Link } from "react-router";
import { ModeToggle } from "./theme-toggles";
import { useSession } from "@/hooks/use-session";
import ProfileSettings from "./profile-settings";
import { Button } from "./ui/button";
import { Bell, Search } from "lucide-react";

export default function Header() {
  const { session } = useSession();
  return (
    <header className="fixed z-50 inset-x-0 w-full flex items-center justify-between p-2 bg-background dark:bg-black border-b-2 md:px-20 px-4">
      <Link to={"/"} className="text-md font-bold">
        EVENTO!!
      </Link>
      <nav className="flex items-center space-x-4">
        <div className="">
          {session.isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <Button className="rounded-full" variant={"ghost"} size={"icon"}>
                <Search />
              </Button>
              <Button className="rounded-full" variant={"ghost"} size={"icon"}>
                <Bell />
              </Button>
              <ProfileSettings />
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/auth/register">Get Started</Link>
              <ModeToggle />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}