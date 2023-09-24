import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";

const theme = css`
    background-color: var(--theme-page-bg-color);
    color: var(--theme-primary-text-color);
    transition: var(--toggle-theme-transition);
`;

export const HomeBgContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-inline: 0.6em;
    ${theme};
    /* justify-content: center; */
    @media (min-width: 574px) {
        & {
            padding-inline: 1em;
        }
    }
`;
export const HomeOptionsContainer = styled.ul`
    --fs-theme-mode-logo: clamp(1rem, 1vw + 1.3rem, 1.8rem);
    align-self: flex-end;
    list-style: none;
    padding: 0;
    padding-inline: 1em;
    display: flex;
    align-items: center;
    gap: 1.5em;
    & > li {
        cursor: pointer;
    }
    @media (min-width: 630px) {
        & {
            gap: 2.4em;
        }
    }
`;
export const HomeOptions = styled.li`
    text-decoration: none;
    color: var(--theme-primary-text-color);
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: var(--theme-primary-text-color);
    ${HomeOptions};
`;

export const RotateThemeIcon = keyframes`
from {
    rotate: 0deg;
}
to {
    rotate: 95deg;
}
`;
export const DarkModeIcon = styled(BsMoonFill)`
    font-size: var(--fs-theme-mode-logo);
    cursor: pointer;
`;
export const LightModeIcon = styled(BsFillSunFill)`
    font-size: var(--fs-theme-mode-logo);
    cursor: pointer;
    color: yellow;
`;
export const SearchBgContainer = styled.div`
    align-self: center;
    margin-block: 6em 0em;
    width: 100%;
    max-width: 35rem;
    display: flex;
    flex-direction: column;
    gap: 3em;
`;

export const WikipediaImage = styled.img`
    width: 42%;
    max-width: 16rem;
    align-self: center;
`;

export const SearchFormContainer = styled.form``;
export const SearchInput = styled.input`
    border: 1px solid var(--theme-input-border-color);
    width: 100%;
    border-radius: 20px;
    background-color: var(--theme-input-bg-color);
    color: var(--theme-input-text-color);
    padding: 0.75em 0.7em;
    outline: none;

    &::placeholder {
        color: var(--theme-input-placeholder-text-color);
    }
`;
