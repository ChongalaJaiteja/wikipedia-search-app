import ReloadPage from "../reloadPage";
import NoResultsFound from "../noResultsFound";
import Pagination from "../pagination";
import Loader from "../loader";

const PageView = ({
    renderViews,
    isImageSearch,
    currentPage,
    offset,
    handelCurrentPage,
}) => {
    const { fetchData, loadingView, successView, failureView } = renderViews;
    const { limit, svgLoader, isLoading } = loadingView;
    const { data, renderResults, notFoundImageUrl } = successView;
    const { reloadImageUrl, reloadText, error } = failureView;

    const renderLoaderView = () => {
        return (
            <Loader
                svgLoader={svgLoader}
                limit={limit}
                isImageLayout={isImageSearch}
            />
        );
    };

    const renderFailureView = () => {
        return (
            <ReloadPage
                reloadImageUrl={reloadImageUrl}
                reloadFunction={fetchData}
                reloadText={reloadText}
            />
        );
    };

    const renderNoResultsFound = () => {
        return (
            <>
                <NoResultsFound notFoundImageUrl={notFoundImageUrl} />
                {isImageSearch && (
                    <Pagination
                        imageSearch={true}
                        currentPage={currentPage}
                        totalResults={data.length > 0}
                        limit={limit}
                        offset={offset}
                        handelCurrentPage={handelCurrentPage}
                    />
                )}
            </>
        );
    };

    const getData = () => {
        if (isLoading) return renderLoaderView();
        if (error) return renderFailureView();
        if (data.length === 0) return renderNoResultsFound();
        return renderResults();
    };

    return <>{getData()}</>;
};

export default PageView;
