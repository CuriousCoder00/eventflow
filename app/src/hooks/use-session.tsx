import { sessionState } from "@/lib/atoms/auth";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useSession = () => {
  const [session, setSession] = useRecoilState(sessionState);

  useEffect(() => {
    const sessionData = localStorage.getItem("event_plat_session");
    if (sessionData) {
      setSession(JSON.parse(sessionData));
    } else {
      setSession({
        isLoggedIn: false,
        token: null,
        user: {
          id: "",
          email: "",
          name: "",
        },
      });
    }
  }, []);

  return {
    session,
    setSession,
  };
};
