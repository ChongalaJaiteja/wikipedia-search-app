// Import the necessary styled components
import * as StyledComponent from "./styledComponent";

// Define a functional component called NoResultsFound
const NoResultsFound = ({ notFoundImageUrl }) => {
    return (
        // Render a container for no results found
        <StyledComponent.NoResultsFoundContainer>
            {/* Display an image indicating no results */}
            <StyledComponent.NoResultsFoundImg
                src={notFoundImageUrl}
                alt="no results"
            />
        </StyledComponent.NoResultsFoundContainer>
    );
};

// Export the NoResultsFound component as the default export
export default NoResultsFound;
