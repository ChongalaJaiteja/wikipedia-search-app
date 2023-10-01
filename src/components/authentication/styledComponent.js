import styled from "styled-components";
import { PopUpCloseIcon } from "../shareModel/styledComponent";

export const AuthenticationBgContainer = styled.div`
    /* outline: auto; */
    min-height: 30vh;
    font-weight: 700;
`;

export const AuthenticationHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const AuthenticationMessage = styled.p`
    font-size: clamp(0.5rem, 1vw + 0.7rem, 1.1rem);
    text-align: center;
    flex-grow: 1;
`;

export const CloseAuthenticationPopup = styled(PopUpCloseIcon)``;

export const AuthenticationCard = styled.div`
    background-color: var(--theme-page-bg-color);
    min-height: 20vh;
    border-radius: 10px;
`;

export const AuthenticationCardTabsContainer = styled.ul`
    list-style-type: none;
    padding: 0;
    display: flex;
    & > :nth-child(1) button {
        border-top-left-radius: 10px;
    }

    & > :nth-child(2) button {
        border-top-right-radius: 10px;
    }
`;

export const AuthenticationCardTabItem = styled.li`
    width: 50%;
`;

export const AuthenticationTabButton = styled.button`
    width: 100%;
    font-weight: 700;
    padding: 0.9em 0em;
    color: var(--theme-primary-text-color);
    outline: none;
    border: none;
    font-size: clamp(0.4rem, 1vw + 0.5rem, 0.9rem);
    background-color: ${(props) =>
        props.selected
            ? "var(--theme-page-bg-color)"
            : props.theme.isLightTheme
            ? "#EEEEEE"
            : "#282d33"};
    border-top: ${(props) =>
        props.selected ? "2px solid var(--theme-primary-color)" : "none"};
    cursor: pointer;
`;
