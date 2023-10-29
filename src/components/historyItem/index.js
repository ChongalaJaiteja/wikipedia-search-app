import Highlighter from "react-highlight-words";
import Tooltip from "@mui/material/Tooltip";

import { useHistoryContext } from "../history";
import * as StyledComponent from "./styledComponent";

const HistoryItem = ({ historyDetails }) => {
    const { historyId, time, title, url, isSelected } = historyDetails;
    const { onSelectHistoryItem, historySearchInput } = useHistoryContext();

    return (
        <StyledComponent.HistoryItemContainer>
            <StyledComponent.HistoryItemContentContainer
                htmlFor={historyId.toString()}
            >
                <StyledComponent.HistoryItemCheckBox
                    id={historyId.toString()}
                    checked={isSelected}
                    onChange={(event) =>
                        onSelectHistoryItem(event.target.checked, historyId)
                    }
                />
                <StyledComponent.HistoryItemTitleContainer>
                    <StyledComponent.HistoryItemTitle>
                        <Highlighter
                            searchWords={[historySearchInput]}
                            autoEscape={true}
                            textToHighlight={title}
                        />
                    </StyledComponent.HistoryItemTitle>
                    <StyledComponent.HistoryItemTime>
                        {time}
                    </StyledComponent.HistoryItemTime>
                </StyledComponent.HistoryItemTitleContainer>
            </StyledComponent.HistoryItemContentContainer>
            <Tooltip title="Link">
                <StyledComponent.HistoryLinkToolTipButton>
                    <StyledComponent.HistoryItemLink href={url} target="_blank">
                        <StyledComponent.WikipediaLinkIcon />
                    </StyledComponent.HistoryItemLink>
                </StyledComponent.HistoryLinkToolTipButton>
            </Tooltip>
        </StyledComponent.HistoryItemContainer>
    );
};

export default HistoryItem;
