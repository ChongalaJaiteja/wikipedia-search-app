import * as StyledComponent from "./styledComponent";

const PopupModel = ({ closeModel, children }) => {
    const handelPropagation = (event) => event.stopPropagation();

    return (
        <StyledComponent.PopupBgContainer onClick={closeModel}>
            <StyledComponent.PopupModel onClick={handelPropagation}>
                {children}
            </StyledComponent.PopupModel>
        </StyledComponent.PopupBgContainer>
    );
};

export default PopupModel;
