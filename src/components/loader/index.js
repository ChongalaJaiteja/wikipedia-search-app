// Import necessary dependencies and components
import * as StyledComponent from "./styledComponent";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { v4 as uuidv4 } from "uuid";
import React from "react";

// Define a function to scroll to the top of the page
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        // behavior: "smooth",
    });
};

// Define a functional component called Loader
const Loader = ({ children, limit, isImageLayout, isAllsearchResults }) => {
    const loaders = [];
    scrollToTop();

    // Create an array of loader elements based on the limit
    for (let i = 0; i < limit; i++) {
        loaders.push(React.cloneElement(children, { key: uuidv4() }));
    }

    // Return a responsive masonry layout for image loading or a styled container for other content
    return isImageLayout ? (
        <ResponsiveMasonry
            columnsCountBreakPoints={{
                320: 1,
                440: 2,
                680: 3,
                825: 4,
                1100: 5,
            }}
        >
            <Masonry>{loaders}</Masonry>
        </ResponsiveMasonry>
    ) : (
        <StyledComponent.ContentLoaderBgContainer
            isAllsearchResults={isAllsearchResults}
        >
            {loaders}
        </StyledComponent.ContentLoaderBgContainer>
    );
};

// Export the Loader component as the default export
export default Loader;
