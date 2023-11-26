/* eslint-disable no-useless-concat */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Tooltip from "@mui/material/Tooltip";
import { createContext } from "react";
import { useAuthContext } from "../../authContext";
import PageView from "../pageView";
import HistoryDateItemCard from "../historyDateItemCard";
import * as StyledComponent from "./styledComponent";
import Toaster from "../toaster";
import toast from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";
import { SelectAllHistoryItemsText } from "../historyDateItemCard/styledComponent";
import errorImg from "../../asserts/something-went-wrong.avif";
import noResultsFound from "../../asserts/noData.png";
import Pagination from "../pagination";

// Create a context for managing history-related state
const HistoryContext = createContext();

// Create a custom hook for using history-related context
export const useHistoryContext = () => useContext(HistoryContext);

// Define the History component responsible for displaying user history
export const History = () => {
    // Initialize state variables to manage history-related data
    const [historyList, setHistoryList] = useState([]);
    const [totalHistoryResults, setTotalHistoryResults] = useState(0);
    const [historyError, setHistoryError] = useState(false);
    const [historySearchInput, setHistorySearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { jwtToken } = useAuthContext();
    const limit = 5;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showSearchInputSm, setShowSearchInputSm] = useState(false);
    const [totalHistorySelected, setTotalHistorySelected] = useState(0);
    const [isAllHistorySelected, setIsAllHistorySelected] = useState(false);
    const [isHistoryDeleting, setIsHistoryDeleting] = useState(false);
    const navigate = useNavigate();
    const filteredHistoryList = historyList.reduce(
        (result, { date, history }) => {
            const filteredHistoryItem = history.filter(({ title }) =>
                title.toLowerCase().includes(historySearchInput.toLowerCase())
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

    // Function to fetch user history
    const fetchHistory = async () => {
        setIsLoading(true);
        setHistoryError(false);
        try {
            const url = `${process.env.REACT_APP_BASE_URL}/history?limit=${limit}&offset=${offset}&search_q=${historySearchInput}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: "GET",
            };
            const response = await fetch(url, options);
            const data = await response.json();
            setTotalHistoryResults(data.total_history);
            // Format the history data to include 'isSelected' property
            const formattedData = data.historyData.map(({ date, history }) => ({
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
    }, [offset]);

    useEffect(() => {
        if (historySearchInput.trim()) {
            const timerId = setTimeout(() => {
                fetchHistory();
            }, 900);
            return () => clearTimeout(timerId);
        } else fetchHistory();
    }, [historySearchInput]);

    useEffect(() => {
        // Calculate the total number of selected history items
        let total = 0;
        filteredHistoryList.forEach(({ history }) => {
            total += history.filter(({ isSelected }) => isSelected).length;
        });
        setTotalHistorySelected(total);
        const isHistorySelected =
            filteredHistoryList.filter(
                ({ history }) =>
                    history.filter((item) => item.isSelected).length ===
                    history.length
            ).length === historyList.length;
        setIsAllHistorySelected(isHistorySelected);
    }, [historyList]);

    // Define images for various states (reload and no results)
    const images = {
        reload: errorImg,
        noResults: noResultsFound,
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

    // Define a function to handle current page changes
    const handelCurrentPage = ({ currentPage, offset }) => {
        setCurrentPage(currentPage);
        setOffset(offset);
    };

    // Function to render the filtered history data
    const renderHistory = () => {
        const selectAllHistoryItems = (event) => {
            setIsAllHistorySelected(event.target.checked);
            setHistoryList((prevList) =>
                prevList.map(({ date, history }) => ({
                    date,
                    history: history.map((eachHistoryItem) => ({
                        ...eachHistoryItem,
                        isSelected: event.target.checked,
                    })),
                }))
            );
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
                            id="selectAllHistoryItems"
                            onChange={selectAllHistoryItems}
                            checked={isAllHistorySelected}
                        />
                        <label htmlFor="selectAllHistoryItems">
                            Select All
                        </label>
                    </StyledComponent.SelectAllHistoryItemsCheckBoxBgContainer>
                    {filteredHistoryList.map((eachHistoryByDate) => (
                        <HistoryDateItemCard
                            historyDateItemCardDetails={eachHistoryByDate}
                            key={eachHistoryByDate.date}
                        />
                    ))}
                    <Pagination
                        currentPage={currentPage}
                        totalResults={totalHistoryResults} // Checking if there are results.
                        limit={limit}
                        offset={offset}
                        handelCurrentPage={handelCurrentPage}
                    />
                </StyledComponent.HistoryItemsBgContainer>
            </HistoryContext.Provider>
        );
    };

    // Function to handle canceling the deletion of selected history items
    const handleCancelDeleteHistory = () => {
        setTotalHistorySelected(0);
        setIsAllHistorySelected(false);
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
        const historyIds = filteredHistoryList.reduce((result, { history }) => {
            const selectedIds = history
                .filter(({ isSelected }) => isSelected)
                .map(({ historyId }) => historyId);
            return [...result, ...selectedIds];
        }, []);

        try {
            setIsHistoryDeleting(true);
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
            setIsAllHistorySelected(false);
            setIsHistoryDeleting(false);
            setHistorySearchInput("");
        }
    };

    // Define a loading view with a content loader
    const svgLoader = (
        <StyledComponent.LoaderBgContainer>
            <ClipLoader color="#6e7170" />
        </StyledComponent.LoaderBgContainer>
    );

    const loaderLimit = 1;
    // Define the views for PageView component
    const renderViews = {
        fetchData: fetchHistory, // Function to fetch history data
        loadingView: { isLoading, svgLoader, limit: loaderLimit },
        successView: {
            data: filteredHistoryList,
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
            {/* <PopupModel isHistoryLoader={true}> */}
            {/* </PopupModel> */}
            <Toaster />
            <StyledComponent.HistoryBgContainer>
                <StyledComponent.HistoryNavBar>
                    {!totalHistorySelected && (
                        <StyledComponent.HistorySearchInputFormContainer
                            onSubmit={(event) => event.preventDefault()}
                        >
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
                {isHistoryDeleting && (
                    <StyledComponent.HistoryDeleteLoaderBgContainer>
                        <BarLoader color="#48b39e" />
                    </StyledComponent.HistoryDeleteLoaderBgContainer>
                )}
                <PageView renderViews={renderViews} />
            </StyledComponent.HistoryBgContainer>
        </>
    );
};
