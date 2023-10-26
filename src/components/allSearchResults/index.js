import React, { useState, useEffect } from "react";
import { useModelState } from "../../modelStateContext";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AllSearchItem from "../allsearchItem";
import Pagination from "../pagination";
import ContentLoader from "react-content-loader";
import * as StyledComponent from "./styledComponent";
import PopupModel from "../popupModel";
import ShareModel from "../shareModel";
import PageView from "../pageView";

const AllSearchResults = () => {
    const [query] = useSearchParams();
    const searchQuery = query.get("search_query");
    const [isLoading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [fetchTime, setFetchTime] = useState(0);
    const { openModel } = useModelState();
    const [shareLink, setShareLink] = useState("");

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

    const images = {
        reload: "https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg?w=996&t=st=1694927530~exp=1694928130~hmac=a1cb06f612d499000afda3bcecd029ad306e5b0635f232e33665d58e0ec9f4f1",
        noResults:
            "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527142.jpg?w=740&t=st=1695036731~exp=1695037331~hmac=a793ff5dde6918e306e53726059eb01dd5fa0b560067e4e9df6e20a3d4715314",
    };

    const handelCurrentPage = ({ currentPage, offset }) => {
        setCurrentPage(currentPage);
        setOffset(offset);
    };

    const onShareLink = (link) => {
        setShareLink(link);
        openModel();
    };

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

    useEffect(() => {
        setCurrentPage(1);
        setOffset(0);
        fetchData();
    }, [query]);

    useEffect(() => {
        fetchData();
    }, [offset]);

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

    return <PageView renderViews={renderViews} />;
};

export default AllSearchResults;
