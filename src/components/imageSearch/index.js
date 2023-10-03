import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Masonry from "react-responsive-masonry";
import { v4 as uuidv4 } from "uuid";
import ContentLoader from "react-content-loader";
import Loader from "../loader";
import ReloadPage from "../reloadPage";
import * as StyledComponent from "./styledComponent";
import Pagination from "../pagination";
import NoResultsFound from "../noResultsFound";

const ImageSearch = () => {
    const [query] = useSearchParams();
    const searchQuery = query.get("search_query");
    const limit = 10;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // const [titles, setTitles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [imagesList, setImageUrls] = useState([]);

    const images = {
        reload: "https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg?w=996&t=st=1694927530~exp=1694928130~hmac=a1cb06f612d499000afda3bcecd029ad306e5b0635f232e33665d58e0ec9f4f1",
        noResults:
            "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527142.jpg?w=740&t=st=1695036731~exp=1695037331~hmac=a793ff5dde6918e306e53726059eb01dd5fa0b560067e4e9df6e20a3d4715314",
    };

    const handelCurrentPage = ({ currentPage, offset }) => {
        setCurrentPage(currentPage);
        setOffset(offset);
    };

    const fetchImages = async () => {
        setError(false);
        setLoading(true);
        try {
            const titlesResponse = await fetch(
                `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*&srprop=title&srlimit=${limit}&sroffset=${offset}`
            );
            const titlesData = await titlesResponse.json();
            const fetchedTitles = titlesData.query.search.map(
                ({ title }) => title
            );

            const filteredImagesSet = new Set();

            const imagePromises = fetchedTitles.map(async (wikipediaTitle) => {
                const imageResponse = await fetch(
                    `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=images&titles=${wikipediaTitle}`
                );
                const imageData = await imageResponse.json();
                const images =
                    imageData.query.pages[Object.keys(imageData.query.pages)[0]]
                        .images || [];
                images.forEach(({ title }) => {
                    if (
                        title.toLowerCase().endsWith(".jpg") ||
                        title.toLowerCase().endsWith(".jpeg")
                    ) {
                        filteredImagesSet.add({ title, wikipediaTitle });
                    }
                });

                return null;
            });

            await Promise.all(imagePromises);

            const uniqueImagesArray = Array.from(filteredImagesSet).map(
                ({ title, wikipediaTitle }) => {
                    let newTitle = title.slice(5);
                    if (newTitle.toLowerCase().trim().endsWith(".jpg")) {
                        newTitle = newTitle.slice(0, newTitle.length - 4);
                    } else newTitle = newTitle.slice(0, newTitle.length - 5);

                    return {
                        url: `https://en.wikipedia.org/wiki/Special:FilePath/${title}`,
                        title: newTitle,
                        wikipediaTitle,
                    };
                }
            );

            setImageUrls(uniqueImagesArray);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const renderLoaderView = () => {
        const svgLoader = (
            <ContentLoader
                speed={0.4}
                width="100%"
                height={324}
                viewBox="0 0 476 100%"
                backgroundColor="#dedede"
                foregroundColor="#bababa"
            >
                <rect x="35" y="8" rx="10" ry="10" width="172" height="177" />
                <rect x="411" y="104" rx="0" ry="0" width="6" height="0" />
                <rect x="34" y="194" rx="10" ry="10" width="176" height="21" />
            </ContentLoader>
        );
        return (
            <Loader svgLoader={svgLoader} limit={limit} isImageLayout={true} />
        );
    };

    const renderErrorView = () => {
        const reloadImageUrl = images.reload;
        return (
            <ReloadPage
                reloadImageUrl={reloadImageUrl}
                reloadFunction={fetchImages}
                reloadText="Retry"
            />
        );
    };
    const renderimagesNotFoundView = () => {
        const notFoundImageUrl = images.noResults;
        return <NoResultsFound notFoundImageUrl={notFoundImageUrl} />;
    };

    const renderImagesView = () => {
        return (
            <>
                <StyledComponent.ResponsiveMansoryLayout
                    columnsCountBreakPoints={{
                        320: 1,
                        440: 2,
                        590: 3,
                        825: 4,
                        1100: 5,
                    }}
                >
                    <Masonry gutter="1em">
                        {imagesList.map((eachImageCard, index) => (
                            <StyledComponent.WikipediaTitleLink
                                href={`https://en.wikipedia.org/wiki/${eachImageCard.wikipediaTitle}`}
                                target="_blank"
                                rel="noreferrer"
                                key={uuidv4()}
                            >
                                <StyledComponent.ImageCard key={uuidv4()}>
                                    <StyledComponent.WikipediaImage
                                        src={eachImageCard.url}
                                        alt={eachImageCard.title}
                                        loading="lazy"
                                    />
                                    <StyledComponent.ImageCardContent>
                                        <StyledComponent.WikipediaTitleLink
                                            href={`https://en.wikipedia.org/wiki/${eachImageCard.wikipediaTitle}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            title={eachImageCard.title}
                                        >
                                            <StyledComponent.ImageCardTitle>
                                                {eachImageCard.title}
                                            </StyledComponent.ImageCardTitle>
                                        </StyledComponent.WikipediaTitleLink>
                                    </StyledComponent.ImageCardContent>
                                </StyledComponent.ImageCard>
                            </StyledComponent.WikipediaTitleLink>
                        ))}
                    </Masonry>
                </StyledComponent.ResponsiveMansoryLayout>
                <Pagination
                    currentPage={currentPage}
                    totalResults={100}
                    limit={limit}
                    offset={offset}
                    handelCurrentPage={handelCurrentPage}
                />
            </>
        );
    };

    const renderImages = () => {
        if (loading) return renderLoaderView();
        else if (isError) return renderErrorView();
        else if (imagesList.length === 0) return renderimagesNotFoundView();
        else return renderImagesView();
    };

    useEffect(() => {
        fetchImages();
    }, [searchQuery, offset]);

    return <>{renderImages()}</>;
};

export default ImageSearch;
