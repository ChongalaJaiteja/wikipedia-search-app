import Highlighter from "react-highlight-words";
import Tooltip from "@mui/material/Tooltip";

// Import the useHistoryContext from the "../history" module
import { useHistoryContext } from "../history";
import * as StyledComponent from "./styledComponent";

// Define a React functional component called HistoryItem
const HistoryItem = ({ historyDetails }) => {
    // Destructure properties from the historyDetails object
    const { historyId, time, title, url, isSelected } = historyDetails;

    // Get functions and data from the history context using the useHistoryContext hook
    const { onSelectHistoryItem, historySearchInput } = useHistoryContext();

    // Render the container for each history item
    return (
        <StyledComponent.HistoryItemContainer>
            {/* Container for the content of the history item */}
            <StyledComponent.HistoryItemContentContainer
                htmlFor={historyId.toString()}
            >
                {/* Checkbox for selecting history item */}
                <StyledComponent.HistoryItemCheckBox
                    id={historyId.toString()}
                    checked={isSelected}
                    onChange={(event) =>
                        onSelectHistoryItem(event.target.checked, historyId)
                    }
                />
                {/* Container for the title and time */}
                <StyledComponent.HistoryItemTitleContainer>
                    {/* Display the title with highlighted search words */}
                    <StyledComponent.HistoryItemTitle>
                        <Highlighter
                            searchWords={[historySearchInput]}
                            autoEscape={true}
                            textToHighlight={title}
                        />
                    </StyledComponent.HistoryItemTitle>
                    {/* Display the time */}
                    <StyledComponent.HistoryItemTime>
                        {time}
                    </StyledComponent.HistoryItemTime>
                </StyledComponent.HistoryItemTitleContainer>
            </StyledComponent.HistoryItemContentContainer>
            {/* Tooltip for the link button */}
            <Tooltip title="Link">
                {/* Button for opening the link in a new tab */}
                <StyledComponent.HistoryLinkToolTipButton>
                    <StyledComponent.HistoryItemLink href={url} target="_blank">
                        {/* Icon for the Wikipedia link */}
                        <StyledComponent.WikipediaLinkIcon />
                    </StyledComponent.HistoryItemLink>
                </StyledComponent.HistoryLinkToolTipButton>
            </Tooltip>
        </StyledComponent.HistoryItemContainer>
    );
};

// Export the HistoryItem component as the default export
export default HistoryItem;
