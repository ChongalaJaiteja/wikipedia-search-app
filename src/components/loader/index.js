import * as StyledComponent from "./styledComponent";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        // behavior: "smooth",
    });
};

const Loader = ({ svgLoader, limit, isImageLayout }) => {
    const loaders = [];
    scrollToTop();
    for (let i = 0; i < limit; i++) {
        loaders.push(svgLoader);
    }
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
        <StyledComponent.ContentLoaderBgContainer>
            {loaders}
        </StyledComponent.ContentLoaderBgContainer>
    );
};

export default Loader;
