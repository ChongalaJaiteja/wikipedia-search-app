import * as StyledComponent from "./styledComponent";

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
            {currentPage >= 2 && (
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

                        <StyledComponent.MultipleDots>
                            ....
                        </StyledComponent.MultipleDots>
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
                    disabled={currentPage === Math.ceil(totalResults / limit)}
                >
                    <StyledComponent.PaginationBtnContent>
                        Next Page
                    </StyledComponent.PaginationBtnContent>
                    <StyledComponent.RightPaginationIcon />
                </StyledComponent.PaginationBtn>
            </StyledComponent.PageNavigationContainer>

            <StyledComponent.PageNumberDetails>
                {currentPage} of {Math.ceil(totalResults / limit)}
            </StyledComponent.PageNumberDetails>
        </StyledComponent.PaginationContainerSm>
    );
};

export default Pagination;
