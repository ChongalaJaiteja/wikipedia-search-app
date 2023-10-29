import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Masonry from "react-responsive-masonry";
import { v4 as uuidv4 } from "uuid";
import ContentLoader from "react-content-loader";
import * as StyledComponent from "./styledComponent";
import Pagination from "../pagination";
import { useAuthContext } from "../../authContext";
import PageView from "../pageView";

const ImageSearch = () => {
    const [query] = useSearchParams();
    const searchQuery = query.get("search_query");
    const limit = 10;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [imagesList, setImageUrls] = useState([]);
    const { jwtToken, isSignedIn } = useAuthContext();

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
        setIsLoading(true);
        try {
            const titlesResponse = await fetch(
                `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*&srprop=title&srlimit=${limit}&sroffset=${offset}`
            );
            const titlesData = await titlesResponse.json();
            const fetchedTitles = titlesData.query.search.map(
                ({ title }) => title
            );

            const fetchedImages = [];

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
                        fetchedImages.push({ title, wikipediaTitle });
                    }
                });

                return null;
            });

            await Promise.all(imagePromises);

            const formattedImages = fetchedImages
                .filter(
                    (image, index, self) =>
                        self.findIndex((img) => img.title === image.title) ===
                        index
                )
                .map(({ title, wikipediaTitle }) => {
                    let newTitle = title.slice(5);
                    if (newTitle.toLowerCase().trim().endsWith(".jpg")) {
                        newTitle = newTitle.slice(0, newTitle.length - 4);
                    } else newTitle = newTitle.slice(0, newTitle.length - 5);

                    return {
                        url: `https://en.wikipedia.org/wiki/Special:FilePath/${title}`,
                        title: newTitle,
                        wikipediaTitle,
                    };
                });
            setImageUrls(formattedImages);
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const onClickImage = async ({ wikipediaTitle }) => {
        const link = `https://en.wikipedia.org/wiki/${wikipediaTitle}`;
        try {
            const url = `${process.env.REACT_APP_BASE_URL}/history`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: "POST",
                body: JSON.stringify({
                    title: wikipediaTitle,
                    link,
                }),
            };
            await fetch(url, options);
        } catch (error) {
            console.log(error);
        }
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
                                onClick={() =>
                                    isSignedIn && onClickImage(eachImageCard)
                                }
                            >
                                <StyledComponent.ImageCard
                                    key={uuidv4()}
                                    title={eachImageCard.title}
                                >
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
                    imageSearch={true}
                    currentPage={currentPage}
                    totalResults={imagesList.length > 0}
                    limit={limit}
                    offset={offset}
                    handelCurrentPage={handelCurrentPage}
                />
            </>
        );
    };

    useEffect(() => {
        fetchImages();
    }, [searchQuery, offset]);

    const renderViews = {
        fetchData: fetchImages,
        loadingView: { isLoading, svgLoader, limit },
        successView: {
            data: imagesList,
            renderResults: renderImagesView,
            notFoundImageUrl: images.noResults,
        },
        failureView: {
            reloadImageUrl: images.reload,
            reloadText: "Retry",
            error: isError,
        },
    };

    return (
        <PageView
            renderViews={renderViews}
            isImageSearch={true}
            currentPage={currentPage}
            offset={offset}
            handelCurrentPage={handelCurrentPage}
        />
    );
};

export default ImageSearch;
