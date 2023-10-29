import { useHistoryContext } from "../history";
import * as StyledComponent from "./styledComponent";
import HistoryItem from "../historyItem";

const HistoryDateItemCard = ({ historyDateItemCardDetails }) => {
    const { onSelectHistoryDate } = useHistoryContext();
    const { date, history } = historyDateItemCardDetails;
    const totalSelected = history.filter((item) => item.isSelected).length;
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
                        <StyledComponent.SelectAllHistoryItemsText htmlFor={date}>
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
