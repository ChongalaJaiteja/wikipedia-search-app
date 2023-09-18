import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {
    /*Define global CSS variables here*/
    --theme-page-bg-color:${(props) => props.theme.backgroundColor};
    --theme-container-bg-color:${(props) => props.theme.containerBackground};
    --theme-header-bg-color:${(props) => props.theme.headerBackground};
    --theme-primary-text-color:${(props) => props.theme.primaryText};
    --theme-second-text-color:${(props) => props.theme.secondText};
    --theme-header-text-color:${(props) => props.theme.headerText};
    --theme-border-color:${(props) => props.theme.borderColor};
    --theme-divide-line-color:${(props) => props.theme.divideLineColor};
    --theme-input-bg-color:${(props) => props.theme.inputBackgroundColor};
    --theme-input-text-color:${(props) => props.theme.inputText};
    --theme-input-border-color: ${(props) => props.theme.inputBoaderColor};
    --theme-input-placeholder-text-color: ${(props) =>
        props.theme.placeholderText};
    --theme-primary-color:${(props) => props.theme.primaryAccentColor};
    --theme-secondary-color:${(props) => props.theme.secondaryAccentColor};
    --theme-success-color:${(props) => props.theme.successAccentColor};
    --theme-warning-color:${(props) => props.theme.warningAccentColor};
    --theme-info-color:${(props) => props.theme.infoAccentColor};
    --theme-link-color : ${(props) => props.theme.linkColor};
    ${"" /* --theme-text-color : ${(props) => props.theme.color}; */};
    --toggle-theme-transition : background-color 0.4s ease-out;
}
/*Defining global CSS*/

body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
`;
