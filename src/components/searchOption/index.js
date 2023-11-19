import * as StyledComponents from "./styledComponent";

// SearchOption component represents an individual search option in a list.
const SearchOption = ({
    searchOptionDetails, // Information about the search option (e.g., id and option text).
    onSelectSearchOption, // Function to handle the selection of a search option.
    isCurrentSearchOption, // Indicates if the current option is selected.
}) => {
    // Destructure the id and option from searchOptionDetails.
    const { id, option } = searchOptionDetails;

    // Function to handle the selection of this search option.
    const onSelectOption = () => {
        onSelectSearchOption(id);
    };

    return (
        <StyledComponents.SearchOption
            selected={isCurrentSearchOption} // Apply a "selected" style if it's the current search option.
            onClick={onSelectOption} // Trigger the onSelectOption function on click.
        >
            {option} {/* Display the text of the search option. */}
        </StyledComponents.SearchOption>
    );
};

export default SearchOption; // Export the SearchOption component.
