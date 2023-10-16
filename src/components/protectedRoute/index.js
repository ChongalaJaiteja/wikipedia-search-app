import Cookies from "js-cookies";
import PopupModel from "../popupModel";
import Authentication from "../authentication";
import { useModelState } from "../../modelStateContext";
import { useLocation} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { openModel } = useModelState();

    const jwtToken = Cookies.getItem("jwt_token");
    if (!jwtToken) {
        return (
            <>
                <PopupModel>
                    <Authentication />
                </PopupModel>
            </>
        );
    } else return children;
};

export default ProtectedRoute;
