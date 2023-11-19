import * as StyledComponent from "./styledComponent";

// ReloadPage component is responsible for rendering a reload option when an error occurs.
const ReloadPage = ({ reloadImageUrl, reloadText, reloadFunction }) => {
    return (
        <StyledComponent.FailedViewBgContainer>
            <StyledComponent.ErrorImg src={reloadImageUrl} alt="error" />
            <br />
            <StyledComponent.RetryBtn onClick={() => reloadFunction()}>
                {reloadText}
            </StyledComponent.RetryBtn>
        </StyledComponent.FailedViewBgContainer>
    );
};

export default ReloadPage; // Export the ReloadPage component.
