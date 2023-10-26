import { useModelState } from "../../modelStateContext";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../authContext";

const ProtectedRoute = ({ children }) => {
    const { openModel } = useModelState();
    const location = useLocation();
    const currentPath = location.pathname;
    const { isSignedIn } = useAuthContext();
    if (!isSignedIn) {
        openModel();
        return <Navigate to={currentPath} />;
    }
    return children;
};

export default ProtectedRoute;
