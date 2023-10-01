import * as StyledComponent from "./styledComponent";

const NoResultsFound = ({ notFoundImageUrl }) => {
    return (
        <StyledComponent.NoResultsFoundContainer>
            <StyledComponent.NoResultsFoundImg
                src={notFoundImageUrl}
                alt="no results"
            />
        </StyledComponent.NoResultsFoundContainer>
    );
};

export default NoResultsFound;
