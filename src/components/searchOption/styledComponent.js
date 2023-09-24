import styled from "styled-components";

export const SearchOption = styled.li`
    border: 1px solid var(--theme-border-color);
    border-radius: 19px;
    /* color: var(); */
    padding: 0.4em 0.7em;
    background-color: ${(props) =>
        props.selected
            ? props.theme.isLightTheme
                ? "#D8D9DA"
                : "#495057"
            : props.theme.backgroundColor};
    /* padding: 0.5em; */
    cursor: pointer;
    transition: transform 0.2s ease-out;

    &:hover {
        transform: scale(1.05);
    }
`;
