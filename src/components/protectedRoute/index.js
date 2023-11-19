import { useModelState } from "../../modelStateContext";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../authContext";

// ProtectedRoute component is responsible for protecting routes that require authentication.
const ProtectedRoute = ({ children }) => {
    // Access the openModel function from the modelStateContext.
    const { openModel } = useModelState();

    // Get the current location using useLocation hook.
    const location = useLocation();

    // Extract the current path from the location.
    const currentPath = location.pathname;

    // Access the isSignedIn flag from the authContext.
    const { isSignedIn } = useAuthContext();

    // If the user is not signed in, open the authentication model and redirect to the current path.
    if (!isSignedIn) {
        openModel();
        return <Navigate to={currentPath} />;
    }

    // If the user is signed in, render the protected content (children).
    return children;
};

export default ProtectedRoute; // Export the ProtectedRoute component.
