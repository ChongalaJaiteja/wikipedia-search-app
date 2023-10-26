import { useContext, createContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(
        Cookies.get("jwt_token") !== undefined
    );
    const [jwtToken, setJwtToken] = useState(Cookies.get("jwt_token"));

    const onSignout = () => {
        Cookies.remove("jwt_token");
        setJwtToken(null);
        setIsSignedIn(false);
    };

    const onSignin = (jwtToken, rememberUser) => {
        const cookieOptions = rememberUser ? { expires: 30 } : {};
        Cookies.set("jwt_token", jwtToken, cookieOptions);
        setJwtToken(jwtToken);
        setIsSignedIn(true);
    };
    return (
        <AuthContext.Provider
            value={{ isSignedIn, onSignout, onSignin, jwtToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};
