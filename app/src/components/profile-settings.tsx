import { useSession } from "@/hooks/use-session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getNameInitial } from "@/lib/utils";
import { User } from "lucide-react";
import { Link } from "react-router";
import { ThemeToggle } from "./theme-toggles";
import LogoutButton from "./auth/logout-button";

export default function ProfileSettings() {
  const { session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer w-8 h-8">
          <AvatarFallback className="bg-foreground text-background">
            {getNameInitial(session.user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mt-4 z-10 bg-white text-black dark:bg-slate-950 dark:text-white pb-5">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            className="flex gap-3 items-center justify-start"
            to={`/account/${session.user.username}`}
          >
            <User className="h-5 w-5" />
            <span className="text-sm">My Profile</span>
          </Link>
        </DropdownMenuItem>
        <ThemeToggle />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}