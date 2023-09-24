import * as StyledComponents from "./styledComponent";

const SearchOption = (props) => {
    const { searchOptionDetails, onSelectSearchOption, isCurrentSearchOption } =
        props;
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
