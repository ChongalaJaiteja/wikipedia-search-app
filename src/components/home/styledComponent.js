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
    margin-top: 1.5em;
    padding-inline: clamp(0.3em, 1vw + 1em, 0.2em);
    display: flex;
    align-items: center;
    gap: 1em;
    position: relative;
    & > li {
        cursor: pointer;
    }
    @media (min-width: 630px) {
        & {
            margin-top: 2em;
            gap: 2.4em;
        }
    }
`;
export const HomeOptions = styled.li`
    text-decoration: none;
    color: var(--theme-primary-text-color);
    font-size: clamp(0.6rem, 1vw + 0.66rem, 1rem);
`;

export const onHoverOption = keyframes`
from {
    right: 100%;
} to {
    right: 0;
}
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: var(--theme-primary-text-color);
    ${HomeOptions};
    position: relative;
    &:hover:after {
        content: "";
        background-color: var(--theme-info-color);
        padding: 0.07em;
        margin-top: 0.2em;
        position: absolute;
        top: 100%;
        left: 0;
        border-radius: 14px;
        animation: ${onHoverOption} 0.14s ease-in 0s 1 forwards;
    }
`;

export const LoginBtn = styled.button`
    background-color: var(--theme-primary-color);
    border: none;
    color: white;
    font-size: clamp(0.6rem, 1vw + 0.65rem, 1rem);
    padding: 0.3em clamp(0.2em, 1vw + 1em, 1em);
    border-radius: 9px;
    cursor: pointer;
`;

export const RotateThemeIcon = keyframes`
from {
    rotate: 54deg;
}
to {
    rotate: -5deg;
}
`;
export const DarkModeIcon = styled(BsMoonFill)`
    font-size: var(--fs-theme-mode-logo);
    cursor: pointer;
    color: #272826;
    animation: ${RotateThemeIcon} 0.3s linear forwards;
`;
export const LightModeIcon = styled(BsFillSunFill)`
    font-size: var(--fs-theme-mode-logo);
    cursor: pointer;
    color: yellow;
    animation: none;
    animation: ${RotateThemeIcon} 0.3s linear forwards reverse 1;
`;
export const SearchBgContainer = styled.div`
    align-self: center;
    margin-block: 3.4em 6.5em;
    width: 100%;
    max-width: 35rem;
    display: flex;
    flex-direction: column;
    gap: 2.5em;
`;

export const WikipediaImage = styled.img`
    width: 42%;
    max-width: 13.6rem;
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
