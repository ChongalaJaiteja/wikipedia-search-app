import * as StyledComponent from "./styledComponent";
import { useModelState } from "../../modelStateContext";
import Toaster from "../toaster";

const PopupModel = ({ children }) => {
    const handelPropagation = (event) => event.stopPropagation();
    const { showModel, closeModel } = useModelState();

    return (
        <>
            <Toaster />
            {showModel && (
                <StyledComponent.PopupBgContainer onClick={closeModel}>
                    <StyledComponent.PopupModel onClick={handelPropagation}>
                        {children}
                    </StyledComponent.PopupModel>
                </StyledComponent.PopupBgContainer>
            )}
        </>
    );
};

export default PopupModel;
