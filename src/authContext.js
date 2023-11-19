// Import necessary modules
import { useContext, createContext, useState } from "react"; // Import React hooks and createContext
import Cookies from "js-cookie"; // Import the 'js-cookie' library for managing cookies

// Create an AuthContext using createContext, which will provide authentication-related data to components
const AuthContext = createContext();

// Create a custom hook 'useAuthContext' to easily access the authentication context in components
export const useAuthContext = () => useContext(AuthContext);

// Define the AuthContextProvider component responsible for managing authentication state and providing it to the app
export const AuthContextProvider = ({ children }) => {
    // Initialize state variables for authentication status and JWT token using useState
    const [isSignedIn, setIsSignedIn] = useState(
        Cookies.get("jwt_token") !== undefined
    );
    const [jwtToken, setJwtToken] = useState(Cookies.get("jwt_token"));

    // Define a function to handle user sign-out
    const onSignout = () => {
        // Remove the 'jwt_token' cookie
        Cookies.remove("jwt_token");
        // Set JWT token to null and update the authentication status to 'false'
        setJwtToken(null);
        setIsSignedIn(false);
    };

    // Define a function to handle user sign-in
    const onSignin = (jwtToken, rememberUser) => {
        // Configure cookie options based on whether the user chose to remember the login
        const cookieOptions = rememberUser ? { expires: 30 } : {};
        // Set the 'jwt_token' cookie with the provided token and options
        Cookies.set("jwt_token", jwtToken, cookieOptions);
        // Set the JWT token in the state and update the authentication status to 'true'
        setJwtToken(jwtToken);
        setIsSignedIn(true);
    };
    // Provide authentication-related data to the components within the AuthContext.Provider
    return (
        <AuthContext.Provider
            value={{ isSignedIn, onSignout, onSignin, jwtToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};
