import styled from "styled-components";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const ResponsiveMansoryLayout = styled(ResponsiveMasonry)`
    padding: 1em;
    min-height: 70vh;
`;
export const ImageCard = styled.div`
    border: 1px solid grey;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
`;

export const WikipediaImage = styled.img`
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    transition: transform 0.3s ease-out;
    &:hover {
        transform: scale(1.025);
    }
`;

export const ImageCardContent = styled.div`
    /* width: 10px; */
    width: 100%;
`;
export const WikipediaTitleLink = styled.a`
    text-decoration: none;
    white-space: nowrap;
    /* outline: auto; */
    color: var(--theme-link-color);
    &:hover {
        text-decoration: underline;
    }
`;

export const ImageCardTitle = styled.p`
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0;
    padding: 0.5em 1em;
    /* text-align: center; */
    margin: 0;
`;
