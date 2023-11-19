/* eslint-disable no-useless-concat */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";
import Tooltip from "@mui/material/Tooltip";
import { createContext } from "react";
import { useAuthContext } from "../../authContext";
import PageView from "../pageView";
import HistoryDateItemCard from "../historyDateItemCard";
import * as StyledComponent from "./styledComponent";
import Toaster from "../toaster";
import toast from "react-hot-toast";
import { SelectAllHistoryItemsText } from "../historyDateItemCard/styledComponent";

// Create a context for managing history-related state
const HistoryContext = createContext();

// Create a custom hook for using history-related context
export const useHistoryContext = () => useContext(HistoryContext);

// Define the History component responsible for displaying user history
export const History = () => {
    // Initialize state variables to manage history-related data
    const [historyList, setHistoryList] = useState([]);
    const [historyError, setHistoryError] = useState(false);
    const [historySearchInput, setHistorySearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { jwtToken } = useAuthContext();
    const limit = 5;
    const [offset, setOffset] = useState(0);
    const [showSearchInputSm, setShowSearchInputSm] = useState(false);
    const [totalHistorySelected, setTotalHistorySelected] = useState(0);
    const [isAllHistorySelected, setIsAllHistorySelected] = useState(false);
    const navigate = useNavigate();

    // Function to fetch user history
    const fetchHistory = async () => {
        setIsLoading(true);
        setHistoryError(false);
        try {
            const url = `${process.env.REACT_APP_BASE_URL}/history?limit=${limit}&offset=${offset}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: "GET",
            };
            const response = await fetch(url, options);
            const data = await response.json();
            // Format the history data to include 'isSelected' property
            const formattedData = data.map(({ date, history }) => ({
                date,
                history: history.map((eachHistoryItem) => ({
                    ...eachHistoryItem,
                    isSelected: false,
                })),
            }));
            setHistoryList(formattedData);
        } catch (error) {
            setHistoryError(true);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle input changes in the search history field
    const handleOnChange = (event) => {
        setHistorySearchInput(event.target.value);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        // Calculate the total number of selected history items
        let total = 0;
        historyList.forEach(({ history }) => {
            total += history.filter(({ isSelected }) => isSelected).length;
        });
        setTotalHistorySelected(total);
    }, [historyList]);

    // Define images for various states (reload and no results)
    const images = {
        reload: "https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg?w=996&t=st=1694927530~exp=1694928130~hmac=a1cb06f612d499000afda3bcecd029ad306e5b0635f232e33665d58e0ec9f4f1",
        noResults:
            "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527142.jpg?w=740&t=st=1695036731~exp=1695037331~hmac=a793ff5dde6918e306e53726059eb01dd5fa0b560067e4e9df6e20a3d4715314",
    };

    // Function to handle selection of history by date
    const onSelectHistoryDate = (isChecked, selectedDate) => {
        setHistoryList((prevList) =>
            prevList.map(({ date, history }) => ({
                date,
                history: history.map((eachHistoryItem) => ({
                    ...eachHistoryItem,
                    isSelected:
                        date === selectedDate
                            ? isChecked
                            : eachHistoryItem.isSelected,
                })),
            }))
        );
    };

    // Function to handle selection of individual history items
    const onSelectHistoryItem = (isChecked, historyId) => {
        setHistoryList((prevList) =>
            prevList.map(({ date, history }) => ({
                date,
                history: history.map((eachHistoryItem) => ({
                    ...eachHistoryItem,
                    isSelected:
                        eachHistoryItem.historyId === historyId
                            ? isChecked
                            : eachHistoryItem.isSelected,
                })),
            }))
        );
    };

    // Function to render the filtered history data
    const renderHistory = () => {
        const filteredHistoryList = historyList.reduce(
            (result, { date, history }) => {
                const filteredHistoryItem = history.filter(({ title }) =>
                    title
                        .toLowerCase()
                        .includes(historySearchInput.toLowerCase())
                );
                if (filteredHistoryItem.length > 0) {
                    result.push({
                        date,
                        history: filteredHistoryItem,
                    });
                }
                return result;
            },
            []
        );

        const selectAllHistoryItems = (event) => {
            setIsAllHistorySelected((prev) => !prev);
        };

        return (
            <HistoryContext.Provider
                value={{
                    historySearchInput,
                    onSelectHistoryDate,
                    onSelectHistoryItem,
                }}
            >
                <StyledComponent.HistoryItemsBgContainer>
                    <StyledComponent.SelectAllHistoryItemsCheckBoxBgContainer>
                        <StyledComponent.SelectAllHistoryItemsCheckBox
                            type="checkbox"
                            onChange={selectAllHistoryItems}
                            checked={isAllHistorySelected}
                        />
                        <label>Select All</label>
                    </StyledComponent.SelectAllHistoryItemsCheckBoxBgContainer>
                    {filteredHistoryList.map((eachHistoryByDate) => (
                        <HistoryDateItemCard
                            historyDateItemCardDetails={eachHistoryByDate}
                            key={eachHistoryByDate.date}
                        />
                    ))}
                </StyledComponent.HistoryItemsBgContainer>
            </HistoryContext.Provider>
        );
    };

    // Function to handle canceling the deletion of selected history items
    const handleCancelDeleteHistory = () => {
        setTotalHistorySelected(0);
        setHistoryList((prevList) =>
            prevList.map(({ date, history }) => ({
                date,
                history: history.map((eachHistoryItem) => ({
                    ...eachHistoryItem,
                    isSelected: false,
                })),
            }))
        );
    };

    // Function to handle the deletion of selected history items
    const handleDeleteHistory = async (event) => {
        event.preventDefault();
        // Get the IDs of selected history items for deletion
        const historyIds = historyList.reduce((result, { history }) => {
            const selectedIds = history
                .filter(({ isSelected }) => isSelected)
                .map(({ historyId }) => historyId);
            return [...result, ...selectedIds];
        }, []);

        try {
            const url = `${process.env.REACT_APP_BASE_URL}/history`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({ historyIds }),
                method: "DELETE",
            };
            const response = await fetch(url, options);
            if (response.ok) {
                toast.success("History Deleted successfully");
                fetchHistory();
            } else {
                toast.error("Failed to Delete History");
            }
        } catch (error) {
            toast.error("Server Error");
        } finally {
            setTotalHistorySelected(0);
        }
    };

    // Define a loading view with a content loader
    const svgLoader = (
        <ContentLoader
            speed={0.3}
            width="100%"
            height={124}
            viewBox="0 0 100% 124"
            backgroundColor="#e6e6e6"
            foregroundColor="#d4d4d4"
        >
            <rect x="4" y="28" rx="10" ry="10" width="70%" height="18" />
            <rect x="4" y="52" rx="10" ry="10" width="99%" height="43" />
            <rect x="5" y="6" rx="10" ry="10" width="20%" height="17" />
        </ContentLoader>
    );

    // Define the views for PageView component
    const renderViews = {
        fetchData: fetchHistory, // Function to fetch history data
        loadingView: { isLoading, svgLoader, limit },
        successView: {
            data: historyList,
            renderResults: renderHistory,
            notFoundImageUrl: images.noResults,
        },
        failureView: {
            reloadImageUrl: images.reload,
            reloadText: "Retry",
            error: historyError,
        },
    };

    return (
        <>
            <Toaster />
            <StyledComponent.HistoryBgContainer>
                <StyledComponent.HistoryNavBar>
                    {!totalHistorySelected && (
                        <StyledComponent.HistorySearchInputFormContainer>
                            {!showSearchInputSm && (
                                <>
                                    <Tooltip
                                        title="Back"
                                        onClick={() => navigate(-1)}
                                    >
                                        <StyledComponent.ToolTipButton>
                                            <StyledComponent.NavigateBackIcon />
                                        </StyledComponent.ToolTipButton>
                                    </Tooltip>

                                    <StyledComponent.HistoryMainHeading>
                                        History
                                    </StyledComponent.HistoryMainHeading>

                                    <StyledComponent.SearchIcon
                                        onClick={() =>
                                            setShowSearchInputSm(true)
                                        }
                                    />
                                </>
                            )}

                            {showSearchInputSm && (
                                <>
                                    <StyledComponent.SearchIcon />
                                    <StyledComponent.HistorySearchInputSm
                                        type="search"
                                        autoFocus={true}
                                        placeholder="Search history"
                                        onBlur={() =>
                                            setShowSearchInputSm(false)
                                        }
                                        onChange={handleOnChange}
                                        value={historySearchInput}
                                    />
                                </>
                            )}

                            <StyledComponent.SearchHistoryInput
                                type="search"
                                placeholder="Search history"
                                value={historySearchInput}
                                onChange={handleOnChange}
                            />
                        </StyledComponent.HistorySearchInputFormContainer>
                    )}

                    {totalHistorySelected > 0 && (
                        <StyledComponent.DeleteBgContainer>
                            <StyledComponent.DeleteCountDetailsContainer>
                                <Tooltip
                                    title="Cancel"
                                    onClick={handleCancelDeleteHistory}
                                >
                                    <StyledComponent.ToolTipButton>
                                        <StyledComponent.CloseIcon />
                                    </StyledComponent.ToolTipButton>
                                </Tooltip>
                                <StyledComponent.SelectedHistoryItemsCount>
                                    {totalHistorySelected} Selected
                                </StyledComponent.SelectedHistoryItemsCount>
                            </StyledComponent.DeleteCountDetailsContainer>

                            <StyledComponent.DeleteHistoryFormContainer
                                onSubmit={handleDeleteHistory}
                            >
                                <StyledComponent.DeleteIcon
                                    onClick={handleDeleteHistory}
                                />
                                <StyledComponent.DeleteBtn type="submit">
                                    Delete
                                </StyledComponent.DeleteBtn>
                            </StyledComponent.DeleteHistoryFormContainer>
                        </StyledComponent.DeleteBgContainer>
                    )}
                </StyledComponent.HistoryNavBar>
                <PageView renderViews={renderViews} />
            </StyledComponent.HistoryBgContainer>
        </>
    );
};
