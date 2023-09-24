import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as StyledComponent from "./styledComponent";

const ImageSearch = () => {
    const [query] = useSearchParams();
    const searchQuery = query.get("search_query");
    const [titlesData, setTitlesData] = useState([]);
    const [imagesData, setImagesData] = useState(new Set());
    const limit = 10;
    const [offset, setOffset] = useState(0);

    const fetchTitles = async () => {
        try {
            const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*&srprop=title&srlimit=${limit}&sroffset=${offset}`;
            const response = await fetch(url);
            const fetchedTitles = await response.json();
            const titles = fetchedTitles.query.search.map(
                (eachTitle) => eachTitle.title
            );
            // console.log("titles", titles);
            setTitlesData(titles);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchImages = async (title) => {
        if (titlesData.length > 0) {
            try {
                const url = `https://en.wikipedia.org/w/api.php?action=query&prop=images&titles=${title}&format=json&origin=*`;
                const response = await fetch(url);
                const imagesList = await response.json();
                const tempImagesSet = new Set();
                for (let pageId in imagesList.query.pages) {
                    const images = imagesList.query.pages[pageId].images
                        .map((eachImage) => eachImage.title)
                        .filter(
                            (eachImageTitle) =>
                                !eachImageTitle.endsWith(".svg") &&
                                !eachImageTitle.endsWith(".gif") &&
                                !eachImageTitle.endsWith(".png")
                        );
                    // console.log(pageId, images);
                    images.forEach((eachImageFile) =>
                        tempImagesSet.add(eachImageFile)
                    );
                }
                // console.log("temp image set", tempImagesSet);
                setImagesData(
                    (prevImage) => new Set([...prevImage, ...tempImagesSet])
                );
                // setImagesData(prevImage => (...prevImage,...tempImagesSet));
                // const tempImageArray = [...tempImagesSet];
                // setImagesData((prevImages) => [
                //     ...prevImages,
                //     ...tempImageArray,
                // ]);
                // console.log("images", tempImageArray);
                // console.log("titles", titlesData);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const fetchImagesForTitle = async () => {
        for (let title of titlesData) {
            // console.log(title);
            await fetchImages(title);
        }
    };

    useEffect(() => {
        fetchTitles();
    }, [searchQuery]);

    useEffect(() => {
        if (imagesData.size > 0) {
            console.log("image data", imagesData);
        }
    }, [imagesData]);
    useEffect(() => {
        if (titlesData.length > 0) {
            fetchImagesForTitle();
            // console.log(titlesData);
            // console.log("image");
        }
    }, [titlesData]);
    return <h1>image</h1>;
};
export default ImageSearch;
