import styled, { css } from "styled-components";
import { BsWikipedia } from "react-icons/bs";
import {
    SearchFormContainer,
    SearchInput,
    DarkModeIcon,
    LightModeIcon,
    LoginBtn,
} from "../home/styledComponent";
import { Link } from "react-router-dom";
import { HistorySearchInputSm, SearchIcon } from "../history/styledComponent";

const theme = css`
    background-color: var(--theme-page-bg-color);
    color: var(--theme-primary-text-color);
    transition: var(--toggle-theme-transition);
`;

export const WikipediaMainBgContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    ${theme}
    position: relative;
`;

export const NavBar = styled.nav`
    box-shadow: 0px 2px 3px 1px #495057;
    padding: clamp(0.5em, 1vw + 0.4em, 0.8em) clamp(1em, 1vw + 0.7em, 3em);
    --fs-logo: clamp(1rem, 1vw + 1.8rem, 2.7rem);
    --fs-theme-mode-logo: clamp(1rem, 1vw + 1.33rem, 1.8rem);
    top: 0;
    position: sticky;
    z-index: 999;
    background-color: var(--theme-header-bg-color);
    min-height: 2.5rem;
`;

export const NavSearchFormContainer = styled(SearchFormContainer)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const StyledLogoLink = styled(Link)``;

export const WikipediaNavLogo = styled(BsWikipedia)`
    font-size: var(--fs-logo);
    color: ${(props) => (props.theme.isLightTheme ? "black" : "white")};
`;

export const NavBarOptionsBgContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 clamp(0.1em, 1vw + 0.1rem, 1rem);
`;
export const NavSearchIcon = styled(SearchIcon)``;

export const NavSearchInput = styled(SearchInput)`
    display: none;
    width: 52%;
    max-width: 30rem;
    @media (min-width: 565px) {
        display: block;
    }
`;

export const NavBarSearchInputSm = styled(HistorySearchInputSm)``;

export const NavDarkModeIcon = styled(DarkModeIcon)`
    font-size: var(--fs-theme-mode-logo);
`;
export const NavLightModeIcon = styled(LightModeIcon)`
    font-size: var(--fs-theme-mode-logo);
`;
export const SearchHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
    outline: auto;
    align-items: center;
    padding: 1em;
`;

export const WikipediaImage = styled.img`
    width: 100%;
    max-width: 14rem;
`;
export const NavBarToggleThemeContainer = styled.div``;

export const SigninTextSm = styled.span`
    font-size: clamp(0.2rem, 1vw + 0.7rem, 1.2rem);
    text-decoration: underline;
    color: var(--theme-primary-color);
    @media (min-width: 565px) {
        display: none;
    }
`;

export const SigninBtn = styled(LoginBtn)`
    display: none;
    @media (min-width: 565px) {
        display: inline-block;
    }
`;

export const SearchOptionsBgContainer = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 1em;
    overflow-x: auto;
    padding: 0.8em 1em;
    @media (min-width: 690px) {
        & {
            margin-left: 10%;
        }
    }
`;
