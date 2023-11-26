import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { MdEdit } from "react-icons/md";
import { NavigateBackIcon, ToolTipButton } from "../history/styledComponent";
import { DarkModeIcon, LightModeIcon } from "../home/styledComponent";
import { HidePasswordIcon, PasswordShowIcon } from "../signin/styledComponent";

export const ProfileBgContainer = styled.div`
    min-height: 100vh;
    background-color: var(--theme-page-bg-color);
    color: var(--theme-primary-text-color);
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
`;

export const ProfileNavBar = styled.nav`
    padding: clamp(0.5em, 1vw + 0.4em, 0.8em) clamp(1em, 1vw + 0.7em, 3em);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em;
`;

export const NavigateBack = styled(NavigateBackIcon)``;

export const ToolTipBtn = styled(ToolTipButton)``;

export const DarkMode = styled(DarkModeIcon)`
    font-size: clamp(1rem, 1vw + 1.3rem, 1.8rem);
`;

export const LightMode = styled(LightModeIcon)`
    font-size: clamp(1rem, 1vw + 1.3rem, 1.8rem);
`;

export const ProfileCard = styled.div`
    margin-block: auto;
    width: min(90%, 25rem);
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
`;

export const ProfileIcon = styled(FaUser)`
    font-size: clamp(0.6rem, 1vw + 3rem, 8rem);
`;

export const LoaderBgContainer = styled.div`
    margin: auto;
`;

export const StyledBox = styled(Box)`
    width: 100%;
    background-color: var(--theme-page-bg-color);
`;

export const InputBoxBgContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

export const InputBox = styled.div`
    /* outline: auto; */
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
`;

// export const InputTextBox = styled.div`
//     display: flex;
//     align-items: center;
//     position: relative;
// `;

export const StyledTextField = styled(TextField)`
    flex-grow: 1;
    .MuiInputLabel-root {
        color: var(--theme-primary-text-color);
    }
    .MuiInput-underline:before {
        border-bottom-color: var(--theme-input-border-color);
    }
    &:hover .MuiInput-underline:before {
        border-bottom-color: var(--theme-input-border-color) !important;
    }

    input {
        color: var(--theme-primary-text-color);
        padding-top: 0.5em;
    }
`;

export const PasswordInputBox = styled.div`
    position: relative;
    & > * {
        width: 100%;
    }
`;

export const PasswordIconContainer = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    width: fit-content;
    cursor: pointer;
`;

export const ShowPassword = styled(PasswordShowIcon)``;

export const HidePassword = styled(HidePasswordIcon)``;

export const EditIcon = styled(MdEdit)`
    font-size: clamp(0.5rem, 1vw + 0.91rem, 1.3rem);
    color: var(--theme-primary-text-color);
`;

export const EditButton = styled.button`
    background-color: transparent;
    border: none;
    position: absolute;
    right: 0;
    font-size: clamp(0.7rem, 1vw + 0.63rem, 1rem);
`;

export const BtnBgContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin-top: 1.5em;
`;

// export const EditBtn = styled.button`
//     color: white;
//     background-color: var(--theme-primary-color);
//     cursor: pointer;
//     border: none;
//     font-size: clamp(0.7rem, 1vw + 0.63rem, 1rem);
//     border-radius: 12px;
//     padding: 0.5em 1em;
// `;

export const ChangePasswordBtn = styled.button`
    align-self: flex-start;
    background-color: red;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: clamp(0.5rem, 1vw + 0.65rem, 1rem);
    color: white;
    padding: 0.4em 0.5em;
    cursor: pointer;
`;

export const PasswordInputsBgContainer = styled.div`
    /* outline: auto; */
    display: flex;
    flex-direction: column;
    gap: 1em;
    & > * {
        width: 100%;
    }
`;

export const SaveBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 0.4em;
    color: white;
    background-color: var(--theme-primary-color);
    cursor: pointer;
    border: none;
    font-size: clamp(0.7rem, 1vw + 0.63rem, 1rem);
    border-radius: 12px;
    padding: 0.5em 1em;
`;

export const BtnText = styled.span`
    font-size: clamp(0.5rem, 1vw + 0.65rem, 1rem);
`;
export const ThemeIconBgContainer = styled.div``;
