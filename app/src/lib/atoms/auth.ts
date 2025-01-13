import { atom } from "recoil";

export const sessionState = atom({
    key: "sessionState",
    default: {
        isLoggedIn: false,
        token: null,
        user: {
            id: "",
            email: "",
            name: "",
        },
    }
})