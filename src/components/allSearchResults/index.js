// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { useModelState } from "../../modelStateContext"; // Import custom hook for model state context
import { useSearchParams } from "react-router-dom"; // Import hook for accessing URL search parameters
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import AllSearchItem from "../allsearchItem"; // Import AllSearchItem component
import Pagination from "../pagination"; // Import Pagination component
import ContentLoader from "react-content-loader"; // Import ContentLoader component for loading animations
import * as StyledComponent from "./styledComponent"; // Import styled components
import PopupModel from "../popupModel"; // Import PopupModel component
import ShareModel from "../shareModel"; // Import ShareModel component
import PageView from "../pageView"; // Import PageView component

// Define the AllSearchResults component responsible for displaying search results
const AllSearchResults = () => {
    // Extract the 'search_query' parameter from the URL
    const [query] = useSearchParams();
    const searchQuery = query.get("search_query");

    // Initialize state variables for loading, search results, total results, current page, error, and offset
    const [isLoading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const limit = 10; // Define the limit of search results to display
    const [fetchTime, setFetchTime] = useState(0);

    // Use the 'useModelState' hook to access model state functions
    const { openModel } = useModelState();

    // Initialize state for sharing a link
    const [shareLink, setShareLink] = useState("");

    // Define a ContentLoader animation for loading placeholders
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

    // Define image URLs for different views (reload and no results)
    const images = {
        reload: "https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg?w=996&t=st=1694927530~exp=1694928130~hmac=a1cb06f612d499000afda3bcecd029ad306e5b0635f232e33665d58e0ec9f4f1",
        noResults: "../../asserts/No data-rafiki.png",
    };

    // Define a function to handle the current page change
    const handelCurrentPage = ({ currentPage, offset }) => {
        setCurrentPage(currentPage);
        setOffset(offset);
    };

    // Define a function to handle sharing a link
    const onShareLink = (link) => {
        setShareLink(link);
        openModel();
    };

    // Define a function to render the search results
    const renderResults = () => (
        <>
            <PopupModel>
                <ShareModel link={shareLink} />
            </PopupModel>

            <StyledComponent.AllSearchResultsBgContainer>
                <StyledComponent.TotalSearchResults>
                    {`${
                        currentPage > 1
                            ? `${offset + 1}-${offset + 10} of`
                            : "About"
                    } ${totalResults.toLocaleString()} results (${fetchTime.toFixed(
                        2
                    )} seconds)
                    `}
                </StyledComponent.TotalSearchResults>

                {searchResults.map((eachSearch) => (
                    <AllSearchItem
                        key={uuidv4()}
                        searchItemDetails={eachSearch}
                        onShareLink={onShareLink}
                    />
                ))}
            </StyledComponent.AllSearchResultsBgContainer>

            <Pagination
                currentPage={currentPage}
                totalResults={totalResults}
                limit={limit}
                offset={offset}
                handelCurrentPage={handelCurrentPage}
            />
        </>
    );

    // Define a function to fetch search results from the Wikipedia API
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        const start = performance.now();
        try {
            let apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*&sroffset=${offset}&srlimit=${limit}&srprop=snippet`;
            const response = await fetch(apiUrl);
            let data = await response.json();
            setSearchResults(data.query.search);
            setTotalResults(data.query.searchinfo.totalhits);
        } catch (error) {
            setError(error);
        } finally {
            const end = performance.now();
            setFetchTime((end - start) / 1000);
            setLoading(false);
        }
    };

    // Use effects to fetch data and reset pagination when the search query changes
    useEffect(() => {
        setCurrentPage(1);
        setOffset(0);
        fetchData();
    }, [query]);

    useEffect(() => {
        fetchData();
    }, [offset]);

    // Define render views for different states (fetching, success, failure)
    const renderViews = {
        fetchData: fetchData,
        loadingView: { isLoading, svgLoader, limit },
        successView: {
            data: searchResults,
            renderResults,
            notFoundImageUrl: images.noResults,
        },
        failureView: {
            reloadImageUrl: images.reload,
            reloadText: "Retry",
            error,
        },
    };

    // Render the PageView component with the chosen view
    return <PageView renderViews={renderViews} />;
};

// Export the AllSearchResults component
export default AllSearchResults;
