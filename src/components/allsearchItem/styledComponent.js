import styled from "styled-components";

export const SearchItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const SearchItemTitle = styled.a`
    text-decoration: none;
    color: var(--theme-link-color);
    font-size: clamp(1rem, 1vw + 0.9rem, 1.26rem);

    &:hover {
        text-decoration: underline;
    }
`;
export const SearchItemUrl = styled(SearchItemTitle)`
    font-size: clamp(0.5rem, 1vw + 0.63rem, 1rem);
`;

export const SearchItemDescription = styled.p`
    font-size: clamp(0.5rem, 1vw + 0.62rem, 1rem);
    margin: 0.51em 0;
    color: var(--theme-header-text-color);
`;
