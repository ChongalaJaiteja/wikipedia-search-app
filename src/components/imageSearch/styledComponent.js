import styled from "styled-components";
import { ResponsiveMasonry } from "react-responsive-masonry";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const ThreeDotsIcon = styled(MoreVertIcon)`
    color: var(--theme-primary-text-color);
`;

export const ThreeDotsMenu = styled(Menu)``;

export const ThreeDotsMenuItem = styled(MenuItem)`
    font-size: clamp(0.4rem, 1vw + 0.67rem, 1rem) !important;
`;

export const ResponsiveMansoryLayout = styled(ResponsiveMasonry)`
    padding: 1em;
    min-height: 70vh;
`;

export const WikiImageCard = styled.div`
    border: 1px solid grey;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
`;

export const ImageLink = styled.a``;

export const WikiImage = styled.img`
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    transition: transform 0.3s ease-out;
    &:hover {
        transform: scale(1.025);
    }
`;

export const WikiImageCardFooterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ImageCardTitleContainer = styled.p`
    width: 100px;
    flex-grow: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0;
    padding: 0.5em 0.3em;
    margin: 0;
`;

export const ImageCardTitle = styled.a`
    text-decoration: none;
    white-space: nowrap;
    color: var(--theme-link-color);
    &:hover {
        text-decoration: underline;
    }
`;
