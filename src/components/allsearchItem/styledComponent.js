import styled from "styled-components";
import { PiShareFat } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";

export const SearchItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const TitleShareContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;
export const SearchItemTitle = styled.a`
    text-decoration: none;
    color: var(--theme-link-color);
    font-size: clamp(1rem, 1vw + 0.9rem, 1.26rem);
    &:hover {
        text-decoration: underline;
    }
`;

export const ShareIconContainer = styled.div`
    text-align: center;
`;
export const ShareIcon = styled(PiShareFat)`
    cursor: pointer;
    font-size: clamp(1rem, 1vw + 1rem, 1.4rem);
    color: var(--theme-primary-text-color);
    &:hover {
        color: var(--theme-primary-color);
    }
`;

export const ShareText = styled.p`
    margin: 0;
    font-size: clamp(0.4rem, 1vw + 0.4rem, 0.8rem);
`;
export const SearchItemUrl = styled(SearchItemTitle)`
    font-size: clamp(0.5rem, 1vw + 0.63rem, 1rem);
`;

export const SearchItemDescription = styled.p`
    font-size: clamp(0.5rem, 1vw + 0.62rem, 1rem);
    margin: 0.51em 0;
    color: var(--theme-header-text-color);
`;
