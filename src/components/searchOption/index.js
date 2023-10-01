import * as StyledComponents from "./styledComponent";

const SearchOption = ({
    searchOptionDetails,
    onSelectSearchOption,
    isCurrentSearchOption,
}) => {
    const { id, option } = searchOptionDetails;
    const onSelectOption = () => {
        onSelectSearchOption(id);
    };

    return (
        <StyledComponents.SearchOption
            selected={isCurrentSearchOption}
            onClick={onSelectOption}
        >
            {option}
        </StyledComponents.SearchOption>
    );
};

export default SearchOption;
