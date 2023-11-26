import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Masonry from "react-responsive-masonry";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton"; // Import IconButton component from Material-UI
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip component from Material-UI
import ContentLoader from "react-content-loader";
import * as StyledComponent from "./styledComponent";
import Pagination from "../pagination";
import { useAuthContext } from "../../authContext";
import PageView from "../pageView";
import * as React from "react";
import { useModelState } from "../../modelStateContext";
import PopupModel from "../popupModel";
import ShareModel from "../shareModel";
import errorImg from "../../asserts/something-went-wrong.avif";
import noResultsFound from "../../asserts/noData.png";

// Define a functional component called ImageSearch
const ImageSearch = () => {
    // Extract the search query from the URL using useSearchParams
    const [query] = useSearchParams();
    const searchQuery = query.get("search_query");
    const limit = 10;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [imagesList, setImageUrls] = useState([]);
    const [shareLink, setShareLink] = useState("");
    const { jwtToken, isSignedIn } = useAuthContext();
    const { openModel } = useModelState();

    // Define a ContentLoader component for loading animation
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

    // Define images for error and no results
    const images = {
        reload: errorImg,
        noResults: noResultsFound,
    };

    // Define a function to handle current page changes
    const handelCurrentPage = ({ currentPage, offset }) => {
        setCurrentPage(currentPage);
        setOffset(offset);
    };

    // Define a function to fetch images from Wikipedia
    const fetchImages = async () => {
        setError(false);
        setIsLoading(true);
        try {
            // Fetch Wikipedia search results for the given search query
            const titlesResponse = await fetch(
                `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*&srprop=title&srlimit=${limit}&sroffset=${offset}`
            );
            const titlesData = await titlesResponse.json();
            const fetchedTitles = titlesData.query.search.map(
                ({ title }) => title
            );

            const fetchedImages = [];

            // Fetch images for each Wikipedia title
            const imagePromises = fetchedTitles.map(async (wikipediaTitle) => {
                // Fetch images for a specific Wikipedia title
                const imageResponse = await fetch(
                    `${process.env.REACT_APP_WIKI_IMG_URL}${wikipediaTitle}`
                );
                const imageData = await imageResponse.json();
                const images =
                    imageData.query.pages[Object.keys(imageData.query.pages)[0]]
                        .images || [];
                images.forEach(({ title }) => {
                    // Filter and store images with .jpg or .jpeg extensions
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

            // Format fetched images
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
                        url: `${process.env.REACT_APP_WIKI_PAGE_URL}/Special:FilePath/${title}`,
                        title: newTitle,
                        wikipediaTitle,
                    };
                });

            // Set the formatted images to the component's state
            setImageUrls(formattedImages);
        } catch (error) {
            // Handle errors during the fetch process
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Define a function to handle image click
    const onClickImage = async ({ wikipediaTitle }) => {
        const link = `${process.env.REACT_APP_WIKI_PAGE_URL}/${wikipediaTitle}`;
        try {
            // Define the URL for saving history data
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

            // Perform a POST request to save history data
            await fetch(url, options);
        } catch (error) {
            console.log(error);
        }
    };

    const LongMenu = (link) => {
        const options = ["Share"];
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleShare = () => {
            const url = `${process.env.REACT_APP_WIKI_PAGE_URL}/${link}`;
            setShareLink(url);
            openModel();
            handleClose();
        };
        return (
            <>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <StyledComponent.ThreeDotsIcon />
                </IconButton>
                <StyledComponent.ThreeDotsMenu
                    id="long-menu"
                    MenuListProps={{
                        "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {options.map((option) => (
                        <StyledComponent.ThreeDotsMenuItem
                            key={option}
                            selected={option === "Pyxis"}
                            onClick={handleShare}
                        >
                            {option}
                        </StyledComponent.ThreeDotsMenuItem>
                    ))}
                </StyledComponent.ThreeDotsMenu>
            </>
        );
    };

    // Define a function to render the images view
    const renderImagesView = () => {
        return (
            <>
                <PopupModel>
                    <ShareModel link={shareLink} />
                </PopupModel>
                <StyledComponent.ResponsiveMansoryLayout
                    columnsCountBreakPoints={{
                        120: 1,
                        314: 2,
                        460: 3,
                        600: 4,
                        825: 5,
                        1100: 6,
                    }}
                >
                    <Masonry gutter="1em">
                        {imagesList.map((eachImageCard, index) => (
                            <StyledComponent.WikiImageCard>
                                <StyledComponent.ImageLink
                                    href={`${process.env.REACT_APP_WIKI_PAGE_URL}/${eachImageCard.wikipediaTitle}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={uuidv4()}
                                    onClick={() =>
                                        isSignedIn &&
                                        onClickImage(eachImageCard)
                                    }
                                >
                                    <StyledComponent.WikiImage
                                        src={eachImageCard.url}
                                        alt={eachImageCard.title}
                                        loading="lazy"
                                    />
                                </StyledComponent.ImageLink>
                                <StyledComponent.WikiImageCardFooterContainer>
                                    <StyledComponent.ImageCardTitleContainer>
                                        <StyledComponent.ImageCardTitle
                                            href={`${process.env.REACT_APP_WIKI_PAGE_URL}/${eachImageCard.wikipediaTitle}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {eachImageCard.title}
                                        </StyledComponent.ImageCardTitle>
                                    </StyledComponent.ImageCardTitleContainer>
                                    {LongMenu(eachImageCard.wikipediaTitle)}
                                </StyledComponent.WikiImageCardFooterContainer>
                            </StyledComponent.WikiImageCard>
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

    // Define a useEffect to fetch images when searchQuery or offset changes
    useEffect(() => {
        fetchImages();
    }, [searchQuery, offset]);

    // Define an object to store different render views based on the data and state
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

    // Return the PageView component with renderViews and other props
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

// Export the ImageSearch component as the default export
export default ImageSearch;
