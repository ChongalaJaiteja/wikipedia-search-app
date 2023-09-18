import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AllSearchItem from "../allsearchItem";
import Loader from "../loader";
import * as StyledComponent from "./styledComponent";

const AllSearchResults = () => {
    const [query] = useSearchParams();
    const searchQuery = query.get("search_query");
    const [isLoading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10);
    const handleNextPage = () => {
        if (offset + limit <= totalResults) {
            setOffset(offset + limit);
            setCurrentPage((prevPage) => prevPage + 1);
        } else {
            setCurrentPage(1);
            setOffset(0);
        }
    };

    const handlePreviousPage = () => {
        if (offset >= limit) {
            setOffset(offset - limit);
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    //pending
    // const onSubmitPagintaionInput = (event) => {
    //     event.preventDefault();
    //     console.log(currentPage);
    //     if (!currentPage) setCurrentPage(1);
    //     fetchData();
    // };

    const navigateToFirstPage = () => {
        setCurrentPage(1);
        setOffset(0);
    };
    const renderResults = () => (
        <>
            <StyledComponent.AllSearchResultsBgContainer>
                {searchResults.map((eachSearch) => (
                    <AllSearchItem
                        key={uuidv4()}
                        searchItemDetails={eachSearch}
                    />
                ))}
            </StyledComponent.AllSearchResultsBgContainer>

            <StyledComponent.PaginationContainerSm>
                {currentPage > 2 && (
                    <StyledComponent.NavigateToFirstPageTextContainer
                        onClick={navigateToFirstPage}
                    >
                        <StyledComponent.FirstPageNavigationIcon />
                        <StyledComponent.NavigateToFirstPageText>
                            Go to page 1
                        </StyledComponent.NavigateToFirstPageText>
                    </StyledComponent.NavigateToFirstPageTextContainer>
                )}

                <StyledComponent.PageNavigationContainer>
                    {currentPage > 2 && (
                        <StyledComponent.NavigateToFirstPageBgContainer>
                            <StyledComponent.PaginationBtn
                                outline={true}
                                onClick={navigateToFirstPage}
                                title="Go to page 1"
                            >
                                <StyledComponent.FirstPageNavigationIcon />
                            </StyledComponent.PaginationBtn>
                            {/* <StyledComponent.NavigateToFirstPageTextContainer
                                onClick={navigateToFirstPage}
                            >
                                <StyledComponent.FirstPageNavigationIcon />
                                <StyledComponent.NavigateToFirstPageText>
                                    Go to page 1
                                </StyledComponent.NavigateToFirstPageText>
                            </StyledComponent.NavigateToFirstPageTextContainer> */}

                            <StyledComponent.MultiplDots>
                                ....
                            </StyledComponent.MultiplDots>
                        </StyledComponent.NavigateToFirstPageBgContainer>
                    )}
                    {currentPage > 1 && (
                        <StyledComponent.PaginationBtn
                            outline={true}
                            onClick={handlePreviousPage}
                            title="Previous Page"
                        >
                            <StyledComponent.LeftPaginationIcon />
                        </StyledComponent.PaginationBtn>
                    )}
                    <StyledComponent.PaginationBtn
                        onClick={handleNextPage}
                        title="Next Page"
                    >
                        <StyledComponent.RightPaginationIcon />
                    </StyledComponent.PaginationBtn>
                </StyledComponent.PageNavigationContainer>

                <StyledComponent.PageNumberDetails>
                    {currentPage} of {Math.ceil(totalResults / limit)}
                </StyledComponent.PageNumberDetails>
            </StyledComponent.PaginationContainerSm>

            {/* <StyledComponent.PaginationContainerLg>
                {currentPage > 1 && (
                    <StyledComponent.PaginationBtn onClick={handlePreviousPage}>
                        <StyledComponent.LeftPaginationIcon />
                    </StyledComponent.PaginationBtn>
                )}

                <StyledComponent.PaginationBtn onClick={handleNextPage}>
                    Next Page
                    <StyledComponent.RightPaginationIcon />
                </StyledComponent.PaginationBtn>
                <StyledComponent.PaginationInputContainer>
                    <form onSubmit={onSubmitPagintaionInput}>
                        <input
                            type="number"
                            value={currentPage}
                            max={Math.ceil(totalResults / limit)}
                            min="1"
                            // onChange={(event) =>
                            //     setCurrentPage(parseInt(event.target.value))
                            // }
                        />
                    </form>
                    <p>of {Math.ceil(totalResults / limit)}</p>
                </StyledComponent.PaginationInputContainer>
            </StyledComponent.PaginationContainerLg> */}
        </>
    );

    const renderFailureView = () => (
        <StyledComponent.FailedViewBgContainer>
            <StyledComponent.ErrorImg
                src="https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg?w=996&t=st=1694927530~exp=1694928130~hmac=a1cb06f612d499000afda3bcecd029ad306e5b0635f232e33665d58e0ec9f4f1"
                alt="error"
            />
            <br />
            <StyledComponent.RetryBtn onClick={fetchData}>
                Retry
            </StyledComponent.RetryBtn>
        </StyledComponent.FailedViewBgContainer>
    );

    const renderNoResultsFound = () => (
        <StyledComponent.NoResultsFoundContainer>
            <StyledComponent.NoResultsFoundImg
                src="https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527142.jpg?w=740&t=st=1695036731~exp=1695037331~hmac=a793ff5dde6918e306e53726059eb01dd5fa0b560067e4e9df6e20a3d4715314"
                alt="no results"
            />
        </StyledComponent.NoResultsFoundContainer>
    );

    const getData = () => {
        if (error) {
            return renderFailureView();
        } else if (searchResults.length === 0) {
            return renderNoResultsFound();
        } else {
            return renderResults();
        }
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            let apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*&sroffset=${offset}&srlimit=${limit}&srprop=snippet`;
            const response = await fetch(apiUrl);
            let data = await response.json();
            setSearchResults(data.query.search);
            setTotalResults(data.query.searchinfo.totalhits);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        setOffset(0);
        fetchData();
    }, [query]);

    useEffect(() => {
        fetchData();
    }, [offset]);

    return <>{isLoading ? <Loader /> : getData()}</>;
};

export default AllSearchResults;
