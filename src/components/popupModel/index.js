import * as StyledComponent from "./styledComponent";
import { useModelState } from "../../modelStateContext";
import Toaster from "../toaster";

// PopupModel component is responsible for rendering a modal popup.
const PopupModel = ({ children }) => {
    // Function to prevent event propagation within the popup.
    const handelPropagation = (event) => event.stopPropagation();

    // Access the showModel and closeModel functions from the modelStateContext.
    const { showModel, closeModel } = useModelState();

    return (
        <>
            {/* Render a Toaster component for displaying notifications. */}
            <Toaster />
            {showModel && (
                // If showModel is true, render the modal background container and the popup content.
                <StyledComponent.PopupBgContainer onClick={closeModel}>
                    <StyledComponent.PopupModel onClick={handelPropagation}>
                        {/* Render the content of the modal, which is provided as children. */}
                        {children}
                    </StyledComponent.PopupModel>
                </StyledComponent.PopupBgContainer>
            )}
        </>
    );
};

export default PopupModel; // Export the PopupModel component.
