import * as StyledComponent from "./styledComponent";
import { useModelState } from "../../modelStateContext";

const PopupModel = ({ children }) => {
    const handelPropagation = (event) => event.stopPropagation();
    const { showModel, closeModel } = useModelState();

    return (
        <>
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
