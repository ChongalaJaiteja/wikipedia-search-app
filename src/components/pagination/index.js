import * as StyledComponent from "./styledComponent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// Pagination component is responsible for rendering navigation controls and page information.
const Pagination = ({
    currentPage, // The current page number.
    totalResults, // Total number of results.
    limit, // The number of results per page.
    offset, // The current offset.
    handelCurrentPage, // Function to handle page navigation.
    imageSearch, // Indicates whether it's an image search.
}) => {
    // Function to handle moving to the next page.
    const handleNextPage = () => {
        if (imageSearch) {
            // For image search, check if there are total results.
            if (totalResults) {
                handelCurrentPage({
                    currentPage: currentPage + 1,
                    offset: offset + limit,
                });
            } else {
                // If no total results, reset to the first page.
                handelCurrentPage({ currentPage: 1, offset: 0 });
            }
        } else {
            // For regular search, check if offset + limit is within total results.
            if (offset + limit <= totalResults) {
                handelCurrentPage({
                    currentPage: currentPage + 1,
                    offset: offset + limit,
                });
            } else {
                // If not, reset to the first page.
                handelCurrentPage({ currentPage: 1, offset: 0 });
            }
        }
    };

    // Function to handle moving to the previous page.
    const handlePreviousPage = () => {
        if (offset >= limit) {
            handelCurrentPage({
                currentPage: currentPage - 1,
                offset: offset - limit,
            });
        }
    };

    //TODO
    // const onSubmitPagintaionInput = (event) => {
    //     event.preventDefault();
    //     console.log(currentPage);
    //     if (!currentPage) setCurrentPage(1);
    //     fetchData();
    // };

    // Function to navigate to the first page.
    const navigateToFirstPage = () => {
        handelCurrentPage({ currentPage: 1, offset: 0 });
    };

    return (
        <StyledComponent.PaginationContainerSm>
            {currentPage > 2 && (
                <Tooltip title="Go to page 1">
                    <IconButton>
                        <StyledComponent.NavigateToFirstPageTextContainer
                            onClick={navigateToFirstPage}
                        >
                            <StyledComponent.FirstPageNavigationIcon />
                            <StyledComponent.NavigateToFirstPageText>
                                Go to page 1
                            </StyledComponent.NavigateToFirstPageText>
                        </StyledComponent.NavigateToFirstPageTextContainer>
                    </IconButton>
                </Tooltip>
            )}

            <StyledComponent.PageNavigationContainer>
                {currentPage > 2 && (
                    <StyledComponent.NavigateToFirstPageBgContainer>
                        <Tooltip title="Go to page 1">
                            <IconButton>
                                <StyledComponent.PaginationBtn
                                    outline={true}
                                    onClick={navigateToFirstPage}
                                >
                                    <StyledComponent.FirstPageNavigationIcon />
                                </StyledComponent.PaginationBtn>
                            </IconButton>
                        </Tooltip>

                        {/* <StyledComponent.NavigateToFirstPageTextContainer
                                onClick={navigateToFirstPage}
                            >
                                <StyledComponent.FirstPageNavigationIcon />
                                <StyledComponent.NavigateToFirstPageText>
                                    Go to page 1
                                </StyledComponent.NavigateToFirstPageText>
                            </StyledComponent.NavigateToFirstPageTextContainer> */}

                        <StyledComponent.MultipleDots>
                            ....
                        </StyledComponent.MultipleDots>
                    </StyledComponent.NavigateToFirstPageBgContainer>
                )}
                {currentPage > 1 && (
                    <Tooltip title="Previous Page">
                        <IconButton>
                            <StyledComponent.PaginationBtn
                                outline={true}
                                onClick={handlePreviousPage}
                            >
                                <StyledComponent.LeftPaginationIcon />
                            </StyledComponent.PaginationBtn>
                        </IconButton>
                    </Tooltip>
                )}

                <Tooltip title="Next Page">
                    <IconButton>
                        <StyledComponent.PaginationBtn
                            onClick={handleNextPage}
                            disabled={
                                imageSearch
                                    ? totalResults
                                        ? false
                                        : true
                                    : currentPage ===
                                      Math.ceil(totalResults / limit)
                            }
                        >
                            <StyledComponent.PaginationBtnContent>
                                Next Page
                            </StyledComponent.PaginationBtnContent>
                            <StyledComponent.RightPaginationIcon />
                        </StyledComponent.PaginationBtn>
                    </IconButton>
                </Tooltip>
            </StyledComponent.PageNavigationContainer>

            {!imageSearch && (
                <StyledComponent.PageNumberDetails>
                    {currentPage} of {Math.ceil(totalResults / limit)}
                </StyledComponent.PageNumberDetails>
            )}
        </StyledComponent.PaginationContainerSm>
    );
};

export default Pagination; // Export the Pagination component.
