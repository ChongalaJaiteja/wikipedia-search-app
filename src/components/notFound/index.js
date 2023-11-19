// Import the necessary styled components
import * as StyledComponent from "./styledComponent";

// Define a functional component called NotFound
const NotFound = () => (
    // Render a container for the error page
    <StyledComponent.ErrorBgContainer>
        {/* Display an image indicating a page not found error */}
        <StyledComponent.ErrorImg
            src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?w=996&t=st=1695035795~exp=1695036395~hmac=e1c5850bc03bc9143082b34047ddfb425b0c1f900a8aff2e761bdd45b8d17550"
            alt="page not found"
        />
    </StyledComponent.ErrorBgContainer>
);

// Export the NotFound component as the default export
export default NotFound;
