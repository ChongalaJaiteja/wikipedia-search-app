import * as StyledComponent from "./styledComponent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Pagination = ({
    currentPage,
    totalResults,
    limit,
    offset,
    handelCurrentPage,
}) => {
    const handleNextPage = () => {
        if (offset + limit <= totalResults) {
            handelCurrentPage({
                currentPage: currentPage + 1,
                offset: offset + limit,
            });
        } else {
            handelCurrentPage({ currentPage: 1, offset: 0 });
        }
    };

    const handlePreviousPage = () => {
        if (offset >= limit) {
            handelCurrentPage({
                currentPage: currentPage - 1,
                offset: offset - limit,
            });
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
                            // title="Next Page"
                            disabled={
                                currentPage === Math.ceil(totalResults / limit)
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

            <StyledComponent.PageNumberDetails>
                {currentPage} of {Math.ceil(totalResults / limit)}
            </StyledComponent.PageNumberDetails>
        </StyledComponent.PaginationContainerSm>
    );
};

export default Pagination;
