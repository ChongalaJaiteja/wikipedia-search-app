import styled, { css } from "styled-components";
import { BsWikipedia, BsMoonFill, BsFillSunFill } from "react-icons/bs";
import { SearchFormContainer, SearchInput } from "../home/styledComponent";
import { Link } from "react-router-dom";

const theme = css`
    background-color: var(--theme-page-bg-color);
    color: var(--theme-primary-text-color);
    transition: var(--toggle-theme-transition);
`;
export const WikipediaMainBgContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    /* border: 2px solid red; */
    display: flex;
    flex-direction: column;
    ${theme}
    position: relative;
`;

export const NavBar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border-bottom: 1px solid #bfbfbf; */
    box-shadow: 0px 2px 3px 1px #495057;
    padding: clamp(0.5em, 1vw + 0.6em, 0.8em) clamp(1em, 1vw + 1.1em, 3em);
    --fs-logo: clamp(1rem, 1vw + 1.8rem, 2.7rem);
    --fs-theme-mode-logo: clamp(1rem, 1vw + 1.33rem, 1.8rem);
    top: 0;
    position: sticky;
    background-color: var(--theme-header-bg-color);
`;
export const StyledLogoLink = styled(Link)``;

export const WikipediaNavLogo = styled(BsWikipedia)`
    font-size: var(--fs-logo);
    color: ${(props) => (props.theme.isLightTheme ? "black" : "white")};
`;

export const NavSearchFormContainer = styled(SearchFormContainer)`
    width: 52%;
    max-width: 30rem;
`;
export const NavSearchInput = styled(SearchInput)``;
export const DarkModeIcon = styled(BsMoonFill)`
    font-size: var(--fs-theme-mode-logo);
    cursor: pointer;
`;
export const LightModeIcon = styled(BsFillSunFill)`
    font-size: var(--fs-theme-mode-logo);
    cursor: pointer;
    color: yellow;
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
    /* @media (min-width: ) {
        & {
            width: 5rem;
        }
    } */
`;
export const NavBarToggleThemeContainer = styled.div``;

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
