import Checkbox from "@mui/material/Checkbox";
import styled, { keyframes } from "styled-components";

export const HistoryItemDateMainContainer = styled.li`
    background-color: var(--theme-container-bg-color);
    border-radius: 13px;
    margin-inline: clamp(0.4em, 1vw + 0.6em, 1.8em);
    padding-block: 0.5em;
`;

export const HistoryItemDateContainer = styled.div`
    display: flex;
    gap: 0.4em;
    align-items: center;
    border-bottom: 1px solid var(--theme-divide-line-color);
    padding-inline: 1.4em;
`;

export const CheckBox = styled(Checkbox)`
    color: var(--theme-primary-text-color) !important;
    &.Mui-checked {
        color: var(--theme-primary-color) !important;
    }
    &.MuiCheckbox-root {
        padding: 0;
        & > * {
            font-size: clamp(0.4rem, 1vw + 0.9rem, 1.27rem);
        }
    }
`;

const SelectAllTextAnimation = keyframes`
from {
    flex-grow: 0;
} to {
    flex-grow: 1;
}
`;

export const SelectAllHistoryItemsText = styled.label`
    margin: 0;
    padding: 0;
    font-size: clamp(0.4rem, 1vw + 0.67rem, 1.1rem);
    animation: ${SelectAllTextAnimation} 0.12s ease-out 1 forwards;
    cursor: pointer;
`;

export const HistoryItemDate = styled.p`
    font-size: clamp(0.4rem, 1vw + 0.67rem, 1.1rem);
    /* cursor: pointer; */
`;

export const HistoryItemsDateBgContainer = styled.ul`
    padding: 0;
    padding: 1em;
    /* padding: 1.1em; */
    display: flex;
    flex-direction: column;
    gap: 1em;
`;
