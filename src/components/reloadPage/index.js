import * as StyledComponent from "./styledComponent";

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

export default ReloadPage;
