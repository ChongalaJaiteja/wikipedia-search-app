import styled from "styled-components";
import { BiLinkExternal } from "react-icons/bi";
import { CheckBox } from "../historyDateItemCard/styledComponent";
import { ToolTipButton } from "../history/styledComponent";

export const HistoryItemContainer = styled.li`
    background-color: var(--theme-page-bg-color);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    padding: 0.53em;

    /* &:hover {
        background-color: ;
    } */
`;

export const HistoryItemContentContainer = styled.label`
    display: flex;
    align-items: center;
    gap: 0.7em;
    flex-grow: 1;
    max-width: 91%;
    cursor: pointer;
`;

export const HistoryItemCheckBox = styled(CheckBox)`
    &.MuiCheckbox-root {
        padding: 0;
        & > * {
            font-size: clamp(0.4rem, 1vw + 0.9rem, 1.27rem);
        }
    }
`;

export const HistoryItemTitleContainer = styled.div`
    overflow: hidden;
    flex-grow: 1;
`;

export const HistoryItemTitle = styled.p`
    font-size: clamp(0.3rem, 1vw + 0.6rem, 1rem);
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const HistoryItemTime = styled.span`
    font-size: clamp(0.2em, 1vw + 0.33rem, 0.76rem);
    color: #73777b;
    font-weight: bolder;
`;

export const HistoryLinkToolTipButton = styled(ToolTipButton)``;

export const HistoryItemLink = styled.a`
    color: var(--theme-primary-text-color);
    font-size: clamp(0.4rem, 1vw + 0.9rem, 1.1rem);
`;

export const WikipediaLinkIcon = styled(BiLinkExternal)`
    cursor: pointer;
    &:hover {
        color: var(--theme-primary-color);
    }
`;
