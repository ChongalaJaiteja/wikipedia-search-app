import ReloadPage from "../reloadPage";
import NoResultsFound from "../noResultsFound";
import Pagination from "../pagination";
import Loader from "../loader";

// This component is responsible for rendering different views based on the provided props.
const PageView = ({
    renderViews, // An object containing different views for loading, success, and failure.
    isImageSearch, // A boolean flag indicating if it's an image search.
    currentPage, // The current page number.
    offset, // The offset.
    handelCurrentPage, // A function to handle changing the current page.
}) => {
    // Destructuring renderViews to access different views.
    const { fetchData, loadingView, successView, failureView } = renderViews;
    const { limit, svgLoader, isLoading } = loadingView; // Destructuring loadingView.
    const { data, renderResults, notFoundImageUrl } = successView; // Destructuring successView.
    const { reloadImageUrl, reloadText, error } = failureView; // Destructuring failureView.

    // This function renders the loader view.
    const renderLoaderView = () => {
        return (
            <Loader
                svgLoader={svgLoader}
                limit={limit}
                isImageLayout={isImageSearch}
            />
        );
    };

    // This function renders the failure view.
    const renderFailureView = () => {
        return (
            <ReloadPage
                reloadImageUrl={reloadImageUrl}
                reloadFunction={fetchData}
                reloadText={reloadText}
            />
        );
    };

    // This function renders the view when no results are found.
    const renderNoResultsFound = () => {
        return (
            <>
                <NoResultsFound notFoundImageUrl={notFoundImageUrl} />
                {isImageSearch && (
                    <Pagination
                        imageSearch={true}
                        currentPage={currentPage}
                        totalResults={data.length > 0} // Checking if there are results.
                        limit={limit}
                        offset={offset}
                        handelCurrentPage={handelCurrentPage}
                    />
                )}
            </>
        );
    };

    // This function determines which view to render based on the provided props.
    const getData = () => {
        if (isLoading) return renderLoaderView(); // If loading, show the loader view.
        if (error) return renderFailureView(); // If there is an error, show the failure view.
        if (data.length === 0) return renderNoResultsFound(); // If no results, show the "No Results Found" view.
        return renderResults(); // Otherwise, render the success view.
    };

    // Render the appropriate view based on the conditions.
    return <>{getData()}</>;
};

export default PageView; // Export the PageView component.
