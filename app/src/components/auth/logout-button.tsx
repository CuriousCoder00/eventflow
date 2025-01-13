import { logout } from "@/lib/services/auth.actions";
import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LucideLogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/hooks/use-session";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setSession } = useSession();
  const handleLogout = () => {
    logout().then((res) => {
      toast({
        title: res.data.message,
      });
      setSession({
        isLoggedIn: false,
        token: null,
        user: {
          id: "",
          email: "",
          name: "",
        },
      });
      navigate("/auth/login");
    });
  };
  return (
    <Button
      asChild
      className="w-full flex items-center justify-start pl-3"
      variant={"ghost"}
    >
      <DropdownMenuItem onClick={() => handleLogout()}>
        <LucideLogOut className="size-5" />
        Logout
      </DropdownMenuItem>
    </Button>
  );
}