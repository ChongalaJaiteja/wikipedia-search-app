import styled from "styled-components";
import { PiShareFat } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

export const SearchItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const SearchItemContentContainer = styled.div``;

export const SearchItemHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
`;
export const SearchItemTitle = styled.a`
    text-decoration: none;
    color: var(--theme-link-color);
    font-size: clamp(1rem, 1vw + 0.9rem, 1.26rem);
    &:hover {
        text-decoration: underline;
    }
`;

export const SearchItemFooter = styled.div`
    display: flex;
    gap: 0.7em;
`;

export const ShareIconContainer = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    cursor: pointer;
`;
export const ShareIcon = styled(PiShareFat)`
    font-size: clamp(1rem, 1vw + 1rem, 1.4rem);
    color: var(--theme-primary-text-color);
    margin-right: 0.2em;
    &:hover {
        color: var(--theme-primary-color);
    }
`;

export const ShareText = styled.p`
    margin: 0;
    color: var(--theme-primary-text-color);
    font-size: clamp(0.4rem, 1vw + 0.4rem, 0.8rem);
`;

export const BookmarkIcon = styled(BsBookmark)`
    font-size: clamp(1rem, 1vw + 0.84rem, 1.2rem);
    color: var(--theme-primary-text-color);
    margin-right: 0.2em;
    &:hover {
        color: var(--theme-primary-color);
    }
`;

export const BookmarkText = styled(ShareText)``;

export const SearchItemUrl = styled(SearchItemTitle)`
    font-size: clamp(0.5rem, 1vw + 0.63rem, 1rem);
`;

export const SearchItemDescription = styled.p`
    font-size: clamp(0.5rem, 1vw + 0.62rem, 1rem);
    margin: 0.51em 0;
    color: var(--theme-header-text-color);
`;
