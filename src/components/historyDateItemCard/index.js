import { useHistoryContext } from "../history"; // Import the history context hook
import * as StyledComponent from "./styledComponent"; // Import styled components for rendering
import HistoryItem from "../historyItem"; // Import the individual history item component

// HistoryDateItemCard component displays a list of history items grouped by date
const HistoryDateItemCard = ({ historyDateItemCardDetails }) => {
    // Get the onSelectHistoryDate function from the history context
    const { onSelectHistoryDate } = useHistoryContext();

    // Extract date and history data from the provided historyDateItemCardDetails
    const { date, history } = historyDateItemCardDetails;

    // Calculate the total number of selected history items in this group
    const totalSelected = history.filter((item) => item.isSelected).length;

    // Check if all history items in this group are selected
    const isSelected = totalSelected === history.length;

    return (
        <StyledComponent.HistoryItemDateMainContainer>
            <StyledComponent.HistoryItemDateContainer>
                {totalSelected > 0 && (
                    <>
                        <StyledComponent.CheckBox
                            id={date}
                            onChange={(event) =>
                                onSelectHistoryDate(event.target.checked, date)
                            }
                            checked={isSelected}
                        />
                        <StyledComponent.SelectAllHistoryItemsText
                            htmlFor={date}
                        >
                            Select all
                        </StyledComponent.SelectAllHistoryItemsText>
                    </>
                )}

                <StyledComponent.HistoryItemDate>
                    {date}
                </StyledComponent.HistoryItemDate>
            </StyledComponent.HistoryItemDateContainer>

            <StyledComponent.HistoryItemsDateBgContainer>
                {history.map((eachHistory) => (
                    <HistoryItem
                        historyDetails={eachHistory}
                        key={eachHistory.historyId}
                    />
                ))}
            </StyledComponent.HistoryItemsDateBgContainer>
        </StyledComponent.HistoryItemDateMainContainer>
    );
};

export default HistoryDateItemCard;
